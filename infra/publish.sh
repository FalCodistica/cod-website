#!/usr/bin/env bash
#
# Build and publish the site + Lambda, straight from your machine.
# No GitHub Actions or repo variables required - uses your local AWS credentials.
# Run this after ./deploy.sh has created the infrastructure.
#
# (This mirrors exactly what .github/workflows/deploy.yml does in CI.)
#
set -euo pipefail
cd "$(dirname "$0")"

set -a
# shellcheck disable=SC1091
source ./config.env
set +a

if [[ -z "${AWS_PROFILE:-}" ]]; then
  unset AWS_PROFILE
else
  echo "==> Using AWS profile: ${AWS_PROFILE}"
fi

REPO_ROOT=".."
SITE_OUT="${REPO_ROOT}/build/client"

echo "==> Building the React Router static export ..."
(cd "${REPO_ROOT}" && npm ci && npm run build)

echo "==> Building the Lambda bundle ..."
(cd "${REPO_ROOT}/lambda" && npm ci && npm run package)

DIST_ID="$(aws cloudformation describe-stacks --region "${AWS_REGION}" \
  --stack-name "${PROJECT_NAME}" \
  --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" \
  --output text)"

echo "==> Updating Lambda code (${LAMBDA_FUNCTION_NAME}) ..."
aws lambda update-function-code \
  --region "${AWS_REGION}" \
  --function-name "${LAMBDA_FUNCTION_NAME}" \
  --zip-file "fileb://${REPO_ROOT}/lambda/dist/lambda.zip" >/dev/null
aws lambda wait function-updated --region "${AWS_REGION}" --function-name "${LAMBDA_FUNCTION_NAME}"

echo "==> Uploading static assets (long-lived cache) ..."
aws s3 sync "${SITE_OUT}/" "s3://${BUCKET_NAME}/" \
  --region "${AWS_REGION}" --delete \
  --exclude "*.html" \
  --cache-control "public, max-age=604800"

echo "==> Overriding Vite assets (hashed, immutable) ..."
aws s3 sync "${SITE_OUT}/assets/" "s3://${BUCKET_NAME}/assets/" \
  --region "${AWS_REGION}" \
  --cache-control "public, max-age=31536000, immutable"

echo "==> Uploading HTML pages (always revalidated) ..."
aws s3 sync "${SITE_OUT}/" "s3://${BUCKET_NAME}/" \
  --region "${AWS_REGION}" --delete \
  --exclude "*" --include "*.html" \
  --cache-control "no-cache" --content-type "text/html; charset=utf-8"

echo "==> Invalidating CloudFront (${DIST_ID}) ..."
aws cloudfront create-invalidation --region "${AWS_REGION}" \
  --distribution-id "${DIST_ID}" --paths "/*" >/dev/null

echo "Done -> https://${DOMAIN_NAME}"

#!/usr/bin/env bash
#
# Deploy the Codistica website infrastructure.
# All settings come from ./config.env - edit that file, then run: ./deploy.sh
#
# Deploys two CloudFormation stacks:
#   1. <PROJECT_NAME>-cert  in us-east-1   (ACM certificate - CloudFront requires us-east-1)
#   2. <PROJECT_NAME>       in AWS_REGION  (S3, CloudFront, Lambda, Secrets, Route 53, IAM deploy role)
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

if [[ -z "${HOSTED_ZONE_ID}" ]]; then
  echo "ERROR: HOSTED_ZONE_ID is empty in config.env." >&2
  echo "Find it with:" >&2
  echo "  aws route53 list-hosted-zones-by-name --dns-name ${DOMAIN_NAME} --query 'HostedZones[0].Id' --output text" >&2
  exit 1
fi

echo "==> [1/3] Certificate + WAF stack '${PROJECT_NAME}-cert' in us-east-1 ..."
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name "${PROJECT_NAME}-cert" \
  --template-file certificate.yml \
  --no-fail-on-empty-changeset \
  --parameter-overrides \
      ProjectName="${PROJECT_NAME}" \
      DomainName="${DOMAIN_NAME}" \
      HostedZoneId="${HOSTED_ZONE_ID}" \
      IncludeWww="${INCLUDE_WWW}" \
      ApiRateLimitPerFiveMin="${API_RATE_LIMIT_PER_5MIN}"

CERT_ARN="$(aws cloudformation describe-stacks --region us-east-1 \
  --stack-name "${PROJECT_NAME}-cert" \
  --query "Stacks[0].Outputs[?OutputKey=='CertificateArn'].OutputValue" \
  --output text)"
echo "    Certificate ARN: ${CERT_ARN}"

WEB_ACL_ARN="$(aws cloudformation describe-stacks --region us-east-1 \
  --stack-name "${PROJECT_NAME}-cert" \
  --query "Stacks[0].Outputs[?OutputKey=='WebAclArn'].OutputValue" \
  --output text)"
echo "    WAF WebACL ARN: ${WEB_ACL_ARN}"

echo "==> [2/3] Main stack '${PROJECT_NAME}' in ${AWS_REGION} ..."
aws cloudformation deploy \
  --region "${AWS_REGION}" \
  --stack-name "${PROJECT_NAME}" \
  --template-file cloudformation.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --no-fail-on-empty-changeset \
  --parameter-overrides \
      ProjectName="${PROJECT_NAME}" \
      BucketName="${BUCKET_NAME}" \
      CvUploadsBucketName="${CV_UPLOADS_BUCKET_NAME}" \
      DeployRoleName="${DEPLOY_ROLE_NAME}" \
      OACName="${OAC_NAME}" \
      LambdaOACName="${LAMBDA_OAC_NAME}" \
      LambdaFunctionName="${LAMBDA_FUNCTION_NAME}" \
      SecretName="${SECRET_NAME}" \
      CvRetentionDays="${CV_RETENTION_DAYS}" \
      DomainName="${DOMAIN_NAME}" \
      IncludeWww="${INCLUDE_WWW}" \
      HostedZoneId="${HOSTED_ZONE_ID}" \
      CertificateArn="${CERT_ARN}" \
      WebAclArn="${WEB_ACL_ARN}" \
      GitHubOrg="${GITHUB_ORG}" \
      GitHubRepo="${GITHUB_REPO}" \
      CreateOIDCProvider="${CREATE_OIDC_PROVIDER}" \
      PriceClass="${PRICE_CLASS}"

echo "==> [3/3] Stack outputs:"
aws cloudformation describe-stacks --region "${AWS_REGION}" \
  --stack-name "${PROJECT_NAME}" \
  --query 'Stacks[0].Outputs' --output table

SECRET_ARN="$(aws cloudformation describe-stacks --region "${AWS_REGION}" \
  --stack-name "${PROJECT_NAME}" \
  --query "Stacks[0].Outputs[?OutputKey=='SubmissionsSecretArn'].OutputValue" \
  --output text)"

echo ""
echo "==> One-time: populate the real Notion credentials (placeholder was auto-generated):"
echo "  aws secretsmanager put-secret-value --region ${AWS_REGION} \\"
echo "    --secret-id ${SECRET_ARN} \\"
echo "    --secret-string '{\"NOTION_API_KEY\":\"...\",\"NOTION_SUBMISSIONS_DATA_SOURCE_ID\":\"...\"}'"
echo ""
echo "Then run ./publish.sh to build and push the site + Lambda code."

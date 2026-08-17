import type { APIGatewayProxyStructuredResultV2 } from "aws-lambda";

/**
 * Every response goes through this — status codes are chosen to never be
 * 403/404, since CloudFront's distribution-wide CustomErrorResponses would
 * otherwise silently rewrite a JSON error body into the static 404.html page.
 */
export function json(statusCode: number, body: unknown): APIGatewayProxyStructuredResultV2 {
  return {
    statusCode,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  };
}

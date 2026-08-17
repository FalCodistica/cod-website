import type { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { presignCvUpload } from "./handlers/presignCvUpload";
import { submitJoinTeam } from "./handlers/submitJoinTeam";
import { submitStrategicCollaboration } from "./handlers/submitStrategicCollaboration";
import { submitStrategicConversation } from "./handlers/submitStrategicConversation";
import { json } from "./lib/response";

type Handler = (body: unknown) => Promise<APIGatewayProxyStructuredResultV2>;

// Path is matched exactly against event.rawPath (the CloudFront /api/*
// behavior forwards the full incoming path unchanged).
const routes: Record<string, Handler> = {
  "/api/uploads/presign-cv": presignCvUpload,
  "/api/apply/join-team": submitJoinTeam,
  "/api/apply/strategic-collaboration": submitStrategicCollaboration,
  "/api/apply/strategic-conversation": submitStrategicConversation,
};

export async function route(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyStructuredResultV2> {
  const path = event.rawPath;
  const method = event.requestContext.http.method;

  const handler = routes[path];
  if (!handler) return json(400, { ok: false, error: "Unknown route." });
  if (method !== "POST") return json(405, { ok: false, error: "Method not allowed." });

  let body: unknown = {};
  if (event.body) {
    const raw = event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf-8") : event.body;
    try {
      body = JSON.parse(raw);
    } catch {
      return json(400, { ok: false, error: "Invalid JSON body." });
    }
  }

  try {
    return await handler(body);
  } catch (error) {
    console.error(`Unhandled error in ${method} ${path}`, error);
    return json(200, { ok: false, error: "Something went wrong. Please try again." });
  }
}

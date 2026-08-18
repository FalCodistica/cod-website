import type { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { presignCvUpload } from "./handlers/presignCvUpload";
import { submitJoinTeam } from "./handlers/submitJoinTeam";
import { submitStrategicCollaboration } from "./handlers/submitStrategicCollaboration";
import { submitStrategicConversation } from "./handlers/submitStrategicConversation";
import { isHoneypotTriggered } from "./lib/honeypot";
import { json } from "./lib/response";

type Handler = (body: unknown) => Promise<APIGatewayProxyStructuredResultV2>;

// Path is matched exactly against event.rawPath (the CloudFront /api/*
// behavior forwards the full incoming path unchanged). `honeypot: true`
// marks the 3 real form submissions (not the CV presign step) for the
// hidden-field spam check below.
const routes: Record<string, { handler: Handler; honeypot?: boolean }> = {
  "/api/uploads/presign-cv": { handler: presignCvUpload },
  "/api/apply/join-team": { handler: submitJoinTeam, honeypot: true },
  "/api/apply/strategic-collaboration": { handler: submitStrategicCollaboration, honeypot: true },
  "/api/apply/strategic-conversation": { handler: submitStrategicConversation, honeypot: true },
};

export async function route(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyStructuredResultV2> {
  const path = event.rawPath;
  const method = event.requestContext.http.method;

  const route = routes[path];
  if (!route) return json(400, { ok: false, error: "Unknown route." });
  if (method !== "POST") return json(405, { ok: false, error: "Method not allowed." });

  let body: unknown = {};
  if (event.body) {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf-8")
      : event.body;
    try {
      body = JSON.parse(raw);
    } catch {
      return json(400, { ok: false, error: "Invalid JSON body." });
    }
  }

  // Bots that filled the hidden field get a fake success - real processing
  // (and the Notion write) never happens, but nothing tips them off to retry
  // differently.
  if (route.honeypot && isHoneypotTriggered(body)) {
    return json(200, { ok: true });
  }

  try {
    return await route.handler(body);
  } catch (error) {
    console.error(`Unhandled error in ${method} ${path}`, error);
    return json(200, { ok: false, error: "Something went wrong. Please try again." });
  }
}

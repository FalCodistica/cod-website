/**
 * Client-side submission API — talks to the Lambda behind the same
 * CloudFront distribution at /api/* (same-origin, no CORS). Mirrors the
 * { ok: true } | { ok: false; error } contract the form pages already
 * handle, so this is a drop-in replacement for the old Server Actions.
 */

export type ActionResult = { ok: true } | { ok: false; error: string };
export type PresignResult =
  | { ok: true; uploadUrl: string; key: string }
  | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

async function post<T>(path: string, body: unknown): Promise<T | { ok: false; error: string }> {
  let res: Response;
  try {
    res = await fetch(`/api${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
  try {
    return (await res.json()) as T;
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}

export function presignCvUpload(filename: string, contentType: string): Promise<PresignResult> {
  return post<PresignResult>("/uploads/presign-cv", { filename, contentType });
}

export function submitJoinTeam(
  input: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    role: string;
    country: string;
    opportunity: string;
  },
  cv: { key: string; filename: string },
): Promise<ActionResult> {
  return post<ActionResult>("/apply/join-team", { ...input, cvKey: cv.key, cvFilename: cv.filename });
}

export function submitStrategicCollaboration(input: {
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  phone: string;
  projectWhat: string;
  projectSystems: string;
  projectSuccess: string;
  stage: string;
  support: string[];
  timeline: string;
}): Promise<ActionResult> {
  return post<ActionResult>("/apply/strategic-collaboration", input);
}

export function submitStrategicConversation(input: {
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  phone: string;
  stage: string;
  involvement: string[];
  horizon: string;
}): Promise<ActionResult> {
  return post<ActionResult>("/apply/strategic-conversation", input);
}

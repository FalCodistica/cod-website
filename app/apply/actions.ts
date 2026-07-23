"use server";

import { sendSubmissionEmail } from "@/lib/email";
import { createSubmissionRecord, uploadFileToNotion } from "@/lib/notion";

export type ActionResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

type JoinTeamInput = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  role: string;
  country: string;
  opportunity: string;
};

export async function submitJoinTeam(input: JoinTeamInput, cv: File): Promise<ActionResult> {
  if (!input.name || !input.email || !input.phone || !input.role || !input.country || !cv) {
    return { ok: false, error: "Missing required fields." };
  }

  const cvBuffer = Buffer.from(await cv.arrayBuffer());
  const cvContentType = cv.type || "application/octet-stream";

  try {
    await sendSubmissionEmail({
      subject: `New application: ${input.name} (Join the Team)`,
      lines: [
        ["Name", input.name],
        ["Email", input.email],
        ["Phone", input.phone],
        ["LinkedIn / portfolio", input.linkedin || "—"],
        ["Current role", input.role],
        ["Country", input.country],
        ["Opportunity", input.opportunity || "—"],
      ],
      attachment: { filename: cv.name, content: cvBuffer },
    });
  } catch (error) {
    console.error("submitJoinTeam email notification failed", error);
  }

  let cvUpload: { fileUploadId: string; filename: string } | undefined;
  let notes: string | undefined;
  try {
    const fileUploadId = await uploadFileToNotion(cvBuffer, cv.name, cvContentType);
    cvUpload = { fileUploadId, filename: cv.name };
  } catch (error) {
    console.error("submitJoinTeam CV upload to Notion failed", error);
    notes = `CV upload to Notion failed (${cv.name}) — check the email notification and server logs.`;
  }

  try {
    await createSubmissionRecord({
      name: input.name,
      formType: "Join Team",
      email: input.email,
      phone: input.phone,
      country: input.country,
      roleOrCompany: input.role,
      linkedin: input.linkedin || undefined,
      preferences: input.opportunity || undefined,
      cv: cvUpload,
      notes,
    });
    return { ok: true };
  } catch (error) {
    console.error("submitJoinTeam Notion record failed", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

type StrategicCollaborationInput = {
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
};

export async function submitStrategicCollaboration(
  input: StrategicCollaborationInput,
): Promise<ActionResult> {
  if (
    !input.name ||
    !input.email ||
    !input.company ||
    !input.role ||
    !input.country ||
    !input.phone ||
    !input.projectWhat ||
    !input.projectSystems ||
    !input.projectSuccess ||
    !input.stage ||
    input.support.length === 0 ||
    !input.timeline
  ) {
    return { ok: false, error: "Missing required fields." };
  }

  const projectDetails = [
    `What: ${input.projectWhat}`,
    `Systems: ${input.projectSystems}`,
    `Success: ${input.projectSuccess}`,
  ].join("\n\n");

  try {
    await createSubmissionRecord({
      name: input.name,
      formType: "Strategic Collaboration",
      email: input.email,
      phone: input.phone,
      country: input.country,
      roleOrCompany: `${input.role} @ ${input.company}`,
      stage: input.stage,
      timelineOrHorizon: input.timeline,
      preferences: input.support.join(", "),
      projectDetails,
    });
  } catch (error) {
    console.error("submitStrategicCollaboration Notion record failed", error);
    return { ok: false, error: GENERIC_ERROR };
  }

  try {
    await sendSubmissionEmail({
      subject: `New strategic collaboration inquiry: ${input.name}`,
      lines: [
        ["Name", input.name],
        ["Email", input.email],
        ["Company", input.company],
        ["Role", input.role],
        ["Country", input.country],
        ["Phone", input.phone],
        ["What", input.projectWhat],
        ["Systems", input.projectSystems],
        ["Success", input.projectSuccess],
        ["Stage", input.stage],
        ["Support needed", input.support.join(", ")],
        ["Timeline", input.timeline],
      ],
    });
  } catch (error) {
    console.error("submitStrategicCollaboration email notification failed", error);
  }

  return { ok: true };
}

type StrategicConversationInput = {
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  phone: string;
  stage: string;
  involvement: string[];
  horizon: string;
};

export async function submitStrategicConversation(
  input: StrategicConversationInput,
): Promise<ActionResult> {
  if (
    !input.name ||
    !input.email ||
    !input.company ||
    !input.role ||
    !input.country ||
    !input.phone ||
    !input.stage ||
    input.involvement.length === 0 ||
    !input.horizon
  ) {
    return { ok: false, error: "Missing required fields." };
  }

  try {
    await createSubmissionRecord({
      name: input.name,
      formType: "Strategic Conversation",
      email: input.email,
      phone: input.phone,
      country: input.country,
      roleOrCompany: `${input.role} @ ${input.company}`,
      stage: input.stage,
      timelineOrHorizon: input.horizon,
      preferences: input.involvement.join(", "),
    });
  } catch (error) {
    console.error("submitStrategicConversation Notion record failed", error);
    return { ok: false, error: GENERIC_ERROR };
  }

  try {
    await sendSubmissionEmail({
      subject: `New strategic conversation inquiry: ${input.name}`,
      lines: [
        ["Name", input.name],
        ["Email", input.email],
        ["Company", input.company],
        ["Role", input.role],
        ["Country", input.country],
        ["Phone", input.phone],
        ["Stage", input.stage],
        ["Involvement", input.involvement.join(", ")],
        ["Horizon", input.horizon],
      ],
    });
  } catch (error) {
    console.error("submitStrategicConversation email notification failed", error);
  }

  return { ok: true };
}

import { createSubmissionRecord, uploadFileToNotion } from "../lib/notion";
import { getNotion } from "../lib/notionClient";
import { json } from "../lib/response";
import { getCvObject } from "../lib/s3";

const GENERIC_ERROR = "Something went wrong. Please try again.";

type Input = {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  role?: string;
  country?: string;
  opportunity?: string;
  cvKey?: string;
  cvFilename?: string;
};

export async function submitJoinTeam(body: unknown) {
  const input = (body ?? {}) as Input;
  if (
    !input.name ||
    !input.email ||
    !input.phone ||
    !input.role ||
    !input.country ||
    !input.cvKey ||
    !input.cvFilename
  ) {
    return json(200, { ok: false, error: "Missing required fields." });
  }

  const { notion, dataSourceId } = await getNotion();

  let cvUpload: { fileUploadId: string; filename: string } | undefined;
  let notes: string | undefined;
  try {
    const { buffer, contentType } = await getCvObject(input.cvKey);
    const fileUploadId = await uploadFileToNotion(notion, buffer, input.cvFilename, contentType);
    cvUpload = { fileUploadId, filename: input.cvFilename };
  } catch (error) {
    console.error("submitJoinTeam CV upload to Notion failed", error);
    notes = `CV upload to Notion failed (${input.cvFilename}) — check server logs.`;
  }

  try {
    await createSubmissionRecord(notion, dataSourceId, {
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
    return json(200, { ok: true });
  } catch (error) {
    console.error("submitJoinTeam Notion record failed", error);
    return json(200, { ok: false, error: GENERIC_ERROR });
  }
}

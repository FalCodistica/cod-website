import { createSubmissionRecord } from "../lib/notion";
import { getNotion } from "../lib/notionClient";
import { json } from "../lib/response";

const GENERIC_ERROR = "Something went wrong. Please try again.";

type Input = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  country?: string;
  phone?: string;
  projectWhat?: string;
  projectSystems?: string;
  projectSuccess?: string;
  stage?: string;
  support?: string[];
  timeline?: string;
};

export async function submitStrategicCollaboration(body: unknown) {
  const input = (body ?? {}) as Input;
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
    !input.support?.length ||
    !input.timeline
  ) {
    return json(200, { ok: false, error: "Missing required fields." });
  }

  const projectDetails = [
    `What: ${input.projectWhat}`,
    `Systems: ${input.projectSystems}`,
    `Success: ${input.projectSuccess}`,
  ].join("\n\n");

  try {
    const { notion, dataSourceId } = await getNotion();
    await createSubmissionRecord(notion, dataSourceId, {
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
    return json(200, { ok: true });
  } catch (error) {
    console.error("submitStrategicCollaboration Notion record failed", error);
    return json(200, { ok: false, error: GENERIC_ERROR });
  }
}

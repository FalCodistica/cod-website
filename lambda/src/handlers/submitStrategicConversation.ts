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
  stage?: string;
  involvement?: string[];
  horizon?: string;
};

export async function submitStrategicConversation(body: unknown) {
  const input = (body ?? {}) as Input;
  if (
    !input.name ||
    !input.email ||
    !input.company ||
    !input.role ||
    !input.country ||
    !input.phone ||
    !input.stage ||
    !input.involvement?.length ||
    !input.horizon
  ) {
    return json(200, { ok: false, error: "Missing required fields." });
  }

  try {
    const { notion, dataSourceId } = await getNotion();
    await createSubmissionRecord(notion, dataSourceId, {
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
    return json(200, { ok: true });
  } catch (error) {
    console.error("submitStrategicConversation Notion record failed", error);
    return json(200, { ok: false, error: GENERIC_ERROR });
  }
}

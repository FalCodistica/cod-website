import type { Client } from "@notionhq/client";

export type FormType = "Join Team" | "Strategic Collaboration" | "Strategic Conversation";

export type SubmissionRecord = {
  name: string;
  formType: FormType;
  email: string;
  phone: string;
  country: string;
  roleOrCompany: string;
  linkedin?: string;
  stage?: string;
  timelineOrHorizon?: string;
  preferences?: string;
  projectDetails?: string;
  cv?: { fileUploadId: string; filename: string };
  notes?: string;
};

function richText(value: string) {
  return { rich_text: [{ text: { content: value.slice(0, 2000) } }] };
}

export async function uploadFileToNotion(
  notion: Client,
  buffer: Buffer,
  filename: string,
  contentType: string,
) {
  const upload = await notion.fileUploads.create({
    mode: "single_part",
    filename,
    content_type: contentType,
  });

  await notion.fileUploads.send({
    file_upload_id: upload.id,
    file: { filename, data: new Blob([new Uint8Array(buffer)], { type: contentType }) },
  });

  return upload.id;
}

export async function createSubmissionRecord(
  notion: Client,
  dataSourceId: string,
  record: SubmissionRecord,
) {
  await notion.pages.create({
    parent: { type: "data_source_id", data_source_id: dataSourceId },
    properties: {
      Name: { title: [{ text: { content: record.name } }] },
      "Form Type": { select: { name: record.formType } },
      Status: { select: { name: "New" } },
      "Submitted At": { date: { start: new Date().toISOString() } },
      Email: { email: record.email },
      Phone: { phone_number: record.phone },
      Country: richText(record.country),
      "Role / Company": richText(record.roleOrCompany),
      ...(record.linkedin ? { "LinkedIn / Portfolio": { url: record.linkedin } } : {}),
      ...(record.stage ? { Stage: richText(record.stage) } : {}),
      ...(record.timelineOrHorizon
        ? { "Timeline / Horizon": richText(record.timelineOrHorizon) }
        : {}),
      ...(record.preferences ? { Preferences: richText(record.preferences) } : {}),
      ...(record.projectDetails ? { "Project Details": richText(record.projectDetails) } : {}),
      ...(record.cv
        ? {
            CV: {
              type: "files" as const,
              files: [
                {
                  type: "file_upload" as const,
                  file_upload: { id: record.cv.fileUploadId },
                  name: record.cv.filename,
                },
              ],
            },
          }
        : {}),
      ...(record.notes ? { Notes: richText(record.notes) } : {}),
    },
  });
}

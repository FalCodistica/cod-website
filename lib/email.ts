import { Resend } from "resend";

let resend: Resend | undefined;

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  resend ??= new Resend(process.env.RESEND_API_KEY);
  return resend;
}

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Codistica Website <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendSubmissionEmail({
  subject,
  lines,
  attachment,
}: {
  subject: string;
  lines: Array<[label: string, value: string]>;
  attachment?: { filename: string; content: Buffer };
}) {
  if (!NOTIFICATION_EMAIL) {
    throw new Error("NOTIFICATION_EMAIL is not configured");
  }

  const html = `<div style="font-family: sans-serif; font-size: 14px;">${lines
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value).replace(/\n/g, "<br />")}</p>`,
    )
    .join("")}</div>`;

  await getResendClient().emails.send({
    from: FROM_EMAIL,
    to: NOTIFICATION_EMAIL,
    subject,
    html,
    attachments: attachment ? [attachment] : undefined,
  });
}

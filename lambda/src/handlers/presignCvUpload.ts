import { json } from "../lib/response";
import { presignCvPut } from "../lib/s3";

type Input = { filename?: string; contentType?: string };

export async function presignCvUpload(body: unknown) {
  const { filename, contentType } = (body ?? {}) as Input;
  if (!filename || !contentType) {
    return json(200, { ok: false, error: "Missing filename or contentType." });
  }

  try {
    const { uploadUrl, key } = await presignCvPut(filename, contentType);
    return json(200, { ok: true, uploadUrl, key });
  } catch (error) {
    console.error("presignCvUpload failed", error);
    return json(200, { ok: false, error: "Something went wrong. Please try again." });
  }
}

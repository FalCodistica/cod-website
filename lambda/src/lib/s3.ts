import { randomUUID } from "node:crypto";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({});
const PRESIGN_TTL_SECONDS = 300;
const KEY_PREFIX = "cv-uploads/";

function bucket(): string {
  const name = process.env.CV_BUCKET_NAME;
  if (!name) throw new Error("CV_BUCKET_NAME is not configured");
  return name;
}

export async function presignCvPut(filename: string, contentType: string) {
  const key = `${KEY_PREFIX}${randomUUID()}-${filename}`;
  const uploadUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({ Bucket: bucket(), Key: key, ContentType: contentType }),
    { expiresIn: PRESIGN_TTL_SECONDS },
  );
  return { uploadUrl, key };
}

export async function getCvObject(key: string): Promise<{ buffer: Buffer; contentType: string }> {
  const res = await s3.send(new GetObjectCommand({ Bucket: bucket(), Key: key }));
  const bytes = await res.Body?.transformToByteArray();
  if (!bytes) throw new Error(`CV object "${key}" has no body`);
  return { buffer: Buffer.from(bytes), contentType: res.ContentType ?? "application/octet-stream" };
}

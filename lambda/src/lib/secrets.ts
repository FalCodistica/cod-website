import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

type Secrets = {
  NOTION_API_KEY: string;
  NOTION_SUBMISSIONS_DATA_SOURCE_ID: string;
};

const client = new SecretsManagerClient({});

// Cached at module scope — reused across warm invocations of the same
// execution environment, fetched fresh only on a cold start.
let cached: Secrets | undefined;

export async function getSecrets(): Promise<Secrets> {
  if (cached) return cached;

  const arn = process.env.SUBMISSIONS_SECRET_ARN;
  if (!arn) {
    // Local dev fallback — no Secrets Manager round trip needed.
    const NOTION_API_KEY = process.env.NOTION_API_KEY;
    const NOTION_SUBMISSIONS_DATA_SOURCE_ID = process.env.NOTION_SUBMISSIONS_DATA_SOURCE_ID;
    if (!NOTION_API_KEY || !NOTION_SUBMISSIONS_DATA_SOURCE_ID) {
      throw new Error(
        "Set SUBMISSIONS_SECRET_ARN, or NOTION_API_KEY + NOTION_SUBMISSIONS_DATA_SOURCE_ID for local dev.",
      );
    }
    cached = { NOTION_API_KEY, NOTION_SUBMISSIONS_DATA_SOURCE_ID };
    return cached;
  }

  const res = await client.send(new GetSecretValueCommand({ SecretId: arn }));
  if (!res.SecretString) throw new Error(`Secret ${arn} has no string value`);
  cached = JSON.parse(res.SecretString) as Secrets;
  return cached;
}

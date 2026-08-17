import { Client } from "@notionhq/client";
import { getSecrets } from "./secrets";

let cached: { notion: Client; dataSourceId: string } | undefined;

export async function getNotion() {
  if (cached) return cached;
  const secrets = await getSecrets();
  cached = {
    notion: new Client({ auth: secrets.NOTION_API_KEY }),
    dataSourceId: secrets.NOTION_SUBMISSIONS_DATA_SOURCE_ID,
  };
  return cached;
}

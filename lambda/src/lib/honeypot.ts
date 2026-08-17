/** True if the hidden "website" field (see components/forms/HoneypotField.tsx) got filled in - only bots do that. */
export function isHoneypotTriggered(body: unknown): boolean {
  const value = (body as { website?: unknown } | null)?.website;
  return typeof value === "string" && value.trim().length > 0;
}

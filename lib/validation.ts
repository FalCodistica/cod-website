export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 7 && /^\+?[\d\s().-]+$/.test(trimmed);
}

export function isValidUrl(value: string): boolean {
  const trimmed = value.trim();
  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export type FieldType = "text" | "email" | "tel" | "url";

/* Returns an error message for a text-like field, or null if it's valid.
   Shared between the inline field UI and each form's canContinue check so
   the two never drift out of sync. */
export function fieldError(type: FieldType, value: string, required: boolean): string | null {
  const trimmed = value.trim();
  if (!trimmed) return required ? "This field is required." : null;
  if (type === "email" && !isValidEmail(trimmed)) return "Enter a valid email address.";
  if (type === "tel" && !isValidPhone(trimmed)) return "Enter a valid phone number.";
  if (type === "url" && !isValidUrl(trimmed)) return "Enter a valid URL, e.g. https://example.com";
  return null;
}

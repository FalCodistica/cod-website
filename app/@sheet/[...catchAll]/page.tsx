// Matches any non-intercepted route (/company, /privacy, …) so navigating
// there from an open sheet clears the sheet slot.
export default function CatchAll() {
  return null;
}

/**
 * Invisible-to-humans field: bots that auto-fill every input tend to fill
 * this one too, real visitors never see or reach it. Positioned off-screen
 * rather than display:none/visibility:hidden, which some bots skip.
 */
export default function HoneypotField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label>
        Leave this field blank
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

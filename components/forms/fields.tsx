"use client";

import { type ChangeEvent } from "react";

const rowClass =
  "flex w-full flex-col gap-2 border-b border-rule py-[10px] sm:flex-row sm:items-center sm:gap-0";
const labelClass = "mono-body min-w-[220px] flex-1 text-mist";
const valueWrapClass = "min-w-[220px] flex-1";

function RequiredMark({ required }: { required?: boolean }) {
  if (!required) return null;
  return <span aria-hidden> *</span>;
}

export function TextField({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "url";
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={rowClass}>
      <span className={labelClass}>
        {label}
        <RequiredMark required={required} />
      </span>
      <div className={valueWrapClass}>
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className="w-full bg-transparent py-[10px] text-base font-medium text-foam outline-none placeholder:text-foam/50"
        />
      </div>
    </label>
  );
}

export function TextareaField({
  label,
  name,
  placeholder,
  required = true,
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex w-full flex-col gap-2 border-b border-rule py-[10px]">
      <span className={labelClass}>
        {label}
        <RequiredMark required={required} />
      </span>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        rows={4}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none bg-transparent py-[10px] text-base font-medium text-foam outline-none placeholder:text-foam/50"
      />
    </label>
  );
}

function ChevronDown() {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-mist"
    >
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SelectField({
  label,
  name,
  options,
  placeholder = "Select…",
  required = true,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={rowClass}>
      <span className={labelClass}>
        {label}
        <RequiredMark required={required} />
      </span>
      <div className={`relative ${valueWrapClass}`}>
        <select
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent py-[10px] pr-6 text-base font-medium text-foam outline-none"
        >
          <option value="" disabled hidden className="bg-panel text-foam/50">
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-panel text-foam">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown />
      </div>
    </label>
  );
}

export function PillGroup({
  label,
  hint,
  options,
  value,
  onChange,
  multi = false,
}: {
  label: string;
  hint?: string;
  options: string[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multi?: boolean;
}) {
  const selected = multi ? (value as string[]) : value ? [value as string] : [];

  function toggle(opt: string) {
    if (multi) {
      const arr = value as string[];
      onChange(arr.includes(opt) ? arr.filter((o) => o !== opt) : [...arr, opt]);
    } else {
      onChange(opt);
    }
  }

  return (
    <div className="flex w-full flex-col gap-4 border-b border-rule py-[10px]">
      <div className="flex flex-col gap-1">
        <span className="mono-body text-mist">{label}</span>
        {hint && <span className="text-xs font-medium text-ash">{hint}</span>}
      </div>
      <div className="flex flex-wrap gap-2 pb-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              type="button"
              key={opt}
              onClick={() => toggle(opt)}
              aria-pressed={active}
              className={`glass-pill h-10 px-4 text-sm font-medium transition-colors ${
                active ? "bg-foam text-coal" : "text-foam hover:bg-foam/15"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

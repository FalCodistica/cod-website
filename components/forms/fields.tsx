"use client";

import { type ChangeEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";
import { type FieldType, fieldError } from "@/lib/validation";

const rowClass =
  "flex w-full flex-col gap-2 border-b border-rule py-[10px] sm:flex-row sm:items-start sm:gap-0";
const labelClass = "mono-body min-w-[220px] flex-1 text-mist";
const rowLabelClass = `${labelClass} sm:pt-[10px]`;
const valueWrapClass = "min-w-[220px] flex-1";

function RequiredMark({ required }: { required?: boolean }) {
  if (!required) return null;
  return <span aria-hidden="true"> *</span>;
}

function FieldError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <span className="mono-body block pb-[10px] text-xs normal-case tracking-normal text-alert">
      {message}
    </span>
  );
}

export function TextField({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  value,
  onChange,
  forceShowErrors = false,
}: {
  label: string;
  name: string;
  type?: FieldType;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  forceShowErrors?: boolean;
}) {
  const [touched, setTouched] = useState(false);
  const error = fieldError(type, value, required);
  const showError = Boolean(error) && (touched || forceShowErrors);

  return (
    <label className={rowClass}>
      <span className={rowLabelClass}>
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
          onBlur={() => setTouched(true)}
          aria-invalid={showError}
          className={`w-full bg-transparent py-[10px] text-base font-medium outline-none placeholder:text-foam/50 ${
            showError ? "text-alert" : "text-foam"
          }`}
        />
        {showError && <FieldError message={error} />}
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
  forceShowErrors = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  forceShowErrors?: boolean;
}) {
  const [touched, setTouched] = useState(false);
  const error = fieldError("text", value, required);
  const showError = Boolean(error) && (touched || forceShowErrors);

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
        onBlur={() => setTouched(true)}
        aria-invalid={showError}
        className={`w-full resize-none bg-transparent py-[10px] text-base font-medium outline-none placeholder:text-foam/50 ${
          showError ? "text-alert" : "text-foam"
        }`}
      />
      {showError && <FieldError message={error} />}
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
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-mist"
    >
      <path
        d="M1 1l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Text input with a filterable dropdown of matching options — an
   autocomplete select for lists too long to scan as a native <select>
   (e.g. the full country list). Only a value from `options` is ever
   committed; an unmatched query reverts on blur. */
export function ComboboxField({
  label,
  name,
  options,
  placeholder = "Search…",
  required = true,
  value,
  onChange,
  forceShowErrors = false,
}: {
  label: string;
  name: string;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  forceShowErrors?: boolean;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [touched, setTouched] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery(value);
        setTouched(true);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [value]);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? options
        .filter((o) => o.toLowerCase().includes(q))
        .sort((a, b) => {
          const aStarts = a.toLowerCase().startsWith(q) ? 0 : 1;
          const bStarts = b.toLowerCase().startsWith(q) ? 0 : 1;
          return aStarts - bStarts || a.localeCompare(b);
        })
    : options;

  const error = fieldError("text", value, required);
  const showError = Boolean(error) && (touched || forceShowErrors) && !open;

  function commit(option: string) {
    onChange(option);
    setQuery(option);
    setOpen(false);
    setTouched(true);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlighted((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && filtered[highlighted]) commit(filtered[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery(value);
      setTouched(true);
    }
  }

  function handleBlur() {
    setOpen(false);
    setQuery(value);
    setTouched(true);
  }

  return (
    <label className={rowClass}>
      <span className={rowLabelClass}>
        {label}
        <RequiredMark required={required} />
      </span>
      <div className={valueWrapClass} ref={rootRef}>
        <div className="relative">
          <input
            type="text"
            name={name}
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-invalid={showError}
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setHighlighted(0);
            }}
            onFocus={() => setOpen(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`w-full bg-transparent py-[10px] pr-6 text-base font-medium outline-none placeholder:text-foam/50 ${
              showError ? "text-alert" : "text-foam"
            }`}
          />
          <ChevronDown />
          {open && filtered.length > 0 && (
            <ul className="glass-dark absolute left-0 right-0 top-full z-10 mt-2 max-h-56 overflow-y-auto rounded-2xl py-2 shadow-lg">
              {filtered.map((o, i) => (
                <li key={o}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => commit(o)}
                    onMouseEnter={() => setHighlighted(i)}
                    className={`w-full px-4 py-2 text-left text-sm font-medium transition-colors ${
                      i === highlighted ? "bg-foam/15 text-foam" : "text-foam/80"
                    }`}
                  >
                    {o}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {showError && <FieldError message={error} />}
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

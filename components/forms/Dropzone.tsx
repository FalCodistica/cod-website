"use client";

import { motion } from "motion/react";
import { type DragEvent, useRef, useState } from "react";
import { presignCvUpload } from "@/lib/apiClient";

type Status = "idle" | "uploading" | "verifying" | "done" | "error";

function UploadIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="text-foam"
    >
      <path
        d="M10 13V3M10 3l-4 4M10 3l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 13.5v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="text-mist"
    >
      <path
        d="M1 1l12 12M13 1L1 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Dropzone({
  label = "Upload your CV",
  required = true,
  file,
  onChange,
  onUploaded,
}: {
  label?: string;
  required?: boolean;
  file: File | null;
  onChange: (file: File | null) => void;
  /** Called with the S3 object key once the real upload finishes, or null on removal/failure. */
  onUploaded: (key: string | null) => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  async function upload(f: File) {
    setStatus("uploading");
    setProgress(0);

    const contentType = f.type || "application/octet-stream";
    const presign = await presignCvUpload(f.name, contentType);
    if (!presign.ok) {
      setStatus("error");
      return;
    }

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setProgress((e.loaded / e.total) * 100);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setProgress(100);
        setStatus("verifying");
        setTimeout(() => {
          setStatus("done");
          onUploaded(presign.key);
        }, 500);
      } else {
        setStatus("error");
      }
    };
    xhr.onerror = () => setStatus("error");
    xhr.open("PUT", presign.uploadUrl);
    xhr.setRequestHeader("Content-Type", contentType);
    xhr.send(f);
  }

  function handleFiles(files: FileList | null) {
    const f = files?.[0];
    if (!f) return;
    onChange(f);
    void upload(f);
  }

  function remove() {
    xhrRef.current?.abort();
    onChange(null);
    onUploaded(null);
    setStatus("idle");
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex w-full flex-col gap-3 border-b border-rule py-[10px]">
      <span className="mono-body text-mist">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {status === "idle" && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e: DragEvent) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e: DragEvent) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`flex h-24 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed transition-colors ${
            dragging ? "border-mint bg-foam/5" : "border-rule hover:bg-foam/5"
          }`}
        >
          <UploadIcon />
          <span className="text-sm font-medium text-mist">
            Click to select a file or drag and drop it here
          </span>
        </button>
      )}

      {(status === "uploading" || status === "verifying") && (
        <div className="flex h-24 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-rule px-8">
          <span className="text-sm font-medium text-mist">
            {status === "uploading" ? `Uploading… ${Math.round(progress)}%` : "Verifying…"}
          </span>
          <div className="h-[3px] w-full max-w-[345px] overflow-hidden rounded-full bg-rule">
            <motion.div
              className="h-full rounded-full bg-mint"
              animate={{ width: status === "uploading" ? `${progress}%` : "100%" }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex h-24 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-red-400/40 px-8">
          <span className="text-sm font-medium text-red-400">
            Upload failed. Please try again.
          </span>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-sm font-medium text-mist underline hover:text-foam"
          >
            Choose a file
          </button>
        </div>
      )}

      {status === "done" && file && (
        <div className="flex h-16 w-full items-center justify-between gap-3 rounded-2xl border border-rule px-5">
          <span className="truncate text-sm font-medium text-foam">{file.name}</span>
          <button
            type="button"
            onClick={remove}
            aria-label="Remove file"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foam/10 transition-colors hover:bg-foam/20"
          >
            <RemoveIcon />
          </button>
        </div>
      )}
    </div>
  );
}

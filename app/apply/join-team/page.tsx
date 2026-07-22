"use client";

import Link from "next/link";
import { useState } from "react";
import ConfirmationPanel from "@/components/forms/ConfirmationPanel";
import Dropzone from "@/components/forms/Dropzone";
import FormShell from "@/components/forms/FormShell";
import { PillGroup, SelectField, TextField } from "@/components/forms/fields";
import StepButton from "@/components/forms/StepButton";
import { countries } from "@/lib/countries";

const opportunityOptions = ["Full-time", "Internship", "Freelance / contract", "Open to anything"];

type FormData = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  role: string;
  country: string;
  opportunity: string;
};

const initial: FormData = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  role: "",
  country: "",
  opportunity: "",
};

export default function JoinTeamPage() {
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<FormData>(initial);
  const [cv, setCv] = useState<File | null>(null);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const canSubmit = data.name && data.email && data.phone && data.role && data.country && cv;

  function handleSubmit() {
    if (!canSubmit) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <FormShell>
        <ConfirmationPanel
          title="Thank you for your interest in Codistica."
          paragraphs={[
            "We believe passionate people, working with discipline and freedom to think, create the most meaningful systems.",
            "Our team carefully reviews every profile and reaches out when there is strong alignment between our mission and your aspirations.",
          ]}
        />
      </FormShell>
    );
  }

  return (
    <FormShell>
      <h1 className="heading max-w-[640px] text-center text-foam">Join the team</h1>

      <div className="flex w-full flex-col gap-10">
        <div className="flex flex-col">
          <TextField
            label="Name"
            name="name"
            placeholder="Your name"
            value={data.name}
            onChange={(v) => set("name", v)}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="you@email.com"
            value={data.email}
            onChange={(v) => set("email", v)}
          />
          <TextField
            label="Phone number"
            name="phone"
            type="tel"
            placeholder="+1 555-555-5555"
            value={data.phone}
            onChange={(v) => set("phone", v)}
          />
          <TextField
            label="LinkedIn / portfolio"
            name="linkedin"
            type="url"
            placeholder="Link to your profile"
            required={false}
            value={data.linkedin}
            onChange={(v) => set("linkedin", v)}
          />
          <TextField
            label="Current role"
            name="role"
            placeholder="What you do now"
            value={data.role}
            onChange={(v) => set("role", v)}
          />
          <SelectField
            label="Country"
            name="country"
            options={countries}
            value={data.country}
            onChange={(v) => set("country", v)}
          />
          <Dropzone file={cv} onChange={setCv} />
          <PillGroup
            label="What type of opportunity are you looking for?"
            hint="Optional"
            options={opportunityOptions}
            value={data.opportunity}
            onChange={(v) => set("opportunity", v as string)}
          />
        </div>

        <p className="text-xs font-medium leading-relaxed text-ash">
          By submitting application, you agree we may process your details to evaluate your
          application. See our{" "}
          <Link href="/privacy" className="underline hover:text-mist">
            privacy policy
          </Link>
          .
        </p>

        <StepButton disabled={!canSubmit} showCaret={false} onClick={handleSubmit}>
          Submit application
        </StepButton>
      </div>
    </FormShell>
  );
}

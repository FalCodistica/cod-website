"use client";

import { useState } from "react";
import Link from "next/link";
import FormShell from "@/components/forms/FormShell";
import Stepper from "@/components/forms/Stepper";
import StepButton from "@/components/forms/StepButton";
import ConfirmationPanel from "@/components/forms/ConfirmationPanel";
import { TextField, SelectField, PillGroup } from "@/components/forms/fields";
import { countries } from "@/lib/countries";

const steps = ["About you", "Current stage", "Involvement"];

const stageOptions = ["Exploring options", "Actively evaluating", "Ready to commit", "Already invested"];
const involvementOptions = [
  "Direct investment",
  "Strategic partnership",
  "Advisory role",
  "Co-development",
];
const horizonOptions = ["Short-term (1–2 years)", "Mid-term (3–5 years)", "Long-term (5+ years)"];

type FormData = {
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  phone: string;
  stage: string;
  involvement: string[];
  horizon: string;
};

const initial: FormData = {
  name: "",
  email: "",
  company: "",
  role: "",
  country: "",
  phone: "",
  stage: "",
  involvement: [],
  horizon: "",
};

export default function StrategicConversationPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<FormData>(initial);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const canContinue = [
    data.name && data.email && data.company && data.role && data.country && data.phone,
    data.stage,
    data.involvement.length > 0 && data.horizon,
  ][step];

  function handleSubmit() {
    if (!canContinue) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <FormShell>
        <ConfirmationPanel
          title="Thank you for your interest in Codistica."
          paragraphs={[
            "We value relationships built on long-term thinking, shared vision, and meaningful innovation. Our team will thoughtfully review your information and reach out should there be a strong alignment to explore future opportunities together.",
            "We appreciate your interest in contributing to the systems and technologies that will help shape what comes next.",
          ]}
        />
      </FormShell>
    );
  }

  return (
    <FormShell>
      <h1 className="heading max-w-[640px] text-center text-foam">
        Start a strategic conversation
      </h1>
      <Stepper steps={steps} current={step} />

      <div className="flex w-full flex-col gap-10">
        <div key={step} className="step-in flex flex-col">
          {step === 0 && (
            <>
              <TextField label="Name" name="name" placeholder="Your name" value={data.name} onChange={(v) => set("name", v)} />
              <TextField label="Work email" name="email" type="email" placeholder="you@company.com" value={data.email} onChange={(v) => set("email", v)} />
              <TextField label="Company" name="company" placeholder="Where you work" value={data.company} onChange={(v) => set("company", v)} />
              <TextField label="Role" name="role" placeholder="Your position" value={data.role} onChange={(v) => set("role", v)} />
              <SelectField label="Country" name="country" options={countries} value={data.country} onChange={(v) => set("country", v)} />
              <TextField label="Phone number" name="phone" type="tel" placeholder="+1 555-555-5555" value={data.phone} onChange={(v) => set("phone", v)} />
            </>
          )}

          {step === 1 && (
            <PillGroup label="What stage are you currently in?" options={stageOptions} value={data.stage} onChange={(v) => set("stage", v as string)} />
          )}

          {step === 2 && (
            <>
              <PillGroup
                label="What type of involvement are you interested in?"
                hint="Select all that apply"
                options={involvementOptions}
                value={data.involvement}
                onChange={(v) => set("involvement", v as string[])}
                multi
              />
              <PillGroup label="What time horizon do you typically invest with?" options={horizonOptions} value={data.horizon} onChange={(v) => set("horizon", v as string)} />
              <p className="pt-6 text-xs font-medium leading-relaxed text-ash">
                By submitting this form, you agree to the processing of your personal data in
                accordance with our{" "}
                <Link href="/privacy" className="underline hover:text-mist">
                  privacy policy
                </Link>
                .
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="mono-label self-center text-ash transition-colors hover:text-mist"
            >
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <StepButton disabled={!canContinue} onClick={() => setStep((s) => s + 1)}>
              Continue
            </StepButton>
          ) : (
            <StepButton disabled={!canContinue} showCaret={false} onClick={handleSubmit}>
              Submit
            </StepButton>
          )}
        </div>
      </div>
    </FormShell>
  );
}

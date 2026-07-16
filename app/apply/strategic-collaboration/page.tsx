"use client";

import { useState } from "react";
import Link from "next/link";
import FormShell from "@/components/forms/FormShell";
import Stepper from "@/components/forms/Stepper";
import StepButton from "@/components/forms/StepButton";
import ConfirmationPanel from "@/components/forms/ConfirmationPanel";
import { TextField, SelectField, TextareaField, PillGroup } from "@/components/forms/fields";
import { countries } from "@/lib/countries";

const steps = ["About you", "Your project", "Current stage", "Timeline"];

const stageOptions = ["Idea", "Planning", "In progress", "Scaling"];
const supportOptions = [
  "Strategy & planning",
  "Systems design",
  "Implementation",
  "Ongoing support",
];
const timelineOptions = [
  "As soon as possible",
  "Within 3 months",
  "3–6 months",
  "No fixed timeline",
];

type FormData = {
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  phone: string;
  projectWhat: string;
  projectSystems: string;
  projectSuccess: string;
  stage: string;
  support: string[];
  timeline: string;
};

const initial: FormData = {
  name: "",
  email: "",
  company: "",
  role: "",
  country: "",
  phone: "",
  projectWhat: "",
  projectSystems: "",
  projectSuccess: "",
  stage: "",
  support: [],
  timeline: "",
};

export default function StrategicCollaborationPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<FormData>(initial);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const canContinue = [
    data.name && data.email && data.company && data.role && data.country && data.phone,
    data.projectWhat && data.projectSystems && data.projectSuccess,
    data.stage && data.support.length > 0,
    data.timeline,
  ][step];

  function handleSubmit() {
    if (!canContinue) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <FormShell>
        <ConfirmationPanel
          title="Thank you for sharing your initiative."
          paragraphs={[
            "At Codistica, every collaboration begins with understanding. Our team will carefully review your submission to evaluate alignment, objectives, and the opportunity to create meaningful impact together.",
            "If we believe there is strong potential to move forward, a member of our team will reach out to begin the conversation.",
            "We appreciate the trust you have placed in us and look forward to exploring what is possible.",
          ]}
        />
      </FormShell>
    );
  }

  return (
    <FormShell>
      <h1 className="heading max-w-[640px] text-center text-foam">
        Develop your project with Codistica
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
            <>
              <TextareaField label="What are you building or trying to solve?" name="projectWhat" placeholder="Tell us about the initiative" value={data.projectWhat} onChange={(v) => set("projectWhat", v)} />
              <TextareaField label="What systems or infrastructure are currently involved?" name="projectSystems" placeholder="Existing infrastructure, tools, or constraints" value={data.projectSystems} onChange={(v) => set("projectSystems", v)} />
              <TextareaField label="What would success look like?" name="projectSuccess" placeholder="The outcome you're working toward" value={data.projectSuccess} onChange={(v) => set("projectSuccess", v)} />
            </>
          )}

          {step === 2 && (
            <>
              <PillGroup label="What stage are you currently in?" options={stageOptions} value={data.stage} onChange={(v) => set("stage", v as string)} />
              <PillGroup
                label="What kind of support are you looking for?"
                hint="Select all that apply"
                options={supportOptions}
                value={data.support}
                onChange={(v) => set("support", v as string[])}
                multi
              />
            </>
          )}

          {step === 3 && (
            <>
              <PillGroup label="Is there a timeline you are working toward?" options={timelineOptions} value={data.timeline} onChange={(v) => set("timeline", v as string)} />
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

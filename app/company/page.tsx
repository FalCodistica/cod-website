import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/SiteChrome";
import Footer from "@/components/Footer";
import CompanySidebar, { partnershipSidebarItems } from "@/components/CompanySidebar";
import RuledField from "@/components/RuledField";
import { FilledButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Partnership & collaboration — Codistica",
  description:
    "Systems worth building. Together. Strategic development, team & talent, and investment partnerships at Codistica.",
};

export default function CompanyPage() {
  return (
    <>
      <Header />
      <div className="flex gap-[60px] px-5 pb-30 pt-10">
        <CompanySidebar items={partnershipSidebarItems} defaultActive="build-with-us" />
        <main className="mx-auto flex w-full max-w-[1060px] flex-col gap-5">
          {/* hero */}
          <section className="relative flex h-[540px] flex-col justify-between overflow-hidden rounded-[40px]">
            <Image
              src="/images/texture-streaks.jpg"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="1060px"
            />
            <div className="relative flex flex-1 items-center justify-center">
              <h1 className="display text-center text-foam">
                Systems worth building.
                <br />
                Together.
              </h1>
            </div>
            <div className="relative grid grid-cols-3 gap-2 p-10">
              {[
                ["35", "Clients"],
                ["51", "Projects"],
                ["6", "Countries"],
              ].map(([num, label]) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <span className="display text-snow">{num}</span>
                  <span className="mono-body text-foam">{label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 00 — build with us */}
          <section
            id="build-with-us"
            className="flex scroll-mt-10 flex-col gap-10 rounded-[40px] bg-panel p-7 sm:p-[60px]"
          >
            <h2 className="heading text-foam">
              There are different ways
              <br />
              to collaborate with Codistica.
            </h2>
            <div className="flex flex-col gap-6 text-lg font-medium leading-relaxed text-mist">
              <p>
                Codistica was built around a simple belief. The systems that
                shape our world deserve deeper intelligence, thoughtful
                collaboration, and people who care deeply about what they
                build.
              </p>
              <p>
                We work with individuals, teams, and organizations driven by
                curiosity, discipline, and a genuine passion for solving
                meaningful problems — people who believe that building the
                right systems can quietly improve how the world operates.
              </p>
              <p>
                Whether through strategic initiatives, joining our team, or
                exploring investment partnerships, what matters most is
                alignment in values, long-term vision, and the passion to
                build systems that matter.
              </p>
            </div>
          </section>

          {/* 01 — strategic development */}
          <section
            id="strategic-development"
            className="flex scroll-mt-10 flex-col gap-10 rounded-[40px] bg-panel p-7 sm:p-[60px]"
          >
            <h2 className="heading text-foam">
              Some collaborations begin with a shared idea.
              <br />
              Others begin with a complex challenge.
            </h2>
            <p className="text-lg font-medium leading-relaxed text-mist">
              At Codistica, strategic development focuses on initiatives where
              technology, infrastructure, and thoughtful execution can create
              meaningful and lasting impact. We collaborate with organizations,
              industry experts, and partners who bring deep domain knowledge and
              the same commitment to building systems that truly work.
            </p>

            {/* challenge → infrastructure diagram */}
            <div
              className="relative overflow-hidden rounded-full px-5 py-5"
              style={{
                background:
                  "linear-gradient(105deg, #0e1514 0%, #334863 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{ backgroundImage: "url(/images/tile-noise.png)" }}
              />
              <div className="relative flex flex-col items-center justify-between gap-8 py-0 sm:flex-row sm:gap-0">
                <div className="relative flex size-[220px] shrink-0 items-center justify-center overflow-hidden rounded-full p-2.5">
                  <Image
                    src="/images/challenge-ball.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                  <span className="mono-body relative text-link-ice">
                    Complex challenge
                  </span>
                </div>
                <DiagramLink />
                <div className="flex w-full max-w-[300px] flex-col gap-8 sm:shrink">
                  {["Systems thinking", "Technical expertise", "Disciplined execution"].map(
                    (t) => (
                      <span
                        key={t}
                        className="mono-body flex h-10 items-center justify-center rounded-full text-foam"
                        style={{
                          background: "rgba(221,228,227,0.08)",
                          boxShadow:
                            "inset 1px 1px 0 rgba(178,200,232,0.28), inset -1px -1px 0 rgba(178,200,232,0.12)",
                          backdropFilter: "blur(20px)",
                        }}
                      >
                        {t}
                      </span>
                    ),
                  )}
                </div>
                <DiagramLink flip />
                <div
                  className="flex size-[220px] shrink-0 items-center justify-center rounded-full p-2.5 text-center"
                  style={{
                    background: "linear-gradient(0deg, #0e1514 0%, #334863 100%)",
                    boxShadow: "inset 0 0 50px var(--color-steel-light)",
                  }}
                >
                  <span className="mono-body w-[180px] text-link-ice">
                    Meaningful infrastructure
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="mono-body text-foam">Collaboration model</h3>
              <div className="grid gap-6 text-sm font-medium leading-relaxed text-mist sm:grid-cols-3">
                <p>
                  The strongest collaborations begin with understanding. At
                  Codistica, every strategic collaboration starts with careful
                  listening and thoughtful exploration of the challenge at hand.
                </p>
                <p>
                  We take the time to understand the context, the systems
                  involved, and the long-term objectives behind each initiative.
                  From there, ideas evolve into structured strategies, and
                  strategies into carefully designed solutions.
                </p>
                <p>
                  Our approach combines systems thinking, technical expertise,
                  and disciplined execution to transform complex challenges into
                  meaningful infrastructure.
                </p>
              </div>
            </div>
            <div>
              <FilledButton href="/apply/strategic-collaboration">
                Propose a strategic collaboration
              </FilledButton>
            </div>
          </section>

          {/* 02 — team & talent */}
          <section
            id="team-talent"
            className="relative min-h-[600px] scroll-mt-10 overflow-hidden rounded-[40px]"
          >
            <Image
              src="/images/team-bg.jpg"
              alt=""
              fill
              className="object-cover object-bottom"
              sizes="1060px"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(9,15,15,0.92) 0%, rgba(9,15,15,0.45) 38%, rgba(51,72,99,0.25) 100%)",
              }}
            />
            <div className="relative flex flex-col gap-10 p-7 sm:flex-row sm:p-[60px] sm:pb-[120px]">
              <div className="flex max-w-[450px] flex-col gap-6">
                <h2 className="heading text-foam">
                  Discipline gets systems right.
                  <br />
                  Passion makes them matter.
                </h2>
                <p className="text-sm font-medium leading-relaxed text-foam">
                  The strength of Codistica comes from the people behind the
                  systems we build. We value people who combine technical
                  rigor with genuine passion for solving complex problems —
                  people who take pride in thoughtful work and care deeply
                  about the systems they create.
                </p>
                <div className="flex flex-col gap-2">
                  <h3 className="mono-body text-foam">How we work</h3>
                  <p className="text-sm font-medium leading-relaxed text-foam">
                    Our environment encourages curiosity, ownership, and
                    continuous improvement. We believe passionate people,
                    working with discipline and the freedom to think, create
                    the most meaningful systems.
                  </p>
                </div>
                <div>
                  <FilledButton href="/apply/join-team">
                    Submit your profile
                  </FilledButton>
                </div>
              </div>
              {/* rocket + "what drives the team" connectors */}
              <div className="hidden flex-1 items-end justify-end gap-4 self-stretch sm:flex">
                <div className="mono-body flex flex-col items-end gap-5 pb-1 text-link-ice">
                  <span className="mono-label mb-2 text-mist">What Drives the Team</span>
                  {[
                    "genuine passion for what we build",
                    "Respect for engineering",
                    "Shared commitment to excellence",
                  ].map((t) => (
                    <span key={t} className="flex items-center gap-3 text-right">
                      {t}
                      <span className="h-px w-14 bg-steel" aria-hidden />
                    </span>
                  ))}
                </div>
                <TeamRocket />
              </div>
            </div>
          </section>

          {/* 03 — investment partnerships */}
          <section
            id="investment-partnerships"
            className="flex scroll-mt-10 flex-col gap-10 rounded-[40px] bg-panel p-7 sm:p-[60px]"
          >
            <RuledField />
            <div className="grid gap-[60px] sm:grid-cols-2">
              <h2 className="heading text-foam">
                Infrastructure takes time. The right partners understand that.
              </h2>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                  <h3 className="mono-body text-foam">Investment philosophy</h3>
                  <p className="text-lg font-medium leading-relaxed text-mist">
                    We collaborate with investors who share both strategic
                    perspective and a genuine belief in the value of
                    meaningful systems. We prioritize partnerships grounded
                    in long-term thinking, disciplined execution, and belief
                    in the power of intelligent systems.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="mono-body text-foam">Shared strategic horizon</h3>
                  <p className="text-lg font-medium leading-relaxed text-mist">
                    Our approach is not transactional. We seek partners who
                    understand that building meaningful infrastructure
                    requires time, commitment, and passion for creating
                    lasting value.
                  </p>
                </div>
                <div>
                  <FilledButton href="/apply/strategic-conversation">
                    Start a strategic conversation
                  </FilledButton>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

/* stylised rocket for the "what drives the team" diagram */
function TeamRocket() {
  return (
    <svg
      width="40"
      height="340"
      viewBox="0 0 40 340"
      fill="none"
      aria-hidden
      className="shrink-0 self-end"
    >
      {/* nose cone */}
      <path d="M20 2C7 36 0 66 0 92h40C40 66 33 36 20 2Z" fill="#334863" />
      {/* body */}
      <rect x="0" y="95" width="40" height="150" rx="6" fill="#334863" />
      {/* three segments (aligned with the value connectors) */}
      <rect x="0" y="249" width="40" height="16" rx="4" fill="#334863" />
      <rect x="0" y="269" width="40" height="16" rx="4" fill="#334863" />
      <rect x="0" y="289" width="40" height="16" rx="4" fill="#334863" />
      {/* exhaust trail, fading out */}
      <line
        x1="20"
        y1="312"
        x2="20"
        y2="340"
        stroke="url(#exhaust)"
        strokeWidth="2"
      />
      <defs>
        <linearGradient id="exhaust" x1="20" y1="312" x2="20" y2="340" gradientUnits="userSpaceOnUse">
          <stop stopColor="#334863" />
          <stop offset="1" stopColor="#334863" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* thin connector curves between diagram nodes */
function DiagramLink({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="80"
      height="142"
      viewBox="0 0 80 142"
      fill="none"
      aria-hidden
      className={`shrink-0 max-sm:hidden ${flip ? "-scale-x-100" : ""}`}
    >
      <path d="M0 71 C 40 71, 40 1, 80 1" stroke="#334863" />
      <path d="M0 71 H 80" stroke="#334863" />
      <path d="M0 71 C 40 71, 40 141, 80 141" stroke="#334863" />
    </svg>
  );
}

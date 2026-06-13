import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/SiteChrome";
import Footer from "@/components/Footer";
import CompanySidebar from "@/components/CompanySidebar";
import RuledField from "@/components/RuledField";
import WordSphere from "@/components/WordSphere";
import { CopyEmailChip, FilledButton, LinkedInButton } from "@/components/ui";

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
        <CompanySidebar />
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
                        className="mono-body flex h-10 items-center justify-center rounded-full text-mist"
                        style={{
                          background: "rgba(221,228,227,0.02)",
                          boxShadow:
                            "inset 1px 1px 0 rgba(178,200,232,0.10), inset -1px -1px 0 rgba(178,200,232,0.05)",
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
                    background: "linear-gradient(135deg, #b2c8e8, #334863)",
                    boxShadow: "inset 0 0 50px #b2c8e8",
                  }}
                >
                  <span className="mono-body w-[180px] text-[#1b324b]">
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
              <FilledButton href="mailto:info@codistica.com">
                Tell us what you&apos;re building
              </FilledButton>
            </div>
          </section>

          {/* 02 — team & talent */}
          <section
            id="team-talent"
            className="relative scroll-mt-10 overflow-hidden rounded-[40px]"
          >
            <Image
              src="/images/team-bg.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="1060px"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(120deg, rgba(9,15,15,0.9), rgba(51,72,99,0.55))",
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
                  We look for precision, curiosity, and pride in thoughtful work.
                  People who care deeply about what they create and thrive in an
                  environment built around discipline, ownership, and the freedom
                  to think.
                </p>
                <div>
                  <FilledButton href="mailto:info@codistica.com?subject=Open%20roles">
                    See open roles
                  </FilledButton>
                </div>
              </div>
              {/* decorative team-values tree */}
              <div className="mono-body hidden flex-1 flex-col items-end justify-end gap-2 text-link-ice sm:flex">
                <span className="mono-label mb-2 text-mist">What Drives the Team</span>
                {[
                  "genuine passion for what we build",
                  "Respect for engineering",
                  "Shared commitment to excellence",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-3">
                    {t}
                    <span className="h-px w-12 bg-steel" aria-hidden />
                    <span className="h-4 w-1 rounded-r border border-steel" aria-hidden />
                  </span>
                ))}
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
                <p className="text-lg font-medium leading-relaxed text-mist">
                  We collaborate with investors who share both strategic
                  perspective and a genuine belief in the value of meaningful
                  systems. Our approach is not transactional. We seek partners
                  grounded in long-term thinking, disciplined execution, and the
                  patience to build something that lasts.
                </p>
                <div>
                  <FilledButton href="mailto:info@codistica.com">Talk to us</FilledButton>
                </div>
              </div>
            </div>
          </section>

          {/* interlude image */}
          <section className="relative flex h-[540px] items-center justify-center overflow-hidden rounded-[40px]">
            <Image
              src="/images/texture-streaks.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="1060px"
            />
            <h2 className="display relative text-center text-foam">
              What moves the world is rarely seen
            </h2>
          </section>

          {/* powering the invisible */}
          <section
            id="powering-the-invisible"
            className="flex scroll-mt-10 flex-col overflow-hidden rounded-[40px] bg-ink-deep"
          >
            <div className="flex flex-col gap-10 rounded-[40px] bg-panel p-7 sm:p-[60px]">
              <div className="flex max-w-[470px] flex-col gap-2">
                <h2 className="mono-body text-foam">The invisible layer</h2>
                <p className="heading text-foam">
                  Every day, the world runs on systems no one thinks about.
                </p>
              </div>
              <p className="text-lg font-medium leading-relaxed text-mist">
                Across cities, industries, and infrastructures, countless systems
                operate quietly behind the scenes. They move people, enable
                communication, power buildings, and process resources.
                <br />
                Controllers. Sensors. Data. Software. Quiet layers of
                intelligence shaping how the world functions, yet are rarely
                seen.
              </p>
            </div>
            <div className="flex flex-col pb-[60px]">
              <div
                className="grid gap-[60px] bg-cover px-7 py-4 sm:grid-cols-2 sm:px-[60px]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #090f0f, transparent 50%, #090f0f), url(/images/marquee-glow.jpg)",
                }}
              >
                <h3 className="mono-body py-4 text-foam">Connected with purpose</h3>
                <h3 className="mono-body py-4 text-foam">Where we work</h3>
              </div>
              <div className="grid gap-[60px] px-7 sm:grid-cols-2 sm:px-[60px]">
                <p className="text-sm font-medium leading-relaxed text-mist">
                  When connected with purpose, these elements transform machines
                  into living systems. Isolated components become ecosystems.
                  Static infrastructure becomes responsive, observable, aware.
                </p>
                <p className="text-sm font-medium leading-relaxed text-mist">
                  Codistica was built around curiosity, discipline, and a deep
                  respect for this invisible layer. Our work focuses precisely
                  there. In the intelligence that allows complex systems to
                  operate with greater clarity, reliability, and awareness.
                </p>
              </div>
            </div>
          </section>

          {/* founder's belief */}
          <section
            id="founders-belief"
            className="relative scroll-mt-10 overflow-hidden rounded-[40px]"
          >
            <Image
              src="/images/texture-streaks.jpg"
              alt=""
              fill
              className="object-cover opacity-60"
              sizes="1060px"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(9,15,15,0) 0%, #090f0f 100%)",
              }}
            />
            <div className="relative flex flex-col px-7 sm:px-[60px]">
              <div id="principle" className="scroll-mt-10 pt-[60px]">
                <blockquote className="heading text-foam">
                  &quot;Find what you are passionate about
                  <br />
                  and passionate even more&quot;
                </blockquote>
              </div>
              <div className="mt-[104px] flex flex-col justify-between gap-8 border-t border-[#003736] py-5 pb-[60px] sm:flex-row sm:items-end">
                <div className="flex flex-col gap-8">
                  <div className="text-lg font-medium leading-relaxed">
                    <div className="text-foam">Ernesto Stifano</div>
                    <div className="text-mist">Co-founder, CEO</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <CopyEmailChip email="ernesto.stifano@codistica.com" />
                    <LinkedInButton />
                  </div>
                </div>
                <Image
                  src="/images/founder.jpg"
                  alt="Ernesto Stifano, co-founder and CEO of Codistica"
                  width={160}
                  height={160}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </section>

          {/* what we do */}
          <section className="relative flex flex-col items-center gap-10 overflow-hidden rounded-[40px] bg-panel p-7 sm:p-[60px]">
            <span className="mono-body absolute left-7 top-7 text-foam sm:left-[60px] sm:top-[60px]">
              What we do
            </span>
            <WordSphere />
            <div className="grid w-full gap-[60px] sm:grid-cols-2">
              <h3 className="heading text-foam">
                Every system.
                <br />
                One conviction.
              </h3>
              <div className="flex flex-col gap-10">
                <p className="text-lg font-medium leading-relaxed text-mist">
                  Connect physical infrastructure with digital intelligence. Turn
                  the invisible into something observable, responsive, and aware.
                  <br />
                  Concept to implementation. In-house. End to end.
                </p>
                <div>
                  <FilledButton href="mailto:info@codistica.com">Talk to us</FilledButton>
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
      <path d="M0 71 C 40 71, 40 141, 80 141" stroke="#334863" />
    </svg>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Header } from "@/components/SiteChrome";
import { CopyEmailChip, FilledButton, LinkedInButton } from "@/components/ui";
import WordSphere from "@/components/WordSphere";

export const metadata: Metadata = {
  title: "How we think - Codistica",
  description:
    "Why, how, and what drives Codistica. The founder's belief in building the invisible layer of intelligent systems.",
};

export default function AboutPage() {
  return (
    <>
      <Header sticky />
      <div className="px-5 pb-30 pt-10">
        <main className="mx-auto flex w-full max-w-[1060px] flex-col gap-5">
          {/* hero */}
          <section className="theme-pin-dark relative flex h-[540px] items-center justify-center overflow-hidden rounded-[40px]">
            <Image
              src="/images/texture-streaks.jpg"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="1060px"
            />
            <h1 className="display relative text-center text-foam">
              How we think.
              <br />
              Founder&apos;s belief.
            </h1>
          </section>

          {/* 01 — why */}
          <section
            id="why"
            className="flex scroll-mt-10 flex-col gap-10 rounded-[40px] bg-panel p-7 sm:p-[60px]"
          >
            <h2 className="heading text-foam">It always begins with a question.</h2>
            <p className="text-lg font-medium leading-relaxed text-mist">
              A quiet spark of curiosity that refuses to fade. Fueled by passion and guided by the
              belief that every insight can shape something greater, we aim to leave the world more
              connected, more conscious, and quietly changed for the better.
            </p>
          </section>

          {/* 02 — how */}
          <section
            id="how"
            className="flex scroll-mt-10 flex-col gap-10 rounded-[40px] bg-panel p-7 sm:p-[60px]"
          >
            <h2 className="heading text-foam">
              We write the hidden stories within the world around us.
            </h2>
            <p className="text-lg font-medium leading-relaxed text-mist">
              Turning data into moments of clarity and wonder. By challenging what seems impossible
              today, we enable tomorrow&apos;s possibilities. With courage and no shortcuts taken,
              we explore, we question, and we deliver - nurturing every project as if it carried our
              own name.
            </p>
          </section>

          {/* 03 — what we do */}
          <section
            id="what"
            className="relative flex scroll-mt-10 flex-col items-center gap-10 overflow-hidden rounded-[40px] bg-panel p-7 sm:p-[60px]"
          >
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
                  Connect physical infrastructure with digital intelligence. Turn the invisible into
                  something observable, responsive, and aware.
                  <br />
                  Concept to implementation. In-house. End to end.
                </p>
                <div>
                  <FilledButton href="mailto:info@codistica.com">Talk to us</FilledButton>
                </div>
              </div>
            </div>
          </section>

          {/* interlude image */}
          <section className="theme-pin-dark relative flex h-[540px] items-center justify-center overflow-hidden rounded-[40px]">
            <Image
              src="/images/marquee-glow.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="1060px"
            />
            <h2 className="display relative text-center text-foam">
              What moves the world is rarely seen
            </h2>
          </section>

          {/* 04 — founder's belief */}
          <section
            id="founders-belief"
            className="flex scroll-mt-10 flex-col gap-10 rounded-[40px] bg-panel p-7 sm:p-[60px]"
          >
            <h2 className="heading text-foam">
              Every meaningful system begins with the way we choose to think about the world.
            </h2>
            <p className="text-lg font-medium leading-relaxed text-mist">
              Codistica was built around curiosity, discipline, and a deep respect for the invisible
              systems that sustain modern life.
              <br />
              <br />
              Across cities, industries, and infrastructures, countless mechanisms operate quietly
              behind the scenes. They move people, enable communication, power buildings, process
              resources, and support the environments where we live and work.
              <br />
              <br />
              Most of these systems remain invisible. Yet they shape how the world functions. At
              Codistica, our work focuses precisely there, in the layers of intelligence that allow
              complex systems to operate with greater clarity, reliability, and awareness.
            </p>
          </section>

          {/* a principle that guides us */}
          <section
            id="principle"
            className="theme-pin-dark relative scroll-mt-10 overflow-hidden rounded-[40px]"
          >
            <Image
              src="/images/marquee-glow.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="1060px"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(9,15,15,0) 0%, #090f0f 100%)",
              }}
            />
            <div className="relative flex flex-col px-7 sm:px-[60px]">
              <div className="flex flex-col gap-6 pt-[60px]">
                <span className="mono-body text-mist">
                  The founder often summarizes this philosophy in a simple idea
                </span>
                <blockquote className="heading text-foam">
                  &quot;Find what you are passionate about
                  <br />
                  and passionate even more&quot;
                </blockquote>
              </div>
              <div className="mt-[80px] flex flex-col gap-8 border-t border-[#003736] py-5 pb-[60px]">
                <div className="text-lg font-medium leading-relaxed">
                  <div className="text-foam">Ernesto Stifano</div>
                  <div className="text-mist">Co-founder, CEO</div>
                </div>
                <div className="flex items-center gap-1">
                  <CopyEmailChip email="ernesto.stifano@codistica.com" />
                  <LinkedInButton />
                </div>
              </div>
            </div>
          </section>

          {/* 05 — powering the invisible */}
          <section
            id="powering-the-invisible"
            className="flex scroll-mt-10 flex-col overflow-hidden rounded-[40px] bg-ink-deep"
          >
            <div className="flex flex-col gap-10 rounded-[40px] bg-panel p-7 sm:p-[60px]">
              <div className="flex max-w-[470px] flex-col gap-2">
                <h2 className="mono-body text-foam">The invisible layer</h2>
                <p className="heading text-foam">
                  Many of the systems that sustain modern life are never seen.
                </p>
              </div>
              <p className="text-lg font-medium leading-relaxed text-mist">
                Controllers. Sensors. Data. Infrastructure. Software. Quiet layers of intelligence
                shaping how cities move, buildings operate, and industries function.
                <br />
                When connected with purpose, these elements transform machines into living systems.
                This is where Codistica works, designing the intelligence that powers what is
                unseen, yet essential to the world around us.
              </p>
            </div>
            <div className="flex flex-col pb-[60px]">
              <div
                className="grid gap-[60px] px-7 py-4 sm:grid-cols-2 sm:px-[60px]"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse 130% 175% at 38% 50%, rgba(9,15,15,0) 0%, rgba(9,15,15,0) 44%, #090f0f 100%), url(/images/marquee-glow.jpg)",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h3 className="mono-body py-4 text-foam">Connected with purpose</h3>
                <h3 className="mono-body py-4 text-foam">Where we work</h3>
              </div>
              <div className="grid gap-[60px] px-7 sm:grid-cols-2 sm:px-[60px]">
                <p className="text-sm font-medium leading-relaxed text-mist">
                  When connected with purpose, these elements transform machines into living
                  systems. Isolated components become ecosystems. Static infrastructure becomes
                  responsive, observable, aware.
                </p>
                <p className="text-sm font-medium leading-relaxed text-mist">
                  Codistica was built around curiosity, discipline, and a deep respect for this
                  invisible layer. Our work focuses precisely there. In the intelligence that allows
                  complex systems to operate with greater clarity, reliability, and awareness.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

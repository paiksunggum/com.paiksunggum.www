import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Anchor, Database, Ship, Sparkles } from "lucide-react";

const playfair = Playfair_Display({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Full-bleed hero: night Atlantic + depth, moon, wake, porthole glow */}
      <section className="relative isolate flex min-h-[min(52vh,520px)] w-full flex-col justify-end overflow-hidden pb-10 pt-20 md:min-h-[56vh] md:pb-14 md:pt-24">
        {/* Deep base + cool undertone */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_100%,#0a1628_0%,#03060c_55%,#020308_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-10%,rgba(56,120,200,0.12)_0%,transparent_55%)]"
          aria-hidden
        />
        {/* Vignette + film edge */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]"
          aria-hidden
        />
        {/* Fine grain (SVG noise) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        {/* Moon disc + corona */}
        <div
          className="pointer-events-none absolute -left-[8%] top-[6%] h-[min(38vw,280px)] w-[min(38vw,280px)] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,252,245,0.95)_0%,rgba(230,236,250,0.35)_28%,rgba(120,160,220,0.08)_52%,transparent_68%)] opacity-[0.22] blur-[1px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-[2%] top-[10%] h-[min(22vw,160px)] w-[min(22vw,160px)] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_70%)] blur-2xl"
          aria-hidden
        />
        {/* Constellation haze */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-screen bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.14)_0,transparent_38%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.1)_0,transparent_32%),radial-gradient(circle_at_55%_12%,rgba(200,220,255,0.08)_0,transparent_28%)]"
          aria-hidden
        />
        {/* Horizon fog + moon path on water */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,40,0)_0%,rgba(12,32,58,0.35)_48%,rgba(4,10,20,0.92)_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[28%] left-0 right-0 h-[28%] bg-[linear-gradient(90deg,transparent_0%,rgba(180,210,255,0.07)_50%,transparent_100%)] opacity-80"
          aria-hidden
        />
        {/* Subtle voyage arc (dotted) */}
        <svg
          className="pointer-events-none absolute bottom-[12%] left-1/2 w-[min(140%,900px)] -translate-x-1/2 text-white/10"
          viewBox="0 0 900 120"
          fill="none"
          aria-hidden
        >
          <path
            d="M40 96 C220 20 680 20 860 96"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 10"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {/* Iceberg mass (abstract, lower right) */}
        <div
          className="pointer-events-none absolute -right-[5%] bottom-[12%] h-[min(42vh,320px)] w-[min(48vw,380px)] rotate-[8deg] rounded-[40%_60%_55%_45%] bg-[linear-gradient(165deg,rgba(200,220,235,0.07)_0%,rgba(30,50,70,0.25)_45%,rgba(5,12,20,0.55)_100%)] blur-[2px]"
          aria-hidden
        />
        {/* Warm porthole glows */}
        <div
          className="pointer-events-none absolute bottom-[8%] left-1/2 h-[min(45%,220px)] w-[min(92vw,720px)] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(255,200,120,0.42)_0%,rgba(255,160,70,0.1)_38%,transparent_72%)] blur-md"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[10%] left-[calc(50%-min(28vw,180px))] h-24 w-40 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,220,160,0.32)_0%,transparent_70%)] blur-sm"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[11%] left-[calc(50%+min(18vw,120px))] h-20 w-36 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,210,140,0.26)_0%,transparent_70%)] blur-sm"
          aria-hidden
        />
        {/* Hull silhouette */}
        <svg
          className="pointer-events-none absolute bottom-0 left-1/2 w-[min(118vw,920px)] -translate-x-1/2 text-[#0b1420]"
          viewBox="0 0 900 200"
          fill="currentColor"
          aria-hidden
        >
          <path d="M0 120 L40 95 L120 78 L220 68 L380 62 L520 64 L680 72 L780 82 L860 98 L900 120 L900 200 L0 200 Z" />
          <path
            className="text-[#1a2a3d]"
            d="M60 118 L140 100 L260 88 L420 82 L560 84 L720 92 L820 108 L860 118 L860 200 L60 200 Z"
          />
        </svg>
        {/* Funnels & masts (minimal) */}
        <div
          className="pointer-events-none absolute bottom-[min(18%,72px)] left-[calc(50%-min(8vw,48px))] h-[min(14vh,100px)] w-3 rounded-sm bg-[#1c2836] shadow-[0_0_20px_rgba(255,200,120,0.15)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[min(18%,72px)] left-[calc(50%+min(2vw,12px))] h-[min(12vh,88px)] w-2.5 rounded-sm bg-[#1c2836]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[min(18%,72px)] left-[calc(50%+min(10vw,64px))] h-[min(11vh,80px)] w-2 rounded-sm bg-[#1c2836]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-[#d4c5a9] drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
            RMS Titanic · 1912
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#d4c5a9] drop-shadow-[0_1px_14px_rgba(0,0,0,0.45)] md:text-4xl lg:text-5xl">
            <span className="block text-balance">
              The legend that would not sink,
            </span>
            <span className="mt-1 block text-balance">
              leaves its name in the{" "}
              <span className="whitespace-nowrap">cold night sea.</span>
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-slate-200/90 md:text-base">
            Lantern-scattered light on a quiet sea. From the ship&apos;s route and
            records, follow the data and the questions—then explore it all in
            RagWatson.
          </p>
        </div>
      </section>

      {/* Editorial feature (play pill → ? links to QA chat) */}
      <section className="border-t border-black bg-white px-4 py-10 dark:border-neutral-100 dark:bg-neutral-950 md:py-14">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Today&apos;s story
          </p>
          <article className="overflow-hidden rounded-2xl border border-black bg-neutral-50 shadow-sm dark:border-neutral-100 dark:bg-neutral-900/40">
            <div className="grid gap-0 md:grid-cols-[auto_1fr] md:items-stretch">
              <div className="flex items-start gap-4 border-b border-black p-6 dark:border-neutral-100 md:flex-col md:border-b-0 md:border-r md:border-black dark:md:border-neutral-100 md:p-8">
                <span className="text-5xl font-bold leading-none tracking-tight text-[#9a8550] drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] dark:text-[#d4c5a9] dark:drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] md:text-7xl">
                  1
                </span>
              </div>
              <div className="grid gap-6 p-6 md:grid-cols-[minmax(0,220px)_1fr] md:gap-8 md:p-8">
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-black bg-[#0a1520] dark:border-neutral-100"
                  aria-hidden
                >
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 400 300"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Stylized iceberg</title>
                    <defs>
                      <linearGradient
                        id="icebergCardSky"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#c9dfea" />
                        <stop offset="100%" stopColor="#9ec4dc" />
                      </linearGradient>
                      <linearGradient
                        id="icebergCardSea"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#4f7cab" />
                        <stop offset="55%" stopColor="#355f8a" />
                        <stop offset="100%" stopColor="#1a3048" />
                      </linearGradient>
                      <linearGradient
                        id="icebergCardIceAbove"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="40%"
                      >
                        <stop offset="0%" stopColor="#9eb6c8" />
                        <stop offset="35%" stopColor="#e8e2d4" />
                        <stop offset="100%" stopColor="#f5f0e6" />
                      </linearGradient>
                      <linearGradient
                        id="icebergCardIceBelow"
                        x1="50%"
                        y1="0%"
                        x2="50%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#152a3f" />
                        <stop offset="100%" stopColor="#070f18" />
                      </linearGradient>
                      <radialGradient
                        id="icebergCardSun"
                        cx="100%"
                        cy="0%"
                        r="35%"
                      >
                        <stop offset="0%" stopColor="#fff8e0" stopOpacity="0.95" />
                        <stop offset="40%" stopColor="#f0d78c" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#f0d78c" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    {/* Sky */}
                    <rect
                      x="0"
                      y="0"
                      width="400"
                      height="132"
                      fill="url(#icebergCardSky)"
                    />
                    {/* Sea */}
                    <rect
                      x="0"
                      y="132"
                      width="400"
                      height="168"
                      fill="url(#icebergCardSea)"
                    />
                    {/* Waterline band */}
                    <rect
                      x="0"
                      y="128"
                      width="400"
                      height="8"
                      fill="#6a93b8"
                      opacity="0.35"
                    />
                    {/* Submerged mass — top edge y=132 matches above-ice exactly */}
                    <path
                      fill="url(#icebergCardIceBelow)"
                      d="M 115 132 L 98 168 L 88 210 L 84 252 L 92 285 L 128 298 L 200 300 L 272 298 L 308 285 L 322 252 L 330 210 L 332 175 L 328 145 L 300 132 L 285 132 Z"
                    />
                    <g opacity="0.12" stroke="#a8c4dc" strokeWidth="0.6">
                      {[130, 155, 180, 200, 220, 245, 270].map((x) => (
                        <line
                          key={x}
                          x1={x}
                          y1="132"
                          x2={x}
                          y2="300"
                        />
                      ))}
                    </g>
                    {/* Above-water — same bottom segment 115–300 @ y=132 */}
                    <path
                      fill="url(#icebergCardIceAbove)"
                      d="M 115 132 L 128 110 L 152 82 L 185 70 L 215 74 L 245 88 L 268 108 L 282 125 L 290 132 L 300 132 Z"
                    />
                    <path
                      fill="#c5d0dc"
                      opacity="0.55"
                      d="M 115 132 L 128 110 L 135 115 L 125 132 Z"
                    />
                    <path
                      fill="#b8c5d4"
                      opacity="0.4"
                      d="M 185 70 L 215 74 L 208 92 L 178 88 Z"
                    />
                    {/* Sun */}
                    <circle cx="352" cy="48" r="14" fill="#fff4cc" opacity="0.95" />
                    <circle cx="352" cy="48" r="28" fill="url(#icebergCardSun)" />
                  </svg>
                  {/* Grain as separate layer (filter blend on empty fill unreliable in all engines) */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.2] bg-[linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]"
                    style={{ backgroundSize: "12px 12px" }}
                  />
                  <div className="absolute bottom-3 left-3 right-3 h-px bg-gradient-to-r from-transparent via-slate-300/25 to-transparent" />
                  <p className="absolute bottom-2 left-3 font-mono text-[10px] tracking-wide text-slate-300/90">
                    North Atlantic · night track
                  </p>
                </div>
                <div className="flex min-h-full flex-col justify-between gap-6">
                  <div>
                    <h2
                      className={`${playfair.className} text-balance text-2xl font-bold leading-snug text-neutral-900 dark:text-neutral-50 md:text-3xl`}
                    >
                      April 1912: questions the last lights left behind
                    </h2>
                    <p
                      className={`${playfair.className} mt-3 text-pretty text-base font-medium leading-relaxed text-[#7a6638] dark:text-[#d4c5a9] dark:opacity-95`}
                    >
                      What do the passenger lists and survival records whisper
                      back? The data one ship left behind opens again through
                      modern models and question-answering.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black pt-4 dark:border-neutral-100">
                    <p className="text-sm font-semibold text-red-900/90 dark:text-red-300/90">
                      Records · Titanic dataset
                    </p>
                    <Link
                      href="/chat"
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-neutral-900 bg-white text-lg font-bold leading-none text-neutral-900 shadow-sm transition-colors hover:bg-neutral-900 hover:text-white dark:border-neutral-100 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
                      aria-label="Open question chat"
                    >
                      ?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Three columns — 3 zones with thin solid dividers */}
      <section className="border-t border-black bg-neutral-50 px-4 py-12 dark:border-neutral-100 dark:bg-neutral-900/30 md:py-16">
        <div className="mx-auto grid max-w-5xl md:grid-cols-3">
          <div className="border-b border-black px-5 py-8 text-center dark:border-neutral-100 md:border-b-0 md:border-r md:px-8 md:text-left">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 md:mx-0">
              <Ship className="h-6 w-6" strokeWidth={1.5} aria-hidden />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Route & history
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              From Southampton toward New York—unpack the final voyage through
              the questions you ask.
            </p>
          </div>
          <div className="border-b border-black px-5 py-8 text-center dark:border-neutral-100 md:border-b-0 md:border-r md:px-8 md:text-left">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 md:mx-0">
              <Database className="h-6 w-6" strokeWidth={1.5} aria-hidden />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Tables & survival signals
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              See how cabin class, gender, and age surface in the metrics—then
              read the story the rows tell.
            </p>
          </div>
          <div className="px-5 py-8 text-center md:px-8 md:text-left">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 md:mx-0">
              <Sparkles className="h-6 w-6" strokeWidth={1.5} aria-hidden />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Answers that follow a question
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Tap the “?” to open Titanic QA Assistant and start a Gemini
              conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Quick entry strip */}
      <section className="border-t border-black bg-white px-4 py-10 dark:border-neutral-100 dark:bg-neutral-950">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-black bg-neutral-50/80 px-6 py-8 text-center dark:border-neutral-100 dark:bg-neutral-900/40 md:flex-row md:text-left">
          <div className="flex items-center gap-3">
            <Anchor className="h-8 w-8 shrink-0 text-slate-500 dark:text-slate-400" />
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                Ready to ask something?
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                In chat, pick a model and ask anything about the Titanic—or the
                data behind it.
              </p>
            </div>
          </div>
          <Link
            href="/chat"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
          >
            Open chat
          </Link>
        </div>
      </section>
    </div>
  );
}

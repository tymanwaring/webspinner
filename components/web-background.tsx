"use client"

import { useScroll, useTransform, motion, useReducedMotion } from "motion/react"

/**
 * WebBackground -- A full-page spider web that dynamically weaves itself
 * as the user scrolls. Spokes draw first, then capture-spiral rings expand
 * outward, creating the sensation of a web being spun in real-time.
 *
 * Uses window-level scroll progress to drive pathLength on each layer,
 * staggered so inner rings appear before outer rings.
 */
export function WebBackground() {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  // Spokes draw from 0-40% of scroll
  const spokeProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  // Ring layers staggered across the scroll range
  const ring1 = useTransform(scrollYProgress, [0.05, 0.25], [0, 1])
  const ring2 = useTransform(scrollYProgress, [0.12, 0.38], [0, 1])
  const ring3 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const ring4 = useTransform(scrollYProgress, [0.3, 0.65], [0, 1])
  const ring5 = useTransform(scrollYProgress, [0.4, 0.8], [0, 1])
  // Wisps appear last
  const wispProgress = useTransform(scrollYProgress, [0.6, 0.9], [0, 1])

  const stroke = "var(--node-color)"

  // If reduced motion, all elements render fully
  const sp = reducedMotion ? 1 : spokeProgress
  const r1 = reducedMotion ? 1 : ring1
  const r2 = reducedMotion ? 1 : ring2
  const r3 = reducedMotion ? 1 : ring3
  const r4 = reducedMotion ? 1 : ring4
  const r5 = reducedMotion ? 1 : ring5
  const wp = reducedMotion ? 1 : wispProgress

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      role="presentation"
      aria-hidden="true"
    >
      {/* Subtle ambient red glow at the hub */}
      <div
        className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.24 25 / 0.025) 0%, transparent 50%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <filter id="web-bg-glow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="blur" in2="SourceGraphic" operator="over" />
          </filter>
        </defs>

        <g filter="url(#web-bg-glow)">

          {/* ═══ RADIAL SPOKES ═══ */}
          {[
            { d: "M 500 500 Q 490 340, 470 60",  w: "0.6", o: 0.14 },
            { d: "M 500 500 Q 510 320, 540 20",   w: "0.5", o: 0.12 },
            { d: "M 500 500 Q 460 360, 360 30",   w: "0.5", o: 0.10 },
            { d: "M 500 500 Q 580 380, 740 80",   w: "0.6", o: 0.13 },
            { d: "M 500 500 Q 620 400, 860 180",  w: "0.5", o: 0.11 },
            { d: "M 500 500 Q 640 440, 950 290",  w: "0.5", o: 0.10 },
            { d: "M 500 500 Q 660 490, 960 470",  w: "0.6", o: 0.14 },
            { d: "M 500 500 Q 660 520, 980 560",  w: "0.5", o: 0.12 },
            { d: "M 500 500 Q 620 600, 870 840",  w: "0.6", o: 0.13 },
            { d: "M 500 500 Q 580 630, 740 940",  w: "0.5", o: 0.11 },
            { d: "M 500 500 Q 640 560, 960 720",  w: "0.5", o: 0.10 },
            { d: "M 500 500 Q 510 680, 530 960",  w: "0.6", o: 0.14 },
            { d: "M 500 500 Q 480 660, 440 980",  w: "0.5", o: 0.12 },
            { d: "M 500 500 Q 540 680, 620 970",  w: "0.5", o: 0.10 },
            { d: "M 500 500 Q 380 600, 140 830",  w: "0.6", o: 0.13 },
            { d: "M 500 500 Q 420 620, 260 920",  w: "0.5", o: 0.11 },
            { d: "M 500 500 Q 340 510, 40 540",   w: "0.6", o: 0.14 },
            { d: "M 500 500 Q 340 480, 20 440",   w: "0.5", o: 0.12 },
            { d: "M 500 500 Q 360 550, 60 680",   w: "0.5", o: 0.10 },
            { d: "M 500 500 Q 380 380, 120 120",  w: "0.6", o: 0.13 },
            { d: "M 500 500 Q 420 400, 200 200",  w: "0.5", o: 0.11 },
            { d: "M 500 500 Q 360 440, 50 320",   w: "0.5", o: 0.10 },
          ].map((s, i) => (
            <motion.path
              key={`spoke-${i}`}
              d={s.d}
              stroke={stroke}
              strokeWidth={s.w}
              opacity={s.o}
              strokeLinecap="round"
              style={{ pathLength: sp }}
            />
          ))}

          {/* ═══ RING 1 (~60px) ═══ */}
          {[
            "M 488 442 Q 452 440, 442 468",
            "M 442 468 Q 438 496, 446 520",
            "M 446 520 Q 456 548, 484 556",
            "M 484 556 Q 516 562, 540 548",
            "M 540 548 Q 560 530, 562 500",
            "M 562 500 Q 560 472, 544 454",
            "M 544 454 Q 524 438, 488 442",
          ].map((d, i) => (
            <motion.path
              key={`r1-${i}`}
              d={d}
              stroke={stroke}
              strokeWidth="0.35"
              opacity={i % 2 === 0 ? 0.12 : 0.11}
              strokeLinecap="round"
              style={{ pathLength: r1 }}
            />
          ))}

          {/* ═══ RING 2 (~130px) ═══ */}
          {[
            "M 476 372 Q 410 366, 376 420",
            "M 376 420 Q 348 468, 358 530",
            "M 358 530 Q 372 590, 426 618",
            "M 426 618 Q 486 644, 550 622",
            "M 550 622 Q 610 596, 636 536",
            "M 636 536 Q 650 478, 624 420",
            "M 624 420 Q 594 368, 530 368",
            "M 530 368 Q 500 372, 476 372",
          ].map((d, i) => (
            <motion.path
              key={`r2-${i}`}
              d={d}
              stroke={stroke}
              strokeWidth="0.35"
              opacity={i % 2 === 0 ? 0.11 : 0.10}
              strokeLinecap="round"
              style={{ pathLength: r2 }}
            />
          ))}

          {/* ═══ RING 3 (~220px) ═══ */}
          {[
            "M 460 282 Q 352 276, 296 356",
            "M 296 356 Q 248 432, 260 530",
            "M 260 530 Q 278 622, 360 684",
            "M 360 684 Q 448 738, 556 710",
            "M 556 710 Q 656 678, 716 588",
            "M 716 588 Q 756 504, 724 408",
            "M 724 408 Q 684 316, 576 282",
            "M 576 282 Q 510 270, 460 282",
          ].map((d, i) => (
            <motion.path
              key={`r3-${i}`}
              d={d}
              stroke={stroke}
              strokeWidth="0.35"
              opacity={i % 2 === 0 ? 0.10 : 0.09}
              strokeLinecap="round"
              style={{ pathLength: r3 }}
            />
          ))}

          {/* ═══ RING 4 (~340px) ═══ */}
          {[
            "M 442 164 Q 276 156, 186 286",
            "M 186 286 Q 108 406, 132 560",
            "M 132 560 Q 160 700, 298 792",
            "M 298 792 Q 436 870, 602 828",
            "M 602 828 Q 756 780, 834 646",
            "M 834 646 Q 896 520, 852 372",
            "M 852 372 Q 798 232, 636 168",
            "M 636 168 Q 530 136, 442 164",
          ].map((d, i) => (
            <motion.path
              key={`r4-${i}`}
              d={d}
              stroke={stroke}
              strokeWidth="0.3"
              opacity={i % 2 === 0 ? 0.08 : 0.07}
              strokeLinecap="round"
              style={{ pathLength: r4 }}
            />
          ))}

          {/* ═══ RING 5 (outermost ~460px) ═══ */}
          {[
            "M 430 44  Q 208 38, 80 220",
            "M 80 220  Q -24 396, 20 600",
            "M 20 600  Q 64 792, 250 912",
            "M 250 912 Q 438 1006, 660 948",
            "M 660 948 Q 862 882, 948 702",
            "M 948 702 Q 1016 530, 962 334",
            "M 962 334 Q 898 148, 690 56",
            "M 690 56  Q 550 10, 430 44",
          ].map((d, i) => (
            <motion.path
              key={`r5-${i}`}
              d={d}
              stroke={stroke}
              strokeWidth="0.3"
              opacity={i % 2 === 0 ? 0.06 : 0.05}
              strokeLinecap="round"
              style={{ pathLength: r5 }}
            />
          ))}

          {/* ═══ DANGLING WISPS ═══ */}
          {[
            "M 470 60  Q 466 30, 462 8",
            "M 960 470 Q 978 468, 996 472",
            "M 530 960 Q 534 978, 532 996",
            "M 40  540 Q 22  538, 4   542",
            "M 120 120 Q 100 100, 78  76",
            "M 870 840 Q 888 860, 904 882",
            "M 140 830 Q 118 854, 96  876",
            "M 740 80  Q 754 62,  770 42",
          ].map((d, i) => (
            <motion.path
              key={`wisp-${i}`}
              d={d}
              stroke={stroke}
              strokeWidth="0.25"
              strokeDasharray="3 5"
              opacity={i < 4 ? 0.07 : 0.06}
              strokeLinecap="round"
              style={{ pathLength: wp }}
            />
          ))}

          {/* ═══ HUB ═══ */}
          <circle cx="500" cy="500" r="4" fill={stroke} opacity="0.12" />
          <circle cx="500" cy="500" r="1.5" fill={stroke} opacity="0.22" />
        </g>
      </svg>
    </div>
  )
}

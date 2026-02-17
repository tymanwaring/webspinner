"use client"

/**
 * WebBackground -- A full-page intricate spider web that branches out from a
 * central hub, covering the entire viewport with radiating spokes and capture
 * spirals. Rendered as a single large SVG with hand-crafted paths so it reads
 * as a true orb-weaver web rather than a geometric icon.
 *
 * All coordinates are pre-computed strings to avoid hydration mismatches.
 * Kept at low opacity so it adds depth without hurting readability.
 */
export function WebBackground() {
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
            "radial-gradient(circle, oklch(0.55 0.24 25 / 0.02) 0%, transparent 50%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        style={{ animation: "web-breathe 18s ease-in-out infinite" }}
      >
        <defs>
          <filter id="web-bg-glow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="blur" in2="SourceGraphic" operator="over" />
          </filter>
        </defs>

        <g filter="url(#web-bg-glow)">
          {/* ═══ RADIAL SPOKES ═══
              20 irregular spokes radiating from hub (500,500) to the edges.
              Slight curves via quadratic control points for organic feel. */}

          {/* Top cluster */}
          <path d="M 500 500 Q 490 340, 470 60"   stroke="var(--node-color)" strokeWidth="0.6" opacity="0.14" strokeLinecap="round" />
          <path d="M 500 500 Q 510 320, 540 20"    stroke="var(--node-color)" strokeWidth="0.5" opacity="0.12" strokeLinecap="round" />
          <path d="M 500 500 Q 460 360, 360 30"    stroke="var(--node-color)" strokeWidth="0.5" opacity="0.10" strokeLinecap="round" />

          {/* Top-right */}
          <path d="M 500 500 Q 580 380, 740 80"    stroke="var(--node-color)" strokeWidth="0.6" opacity="0.13" strokeLinecap="round" />
          <path d="M 500 500 Q 620 400, 860 180"   stroke="var(--node-color)" strokeWidth="0.5" opacity="0.11" strokeLinecap="round" />
          <path d="M 500 500 Q 640 440, 950 290"   stroke="var(--node-color)" strokeWidth="0.5" opacity="0.10" strokeLinecap="round" />

          {/* Right cluster */}
          <path d="M 500 500 Q 660 490, 960 470"   stroke="var(--node-color)" strokeWidth="0.6" opacity="0.14" strokeLinecap="round" />
          <path d="M 500 500 Q 660 520, 980 560"   stroke="var(--node-color)" strokeWidth="0.5" opacity="0.12" strokeLinecap="round" />

          {/* Bottom-right */}
          <path d="M 500 500 Q 620 600, 870 840"   stroke="var(--node-color)" strokeWidth="0.6" opacity="0.13" strokeLinecap="round" />
          <path d="M 500 500 Q 580 630, 740 940"   stroke="var(--node-color)" strokeWidth="0.5" opacity="0.11" strokeLinecap="round" />
          <path d="M 500 500 Q 640 560, 960 720"   stroke="var(--node-color)" strokeWidth="0.5" opacity="0.10" strokeLinecap="round" />

          {/* Bottom cluster */}
          <path d="M 500 500 Q 510 680, 530 960"   stroke="var(--node-color)" strokeWidth="0.6" opacity="0.14" strokeLinecap="round" />
          <path d="M 500 500 Q 480 660, 440 980"   stroke="var(--node-color)" strokeWidth="0.5" opacity="0.12" strokeLinecap="round" />
          <path d="M 500 500 Q 540 680, 620 970"   stroke="var(--node-color)" strokeWidth="0.5" opacity="0.10" strokeLinecap="round" />

          {/* Bottom-left */}
          <path d="M 500 500 Q 380 600, 140 830"   stroke="var(--node-color)" strokeWidth="0.6" opacity="0.13" strokeLinecap="round" />
          <path d="M 500 500 Q 420 620, 260 920"   stroke="var(--node-color)" strokeWidth="0.5" opacity="0.11" strokeLinecap="round" />

          {/* Left cluster */}
          <path d="M 500 500 Q 340 510, 40 540"    stroke="var(--node-color)" strokeWidth="0.6" opacity="0.14" strokeLinecap="round" />
          <path d="M 500 500 Q 340 480, 20 440"    stroke="var(--node-color)" strokeWidth="0.5" opacity="0.12" strokeLinecap="round" />
          <path d="M 500 500 Q 360 550, 60 680"    stroke="var(--node-color)" strokeWidth="0.5" opacity="0.10" strokeLinecap="round" />

          {/* Top-left */}
          <path d="M 500 500 Q 380 380, 120 120"   stroke="var(--node-color)" strokeWidth="0.6" opacity="0.13" strokeLinecap="round" />
          <path d="M 500 500 Q 420 400, 200 200"   stroke="var(--node-color)" strokeWidth="0.5" opacity="0.11" strokeLinecap="round" />
          <path d="M 500 500 Q 360 440, 50 320"    stroke="var(--node-color)" strokeWidth="0.5" opacity="0.10" strokeLinecap="round" />


          {/* ═══ CAPTURE SPIRALS ═══
              Concentric irregular arcs connecting adjacent spokes.
              Each ring is a series of open bezier arcs that sag inward. */}

          {/* --- Ring 1: close to hub (~60px radius) --- */}
          <path d="M 488 442 Q 452 440, 442 468" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.12" strokeLinecap="round" />
          <path d="M 442 468 Q 438 496, 446 520" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.11" strokeLinecap="round" />
          <path d="M 446 520 Q 456 548, 484 556" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.12" strokeLinecap="round" />
          <path d="M 484 556 Q 516 562, 540 548" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.11" strokeLinecap="round" />
          <path d="M 540 548 Q 560 530, 562 500" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.12" strokeLinecap="round" />
          <path d="M 562 500 Q 560 472, 544 454" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.11" strokeLinecap="round" />
          <path d="M 544 454 Q 524 438, 488 442" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.12" strokeLinecap="round" />

          {/* --- Ring 2: (~130px radius) --- */}
          <path d="M 476 372 Q 410 366, 376 420" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.11" strokeLinecap="round" />
          <path d="M 376 420 Q 348 468, 358 530" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.10" strokeLinecap="round" />
          <path d="M 358 530 Q 372 590, 426 618" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.11" strokeLinecap="round" />
          <path d="M 426 618 Q 486 644, 550 622" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.10" strokeLinecap="round" />
          <path d="M 550 622 Q 610 596, 636 536" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.11" strokeLinecap="round" />
          <path d="M 636 536 Q 650 478, 624 420" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.10" strokeLinecap="round" />
          <path d="M 624 420 Q 594 368, 530 368" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.11" strokeLinecap="round" />
          <path d="M 530 368 Q 500 372, 476 372" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.10" strokeLinecap="round" />

          {/* --- Ring 3: (~220px radius) --- */}
          <path d="M 460 282 Q 352 276, 296 356" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.10" strokeLinecap="round" />
          <path d="M 296 356 Q 248 432, 260 530" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.09" strokeLinecap="round" />
          <path d="M 260 530 Q 278 622, 360 684" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.10" strokeLinecap="round" />
          <path d="M 360 684 Q 448 738, 556 710" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.09" strokeLinecap="round" />
          <path d="M 556 710 Q 656 678, 716 588" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.10" strokeLinecap="round" />
          <path d="M 716 588 Q 756 504, 724 408" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.09" strokeLinecap="round" />
          <path d="M 724 408 Q 684 316, 576 282" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.10" strokeLinecap="round" />
          <path d="M 576 282 Q 510 270, 460 282" stroke="var(--node-color)" strokeWidth="0.35" opacity="0.09" strokeLinecap="round" />

          {/* --- Ring 4: (~340px radius) --- */}
          <path d="M 442 164 Q 276 156, 186 286" stroke="var(--node-color)" strokeWidth="0.3" opacity="0.08" strokeLinecap="round" />
          <path d="M 186 286 Q 108 406, 132 560" stroke="var(--node-color)" strokeWidth="0.3" opacity="0.07" strokeLinecap="round" />
          <path d="M 132 560 Q 160 700, 298 792" stroke="var(--node-color)" strokeWidth="0.3" opacity="0.08" strokeLinecap="round" />
          <path d="M 298 792 Q 436 870, 602 828" stroke="var(--node-color)" strokeWidth="0.3" opacity="0.07" strokeLinecap="round" />
          <path d="M 602 828 Q 756 780, 834 646" stroke="var(--node-color)" strokeWidth="0.3" opacity="0.08" strokeLinecap="round" />
          <path d="M 834 646 Q 896 520, 852 372" stroke="var(--node-color)" strokeWidth="0.3" opacity="0.07" strokeLinecap="round" />
          <path d="M 852 372 Q 798 232, 636 168" stroke="var(--node-color)" strokeWidth="0.3" opacity="0.08" strokeLinecap="round" />
          <path d="M 636 168 Q 530 136, 442 164" stroke="var(--node-color)" strokeWidth="0.3" opacity="0.07" strokeLinecap="round" />

          {/* --- Ring 5: outermost (~460px, reaches edges) --- */}
          <path d="M 430 44  Q 208 38, 80 220"    stroke="var(--node-color)" strokeWidth="0.3" opacity="0.06" strokeLinecap="round" />
          <path d="M 80 220  Q -24 396, 20 600"   stroke="var(--node-color)" strokeWidth="0.3" opacity="0.05" strokeLinecap="round" />
          <path d="M 20 600  Q 64 792, 250 912"   stroke="var(--node-color)" strokeWidth="0.3" opacity="0.06" strokeLinecap="round" />
          <path d="M 250 912 Q 438 1006, 660 948"  stroke="var(--node-color)" strokeWidth="0.3" opacity="0.05" strokeLinecap="round" />
          <path d="M 660 948 Q 862 882, 948 702"   stroke="var(--node-color)" strokeWidth="0.3" opacity="0.06" strokeLinecap="round" />
          <path d="M 948 702 Q 1016 530, 962 334"  stroke="var(--node-color)" strokeWidth="0.3" opacity="0.05" strokeLinecap="round" />
          <path d="M 962 334 Q 898 148, 690 56"    stroke="var(--node-color)" strokeWidth="0.3" opacity="0.06" strokeLinecap="round" />
          <path d="M 690 56  Q 550 10, 430 44"     stroke="var(--node-color)" strokeWidth="0.3" opacity="0.05" strokeLinecap="round" />


          {/* ═══ DANGLING / BROKEN STRANDS ═══
              Short broken wisps that extend beyond the outer ring
              for organic imperfection */}
          <path d="M 470 60  Q 466 30, 462 8"     stroke="var(--node-color)" strokeWidth="0.25" strokeDasharray="3 5" opacity="0.07" strokeLinecap="round" />
          <path d="M 960 470 Q 978 468, 996 472"  stroke="var(--node-color)" strokeWidth="0.25" strokeDasharray="3 5" opacity="0.07" strokeLinecap="round" />
          <path d="M 530 960 Q 534 978, 532 996"  stroke="var(--node-color)" strokeWidth="0.25" strokeDasharray="3 5" opacity="0.07" strokeLinecap="round" />
          <path d="M 40  540 Q 22  538, 4   542"  stroke="var(--node-color)" strokeWidth="0.25" strokeDasharray="3 5" opacity="0.07" strokeLinecap="round" />
          <path d="M 120 120 Q 100 100, 78  76"   stroke="var(--node-color)" strokeWidth="0.25" strokeDasharray="3 5" opacity="0.06" strokeLinecap="round" />
          <path d="M 870 840 Q 888 860, 904 882"  stroke="var(--node-color)" strokeWidth="0.25" strokeDasharray="3 5" opacity="0.06" strokeLinecap="round" />
          <path d="M 140 830 Q 118 854, 96  876"  stroke="var(--node-color)" strokeWidth="0.25" strokeDasharray="3 5" opacity="0.06" strokeLinecap="round" />
          <path d="M 740 80  Q 754 62,  770 42"   stroke="var(--node-color)" strokeWidth="0.25" strokeDasharray="3 5" opacity="0.06" strokeLinecap="round" />

          {/* ═══ HUB ═══ */}
          <circle cx="500" cy="500" r="4" fill="var(--node-color)" opacity="0.12" />
          <circle cx="500" cy="500" r="1.5" fill="var(--node-color)" opacity="0.22" />
        </g>
      </svg>
    </div>
  )
}

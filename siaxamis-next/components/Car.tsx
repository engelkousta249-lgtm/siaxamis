"use client";
import { useId } from "react";
import { motion } from "framer-motion";

const BODY =
  "M6 94 C6 86 14 82 30 80 L74 68 C94 52 124 40 160 36 C196 32 238 34 264 42 C284 48 300 58 314 62 L356 70 C380 75 394 83 394 93 L394 104 L6 104 Z";

export default function Car({ color = "#e11d1d", glow = true }: { color?: string; glow?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 400 140" style={{ overflow: "visible", width: "100%", display: "block" }} aria-hidden>
      <defs>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="0" y2="1">
          <motion.stop offset="0" initial={false} animate={{ stopColor: color }} transition={{ duration: 0.6 }} />
          <stop offset="1" stopColor="#000" stopOpacity=".7" />
        </linearGradient>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`w${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a3a55" />
          <stop offset="1" stopColor="#05080f" />
        </linearGradient>
        <linearGradient id={`r${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f4f5" />
          <stop offset="1" stopColor="#71717a" />
        </linearGradient>
        <linearGradient id={`l${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".6" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`f${id}`}><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      {glow && (
        <motion.ellipse
          cx="200" cy="124" rx="185" ry="12" filter={`url(#f${id})`}
          initial={false} animate={{ fill: color }} transition={{ duration: 0.6 }}
          style={{ opacity: 0.55 }}
        />
      )}
      <polygon points="390,84 600,48 600,130" fill={`url(#l${id})`} />
      <g className="flame">
        <polygon points="8,98 -34,96 8,92" fill="#ff7a18" />
        <polygon points="8,97 -16,96 8,94" fill="#fff3b0" />
      </g>
      <path d="M12 76 L58 66 L60 71 L16 82 Z" fill="#0b0b0e" />
      <path d="M34 80 L36 68 M50 74 L52 66" stroke="#0b0b0e" strokeWidth="3" />
      <path d={BODY} fill={`url(#b${id})`} />
      <path d={BODY} fill={`url(#g${id})`} />
      <path d="M96 66 C116 52 140 44 166 41 C200 38 232 40 258 47 C272 52 284 58 298 63 Z" fill={`url(#w${id})`} />
      <path d="M120 60 L150 44 L162 43 L136 61 Z" fill="#fff" opacity=".13" />
      <path d="M178 41 L176 90 M262 49 L268 90" stroke="#000" strokeOpacity=".4" strokeWidth="1.5" fill="none" />
      <path d="M96 66 C116 52 140 44 166 41 C200 38 232 40 258 47" stroke="#fff" strokeOpacity=".6" strokeWidth="1.5" fill="none" />
      <path d="M70 84 L360 84" stroke="#fff" strokeOpacity=".28" strokeWidth="1.5" />
      <rect x="30" y="96" width="340" height="7" rx="3" fill="#000" opacity=".55" />
      <path d="M288 64 L306 64 L300 70 L286 70 Z" fill="#111" />
      <path d="M352 72 L390 81 L394 88 L356 84 Z" fill="#fff" />
      <path d="M352 72 L390 81 L394 88 L356 84 Z" fill="#fff" filter={`url(#f${id})`} />
      <rect x="6" y="82" width="16" height="6" rx="3" fill="#ff2a2a" />
      <rect x="6" y="82" width="16" height="6" rx="3" fill="#ff2a2a" filter={`url(#f${id})`} />

      {[94, 306].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="102" r="32" fill="#07070a" />
          <circle cx={cx} cy="102" r="27" fill="#101013" />
          <g className="wheel">
            <circle cx={cx} cy="102" r="19" fill={`url(#r${id})`} />
            {[0, 72, 144, 216, 288].map((a) => (
              <path key={a} d={`M${cx} 102 L${cx - 3.5} 86 L${cx + 3.5} 86 Z`} fill="#27272a" transform={`rotate(${a} ${cx} 102)`} />
            ))}
            <circle cx={cx} cy="102" r="4.5" fill="#27272a" />
          </g>
          <path d={`M${cx - 22} 90 A24 24 0 0 1 ${cx + 10} 80`} stroke="#ff2a2a" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

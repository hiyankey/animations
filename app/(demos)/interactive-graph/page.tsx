"use client";

import { motion, useMotionTemplate, useSpring } from "motion/react";
import { useRef, useState } from "react";

export default function Page() {
  const [isHovering, setIsHovering] = useState(false);
  const clipPathSpring = useSpring(0, { damping: isHovering ? 25 : 10 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const onPointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const distanceFromRight = Math.max(rect?.right - e.clientX, 0);
    const percentageFromRight = Math.min(
      (distanceFromRight / rect.width) * 100,
      100
    );
    clipPathSpring.set(percentageFromRight);
  };
  const clipPathTemplate = useMotionTemplate`inset(0 ${clipPathSpring}% 0 0)`;

  return (
    <div className="min-h-dvh flex-center">
      <div className="relative aspect-2/1 w-240 flex-center rounded-24 bg-demo-bg">
        <div
          className="h-50 w-90"
          onPointerEnter={() => {
            if (timeoutRef.current) {
              setIsHovering(true);
              clearTimeout(timeoutRef.current);
            }
          }}
          onPointerLeave={() => {
            timeoutRef.current = setTimeout(() => {
              setIsHovering(false);
              clipPathSpring.set(0);
            }, 1000);
          }}
          onPointerMove={onPointerMove}
        >
          <motion.svg
            fill="none"
            style={{ clipPath: clipPathTemplate }}
            viewBox="0 0 644 188"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 118.5s82.308-15.501 113.735-29 74.769-1.713 121.217-12c37.596-8.328 58.517-15.006 93.781-30.5 80.146-35.215 123.213-16 154.141-24.5S635.97.849 644 1.5"
              stroke="var(--color-blue)"
              strokeWidth="2"
            />
            <path
              d="M113.912 89.012C82.437 102.511 1 118.01 1 118.01V188h643V1.023c-8.043-.65-129.399 12.499-160.375 20.998-30.976 8.498-74.11-10.714-154.38 24.496-35.319 15.493-56.272 22.17-93.927 30.497-46.52 10.286-89.93-1.5-121.406 11.998"
              fill="url(#paint0_linear_540_31)"
            />
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear_540_31"
                x1="322.5"
                x2="322.5"
                y1="1"
                y2="188"
              >
                <stop
                  stopColor="oklch(from var(--color-blue) l c h / 40%)"
                  stopOpacity="0.4"
                />
                <stop
                  offset="1"
                  stopColor="oklch(from var(--color-blue) l c h / 0%)"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>
      </div>
    </div>
  );
}

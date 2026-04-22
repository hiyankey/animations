"use client";

import { useDialKit } from "dialkit";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [measuredHeight, setMeasuredHeight] = useState<number | "auto">("auto");
  const measureRef = useRef<HTMLDivElement | null>(null);

  useDialKit(
    "Page",
    {
      toggleMode: { type: "action" },
    },
    {
      onAction: (action) => {
        if (action === "toggleMode") {
          toggleMode();
        }
      },
    }
  );
  const { resolvedTheme, setTheme } = useTheme();

  const toggleMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const content = useMemo(() => {
    // biome-ignore lint/style/useDefaultSwitchClause: shh!
    switch (currentStep) {
      case 0:
        return (
          <>
            <h3 className="mb-2">Create</h3>
            <div className="flex flex-1 flex-col">
              <div className="my-0.5 h-4 rounded-6 bg-gray-3" />
              <div className="my-0.5 h-4 w-2/3 rounded-6 bg-gray-3" />
              <div className="flex w-1/2 items-center gap-1">
                <div className="my-0.5 h-4 w-1/2 rounded-6 bg-gray-3" />
                <div className="my-0.5 h-4 w-1/2 rounded-6 bg-gray-3" />
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h3 className="mb-2">Iterate</h3>

            <div className="flex flex-1 flex-col">
              <div className="my-0.5 h-4 rounded-6 bg-gray-3" />
              <div className="flex w-2/3 items-center gap-1">
                <div className="my-0.5 h-4 w-1/2 rounded-6 bg-gray-3" />
                <div className="my-0.5 h-4 w-1/2 rounded-6 bg-gray-3" />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="mb-2">Refine</h3>
            <div className="flex flex-1 flex-col">
              <div className="my-0.5 h-4 rounded-6 bg-gray-3" />
              <div className="my-0.5 h-4 w-3/4 rounded-6 bg-gray-3" />

              <div className="flex w-2/3 items-center gap-1">
                <div className="my-0.5 h-4 w-1/2 rounded-6 bg-gray-3" />
                <div className="my-0.5 h-4 w-1/2 rounded-6 bg-gray-3" />
              </div>
            </div>
          </>
        );
    }
  }, [currentStep]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: shh!
  useLayoutEffect(() => {
    if (measureRef.current) {
      const height = measureRef.current.offsetHeight;
      setMeasuredHeight(height);
    }
  }, [currentStep]);

  return (
    <MotionConfig transition={{ duration: 0.5, bounce: 0.15, type: "spring" }}>
      <div className="min-h-dvh flex-center">
        <div className="relative aspect-2/1 w-240 flex-center rounded-24 bg-demo-bg">
          <motion.div
            animate={{ height: measuredHeight }}
            className="relative w-90 overflow-clip rounded-12 bg-white shadow-menu dark:bg-gray-2"
          >
            <div className="h-auto" ref={measureRef}>
              <AnimatePresence
                custom={direction}
                initial={false}
                mode="popLayout"
              >
                <motion.div
                  animate={{ x: 0, opacity: 1 }}
                  className="h-2/3 p-4 pb-0"
                  custom={direction}
                  exit={"exit"}
                  initial={"enter"}
                  key={currentStep}
                  variants={{
                    enter: (direction) => ({
                      x: `${direction * 100}%`,
                      opacity: 0,
                    }),
                    exit: (direction) => ({
                      x: `${direction * -100}%`,
                      opacity: 0,
                    }),
                  }}
                >
                  {content}
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-between p-4">
                <button
                  className="h-7 flex-center rounded-full bg-gray-3 px-3 text-14 shadow-border disabled:text-gray-9"
                  disabled={currentStep === 0}
                  onClick={() => {
                    if (currentStep === 0) {
                      return;
                    }
                    setDirection(-1);
                    setCurrentStep((prev) => prev - 1);
                  }}
                  type="button"
                >
                  Back
                </button>
                <button
                  className="h-7 flex-center rounded-full bg-orange px-3 text-14 text-white shadow-border"
                  disabled={currentStep === 2}
                  onClick={() => {
                    if (currentStep === 2) {
                      setCurrentStep(0);
                      setDirection(-1);
                      return;
                    }
                    setDirection(1);
                    setCurrentStep((prev) => prev + 1);
                  }}
                  type="button"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}

"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { useMeasureHeight } from "@/app/hooks/use-measure-height";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<-1 | 1>(1);
  const measureRef = useRef<HTMLDivElement>(null);
  const measuredHeight = useMeasureHeight(measureRef);
  const content = useMemo(() => {
    // biome-ignore lint/style/useDefaultSwitchClause: shh!
    switch (currentStep) {
      case 0:
        return (
          <>
            <span className="text-14">Fast delivery or pickup</span>
            <p className="mb-2 text-14 text-gray-11">
              Enjoy two-hour delivery from an Acme Store, free delivery, or easy
              pickup.
            </p>
            <div className="space-y-1">
              <div className="h-4 rounded-4 bg-gray-a3" />
              <div className="h-4 rounded-4 bg-gray-a3" />
              <div className="h-4 w-2/4 rounded-4 bg-gray-a3" />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <span className="text-14">Free and easy returns</span>
            <p className="mb-2 text-14 text-gray-11">
              Complete your return online or take it to an Acme Store.
            </p>
            <div className="space-y-1">
              <div className="h-4 rounded-4 bg-gray-a3" />
              <div className="h-4 w-3/4 rounded-4 bg-gray-a3" />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <span className="text-14">Shop with Acme Card.</span>
            <p className="text-14 text-gray-11">
              Get 3% Daily Cash back when you shop at Acme with Acme Card.
            </p>
          </>
        );
    }
  }, [currentStep]);

  return (
    <MotionConfig transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}>
      <div className="min-h-dvh flex-center">
        <div className="relative aspect-2/1 w-240 flex-center rounded-24 bg-demo-bg">
          <div className="relative w-90 overflow-clip rounded-12 bg-white shadow-modal dark:bg-gray-2">
            <motion.div
              animate={{ height: measuredHeight }}
              className="mb-3 p-3"
            >
              <div ref={measureRef}>
                <AnimatePresence
                  custom={direction}
                  initial={false}
                  mode="popLayout"
                >
                  <motion.div
                    animate={{ x: 0, opacity: 1 }}
                    custom={direction}
                    exit={"exit"}
                    initial={"initial"}
                    key={currentStep}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
                    variants={{
                      initial: (direction) => ({
                        x: `${direction * 110}%`,
                        opacity: 0,
                      }),
                      exit: (direction) => ({
                        x: `${direction * -110}%`,
                        opacity: 0,
                      }),
                    }}
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
            <div className="flex h-1/4 items-center justify-between p-3">
              <button
                className="h-6 flex-center rounded-6 bg-gray-a3 px-3 text-13 leading-16"
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
                className="h-6 flex-center rounded-6 bg-blue px-3 text-13 text-white leading-16"
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
        </div>
      </div>
    </MotionConfig>
  );
}

"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useState } from "react";
import { Spinner } from "@/app/ui/spinner/spinner";

const buttonCopy = {
  idle: "Get access",
  loading: <Spinner />,
  success: "Access granted",
};
export default function Page() {
  const [buttonState, setButtonState] = useState("idle");
  return (
    <MotionConfig transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}>
      <div className="min-h-dvh flex-center">
        <div className="relative aspect-2/1 w-240 flex-center rounded-24 bg-demo-bg">
          <motion.button
            className="relative h-7 flex-center overflow-clip bg-blue px-3 font-500 text-13 text-white leading-16 shadow-small data-loading:size-7"
            data-loading={buttonState === "loading" || undefined}
            disabled={buttonState !== "idle"}
            layout
            onClick={() => {
              setButtonState("loading");
              setTimeout(() => {
                setButtonState("success");
              }, 1200);
              setTimeout(() => {
                setButtonState("idle");
              }, 3200);
            }}
            style={{ borderRadius: 8 }}
            type="button"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                animate={{ y: 0, opacity: 1 }}
                className="block"
                exit={{ y: 20, opacity: 0 }}
                initial={{ y: -20, opacity: 0 }}
                key={buttonState}
                layout
              >
                {buttonCopy[buttonState]}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </MotionConfig>
  );
}

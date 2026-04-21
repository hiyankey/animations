"use client";

import { useDialKit } from "dialkit";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import { Spinner } from "@/app/ui/spinner/spinner";
export default function Page() {
  const [buttonState, setButtonState] = useState("idle");
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

  const buttonCopy = useMemo(() => {
    // biome-ignore lint/style/useDefaultSwitchClause: shh!
    switch (buttonState) {
      case "idle":
        return " Register Now";
      case "loading":
        return <Spinner size={24} />;
      case "success":
        return "You're in!";
    }
  }, [buttonState]);

  return (
    <MotionConfig transition={{ duration: 0.5, bounce: 0.15, type: "spring" }}>
      <div className="min-h-dvh flex-center">
        <div className="relative aspect-2/1 w-240 flex-center rounded-24 bg-demo-bg">
          <button
            className="relative h-9 w-36 flex-center overflow-clip rounded-full bg-orange px-4 text-16 text-white"
            disabled={buttonState === "loading"}
            onClick={() => {
              if (buttonState === "success") {
                return;
              }

              setButtonState("loading");

              setTimeout(() => {
                setButtonState("success");
              }, 1750);

              setTimeout(() => {
                setButtonState("idle");
              }, 3500);
            }}
            type="button"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                initial={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                key={buttonState}
              >
                {buttonCopy}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </MotionConfig>
  );
}

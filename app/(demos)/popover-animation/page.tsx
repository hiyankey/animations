"use client";

import { useDialKit } from "dialkit";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "@/app/hooks/use-click-outside";
import { Spinner } from "@/app/ui/spinner/spinner";
export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
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

  useClickOutside(wrapperRef, () => setIsOpen(false));

  const handleSubmit = useCallback(
    (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!feedback) {
        return;
      }
      setFormState("loading");

      setTimeout(() => setFormState("success"), 1600);

      setTimeout(() => setIsOpen(false), 3200);
    },
    [feedback]
  );

  return (
    <MotionConfig transition={{ duration: 0.5, bounce: 0.15, type: "spring" }}>
      <div className="min-h-dvh flex-center">
        <div className="relative aspect-2/1 w-240 flex-center rounded-24 bg-demo-bg">
          {isOpen ? (
            <motion.div
              className="h-50 w-90 overflow-clip bg-white shadow-menu dark:bg-gray-2"
              layoutId="wrapper"
              ref={wrapperRef}
              style={{ borderRadius: 12 }}
            >
              {formState === "success" ? (
                <motion.div
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  className="h-full flex-center"
                  initial={{ y: -20, opacity: 0, filter: "blur(10px)" }}
                  key={"success"}
                >
                  Thank you!
                </motion.div>
              ) : (
                <form className="relative h-full" onSubmit={handleSubmit}>
                  {!feedback && (
                    <motion.span
                      className="absolute top-4 left-4 text-gray-11"
                      layoutId="title"
                    >
                      Feedback
                    </motion.span>
                  )}
                  <textarea
                    className="h-2/3 w-full resize-none p-4 outline-none"
                    onChange={(e) => setFeedback(e.target.value)}
                    value={feedback}
                  />
                  <div className="flex justify-end p-4">
                    <button
                      className="relative h-7 w-32 flex-center overflow-clip rounded-6 bg-orange px-3 text-14 text-white"
                      type="submit"
                    >
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.span
                          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                          exit={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                          initial={{
                            y: -20,
                            opacity: 0,
                            filter: "blur(10px)",
                          }}
                          key={formState}
                        >
                          {formState === "loading" ? (
                            <Spinner />
                          ) : (
                            <span>Send feedback</span>
                          )}
                        </motion.span>
                      </AnimatePresence>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          ) : (
            <motion.button
              className="h-7 w-28 flex-center overflow-clip bg-white px-3 text-14 shadow-small dark:bg-gray-2"
              layoutId="wrapper"
              onClick={() => {
                setIsOpen(true);
                setFormState("idle");
                setFeedback("");
              }}
              style={{ borderRadius: 6 }}
              type="button"
            >
              <motion.span layoutId="title">Feedback</motion.span>
            </motion.button>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}

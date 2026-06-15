"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useRef, useState } from "react";
import { useClickOutside } from "@/app/hooks/use-click-outside";
import { Spinner } from "@/app/ui/spinner/spinner";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setOpen(false));
  return (
    <MotionConfig transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}>
      <div className="min-h-dvh flex-center">
        <div className="relative aspect-2/1 w-240 flex-center rounded-24 bg-demo-bg">
          {open ? (
            <motion.div
              className="h-50 w-90 overflow-clip bg-white shadow-modal dark:bg-gray-2"
              layoutId="wrapper"
              ref={containerRef}
              style={{ borderRadius: 12 }}
            >
              {formState === "success" ? (
                <motion.div
                  animate={{ y: 0, filter: "blur(0px)" }}
                  className="h-full flex-center text-14"
                  initial={{ y: -20, filter: "blur(10px)" }}
                >
                  Success
                </motion.div>
              ) : (
                <form
                  className="relative h-3/4 p-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!feedback) {
                      return;
                    }
                    setFormState("loading");
                    setTimeout(() => {
                      setFormState("success");
                    }, 1200);
                    setTimeout(() => {
                      setOpen(false);
                    }, 3200);
                  }}
                >
                  {!feedback && (
                    <motion.span
                      className="absolute top-3 left-3 block text-14 text-gray-11"
                      layoutId="copy"
                    >
                      Feedback
                    </motion.span>
                  )}

                  <textarea
                    autoFocus
                    className="h-full w-full resize-none text-14 outline-none"
                    onChange={(e) => setFeedback(e.target.value)}
                    value={feedback}
                  />
                  <div className="flex h-1/2 items-center">
                    <motion.button
                      className="relative ml-auto h-6 flex-center overflow-clip rounded-6 bg-blue px-2 text-13 text-white leading-16 data-loading:size-7"
                      data-loading={formState === "loading" || undefined}
                      disabled={formState !== "idle"}
                      layout
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.3,
                      }}
                      type="submit"
                    >
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          animate={{ y: 0, opacity: 1 }}
                          className="block"
                          exit={{ y: 20, opacity: 0 }}
                          initial={{ y: -20, opacity: 0 }}
                          key={formState}
                        >
                          {formState === "loading" ? (
                            <Spinner />
                          ) : (
                            <motion.span className="block" layout>
                              Send feedback
                            </motion.span>
                          )}
                        </motion.span>
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>
          ) : (
            <motion.button
              className="h-7 overflow-clip bg-white px-3 text-13 leading-16 shadow-border-small dark:bg-gray-3"
              initial={false}
              layoutId="wrapper"
              onClick={() => {
                setOpen(true);
                setFeedback("");
                setFormState("idle");
              }}
              style={{ borderRadius: 8 }}
              type="button"
            >
              <motion.span className="block" layoutId="copy">
                Feedback
              </motion.span>
            </motion.button>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}

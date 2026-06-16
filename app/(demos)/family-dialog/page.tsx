"use client";

import {
  Content,
  DialogDescription,
  DialogTitle,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import "./styles.css";

const Title = DialogTitle;
const Description = DialogDescription;
const MotionContent = motion.create(Content);

export default function Page() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("default");

  const measureRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(145);
  const previousHeight = useRef<number | null>(null);

  const content = useMemo(() => {
    // biome-ignore lint/style/useDefaultSwitchClause: shh!
    switch (view) {
      case "default":
        return (
          <>
            <span className="mb-2 block text-14">Default</span>
            <div className="flex flex-col gap-1">
              <button
                className="h-7 w-full flex-center rounded-8 bg-gray-a3 text-13 leading-16"
                onClick={() => setView("key")}
                type="button"
              >
                Key
              </button>
              <button
                className="h-7 w-full flex-center rounded-8 bg-gray-a3 text-13 leading-16"
                onClick={() => setView("phrase")}
                type="button"
              >
                Phrase
              </button>
              <button
                className="h-7 w-full flex-center rounded-8 bg-red/6 text-13 text-red leading-16"
                onClick={() => setView("remove")}
                type="button"
              >
                Remove
              </button>
            </div>
          </>
        );
      case "key":
        return (
          <>
            <span className="mb-2 block text-14">Key</span>

            <p className="mb-2 text-14 text-gray-11">
              Your Private Key is the key used to back up your wallet. Keep it
              secret and secure at all times.
            </p>

            <button
              className="h-7 flex-center rounded-8 bg-gray-a3 px-3 text-13 leading-16"
              onClick={() => setView("default")}
              type="button"
            >
              Back
            </button>
          </>
        );
      case "phrase":
        return (
          <>
            <span className="mb-2 block text-14">Phrase</span>
            <p className="mb-2 text-14 text-gray-11">
              Keep your Secret Phrase safe. Don’t share it with anyone else. If
              you lose it, we can’t recover it.
            </p>

            <button
              className="h-7 flex-center rounded-8 bg-gray-a3 px-3 text-13 leading-16"
              onClick={() => setView("default")}
              type="button"
            >
              Back
            </button>
          </>
        );
      case "remove":
        return (
          <>
            <span className="mb-2 block text-14">Remove</span>
            <p className="mb-2 text-14 text-gray-11">
              You haven’t backed up your wallet yet. If you remove it, you could
              lose access forever. We suggest tapping and backing up your wallet
              first with a valid recovery method.
            </p>

            <button
              className="h-7 flex-center rounded-8 bg-gray-a3 px-3 text-13 leading-16"
              onClick={() => setView("default")}
              type="button"
            >
              Back
            </button>
          </>
        );
    }
  }, [view]);

  // Measure content height
  useLayoutEffect(() => {
    if (view && measureRef.current) {
      setHeight(measureRef.current.offsetHeight);
    }
  }, [view]);

  const opacityDuration = useMemo(() => {
    const MIN_DURATION = 0.15;
    const MAX_DURATION = 0.3;

    if (!previousHeight.current) {
      previousHeight.current = height;
      return MIN_DURATION;
    }
    const heightDifference = Math.abs(previousHeight.current - height);
    previousHeight.current = height;
    const duration = Math.max(
      Math.min(heightDifference / 200, MAX_DURATION),
      MIN_DURATION
    );

    return duration;
  }, [height]);

  return (
    <div className="min-h-dvh flex-center">
      <div className="relative aspect-2/1 w-240 flex-center rounded-24 bg-demo-bg">
        <Root onOpenChange={setOpen} open={open}>
          <Trigger className="h-7 rounded-8 bg-white px-3 text-13 leading-16 shadow-small dark:bg-gray-3">
            Open
          </Trigger>
          <Portal>
            <MotionContent
              animate={{ height }}
              className="content translate-center fixed w-90 overflow-clip rounded-12 bg-gray-2 text-14 shadow-modal"
              initial={false}
            >
              <Title />
              <Description />
              <div className="p-3" ref={measureRef}>
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    animate="open"
                    exit={"closed"}
                    initial="closed"
                    key={view}
                    transition={{ duration: opacityDuration, ease: "easeOut" }}
                    variants={{
                      open: {
                        opacity: 1,
                      },
                      closed: {
                        opacity: 0,
                      },
                    }}
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </MotionContent>
          </Portal>
        </Root>
      </div>
    </div>
  );
}

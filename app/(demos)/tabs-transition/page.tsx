"use client";

import { useEffect, useRef, useState } from "react";

const TABS = ["Overview", "Docs", "Updates"];
export default function Page() {
  const [activeTab, setActiveTab] = useState("Product");
  const activeTabElementRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (activeTab && container) {
      const activeTabElement = activeTabElementRef.current;
      if (activeTabElement) {
        const { offsetWidth, offsetLeft } = activeTabElement;
        const clipLeft = offsetLeft;
        const clipRight = offsetLeft + offsetWidth;

        container.style.clipPath = `inset(0 ${Number(100 - (clipRight / container.offsetWidth) * 100).toFixed(0)}% 0 ${Number((clipLeft / container.offsetWidth) * 100).toFixed(0)}%  round 9999px)`;
      }
    }
  }, [activeTab]);

  return (
    <div className="min-h-dvh flex-center">
      <div className="aspect-2/1 w-240 flex-center rounded-24 bg-demo-bg">
        <div className="grid-stack relative">
          <ul className="flex gap-2">
            {Array.from(TABS, (tab) => (
              <li key={tab}>
                <button
                  className="h-7 flex-center rounded-full px-3 text-13 leading-16"
                  onClick={() => setActiveTab(tab)}
                  ref={activeTab === tab ? activeTabElementRef : null}
                  type="button"
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
          <div
            className="absolute inset-0 bg-blue transition-[clip-path] duration-300 ease-swift [clip-path:inset(0_64%_0_0_round_9999px)]"
            ref={containerRef}
          >
            <ul className="flex gap-2">
              {Array.from(TABS, (title) => (
                <li
                  className="h-7 flex-center rounded-full px-3 text-13 text-white leading-16 dark:text-black"
                  key={title}
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

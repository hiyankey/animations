"use client";

import { useDialKit } from "dialkit";
import { useTheme } from "next-themes";

export default function Home() {
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

  return <div className="min-h-dvh flex-center">Hello world</div>;
}

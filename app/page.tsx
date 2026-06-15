"use client";

import { useDialKit } from "dialkit";
import { useTheme } from "next-themes";

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const _params = useDialKit(
    "Controls",
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

  return <div className="min-h-dvh flex-center">Hello world</div>;
}

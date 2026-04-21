"use client";

import { useEffect } from "react";
import { type KeyBindingMap, type Options, tinykeys } from "../lib/tinykeys";

export function useShortcuts(keyBindingMap: KeyBindingMap, options?: Options) {
  useEffect(
    () => tinykeys(window, keyBindingMap, options),
    [keyBindingMap, options]
  );
}

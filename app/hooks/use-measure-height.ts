import { useEffect, useState } from "react";

export function useMeasureHeight(ref: React.RefObject<HTMLDivElement | null>) {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const { height: h } = el.getBoundingClientRect();
      setHeight(h);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return height;
}

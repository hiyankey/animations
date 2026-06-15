"use client";

export default function Page() {
  return (
    <div className="min-h-dvh flex-center">
      <div className="relative aspect-2/1 w-240 flex-center rounded-24 bg-demo-bg">
        <button
          className="group relative h-7 flex-center overflow-clip rounded-6 bg-gray-a3 px-3"
          type="button"
        >
          <span className="absolute inset-0 flex-center bg-[oklch(from_var(--color-red)_l_c_h/6%)] text-13 text-red leading-16 transition-[clip-path] duration-200 ease-swift [clip-path:inset(0_100%_0_0)] group-active:duration-[1.5s] group-active:ease-linear dark:bg-[oklch(from_var(--color-red)_calc(l-0.6)_c_h)] group-active:[clip-path:inset(0_0_0_0)]">
            Hold to delete
          </span>
          <span className="text-13 leading-16">Hold to delete</span>
        </button>
      </div>
    </div>
  );
}

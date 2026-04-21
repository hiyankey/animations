import styles from "./spinner.module.css";

export function Spinner({ size = 14, speed = 1 }) {
  return (
    <div
      aria-label="Loading"
      className={styles.spinner}
      data-size={size}
      role="status"
      style={{ ["--spinner-speed" as string]: speed }}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <div
          className={styles.spinnerLeaf}
          key={`spinner-leaf-${
            // biome-ignore lint/suspicious/noArrayIndexKey: shh!
            i
          }`}
        />
      ))}
    </div>
  );
}

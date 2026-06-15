import styles from "./spinner.module.css";

export function Spinner({ size = 16, speed = 1 }) {
  return (
    <div
      aria-label="Loading"
      className={styles.spinner}
      data-size={size}
      role="status"
      style={{ ["--spinner-speed" as string]: speed }}
    >
      {Array.from({ length: 8 }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: shh!
        <div className={styles["spinner-leaf"]} key={index} />
      ))}
    </div>
  );
}

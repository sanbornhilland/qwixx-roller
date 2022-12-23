import styles from "./die.module.css";

type DieProps = {
  faceColor: string;
  outlineColor: string;
  dotColor: string;
  xRand: number;
  yRand: number;
};

export function Die({
  faceColor,
  outlineColor,
  dotColor,
  xRand,
  yRand,
}: DieProps) {
  return (
    <div className={styles.container}>
      <div
        className={styles.cube}
        style={{
          ["--face-color" as any]: faceColor,
          ["--outline-color" as any]: outlineColor,
          ["--dot-color" as any]: dotColor,
          transform: "rotateX(" + xRand + "deg) rotateY(" + yRand + "deg)",
        }}
      >
        <div className={styles.front}>
          <span className={`${styles.dot} ${styles.dot1}`}></span>
        </div>
        <div className={styles.back}>
          <span className={`${styles.dot} ${styles.dot1}`}></span>
          <span className={`${styles.dot} ${styles.dot2}`}></span>
        </div>
        <div className={styles.right}>
          <span className={`${styles.dot} ${styles.dot1}`}></span>
          <span className={`${styles.dot} ${styles.dot2}`}></span>
          <span className={`${styles.dot} ${styles.dot3}`}></span>
        </div>
        <div className={styles.left}>
          <span className={`${styles.dot} ${styles.dot1}`}></span>
          <span className={`${styles.dot} ${styles.dot2}`}></span>
          <span className={`${styles.dot} ${styles.dot3}`}></span>
          <span className={`${styles.dot} ${styles.dot4}`}></span>
        </div>
        <div className={styles.top}>
          <span className={`${styles.dot} ${styles.dot1}`}></span>
          <span className={`${styles.dot} ${styles.dot2}`}></span>
          <span className={`${styles.dot} ${styles.dot3}`}></span>
          <span className={`${styles.dot} ${styles.dot4}`}></span>
          <span className={`${styles.dot} ${styles.dot5}`}></span>
        </div>
        <div className={styles.bottom}>
          <span className={`${styles.dot} ${styles.dot1}`}></span>
          <span className={`${styles.dot} ${styles.dot2}`}></span>
          <span className={`${styles.dot} ${styles.dot3}`}></span>
          <span className={`${styles.dot} ${styles.dot4}`}></span>
          <span className={`${styles.dot} ${styles.dot5}`}></span>
          <span className={`${styles.dot} ${styles.dot6}`}></span>
        </div>
      </div>
    </div>
  );
}

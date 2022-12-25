import styles from "./avatar.module.css";

export type AvatarProps = {
  name: string;
  isRolling: boolean;
  color: string;
};

export function Avatar({ name, isRolling, color }: AvatarProps) {
  return (
    <div className={styles.avatarWrapper} title={name}>
      <div
        className={styles.avatar}
        style={{
          ["--background-color" as any]: color,
        }}
        data-is-rolling={isRolling}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}

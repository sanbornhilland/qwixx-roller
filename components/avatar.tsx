import styles from "./avatar.module.css";

export type AvatarProps = {
  name: string;
  isRolling: boolean;
};

export function Avatar({ name, isRolling }: AvatarProps) {
  return (
    <div className={styles.avatarWrapper} title={name}>
      <div className={styles.avatar} data-is-rolling={isRolling}>
        {name.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}

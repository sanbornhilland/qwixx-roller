import styles from "./invite.module.css";
import globalStyles from "../styles/global.module.css";
import { MouseEventHandler, useState } from "react";

type InviteProps = {
  onClose: MouseEventHandler<HTMLButtonElement>;
};

export function Invite({ onClose }: InviteProps) {
  const [name, setName] = useState("");

  const url = new URL(window.location.href);
  url.searchParams.set("name", name);

  return (
    <div className={styles.cover}>
      <div className={`${styles.modal} ${globalStyles.vFlex}`}>
        <button onClick={onClose}>close</button>
        <div>
          <h2>Invite Friend</h2>
          <p>
            Invite a friend to join the room by entering their name and sending
            them the link.
          </p>
        </div>
        <label>
          Name
          <input
            value={name}
            onInput={(event) => {
              setName(event.currentTarget.value);
            }}
          />
        </label>
        <input value={url.href}></input>
      </div>
    </div>
  );
}

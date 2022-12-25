import { MouseEventHandler, useRef, useState } from "react";
import { FiCopy, FiCheck, FiX } from "react-icons/fi";
import styles from "./invite.module.css";
import globalStyles from "../styles/global.module.css";

type InviteProps = {
  onClose: MouseEventHandler<HTMLButtonElement>;
};

export function Invite({ onClose }: InviteProps) {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);

  const url = new URL(window.location.href);
  url.searchParams.set("name", name);

  return (
    <div className={styles.cover}>
      <div className={`${styles.modal} ${globalStyles.vFlex}`}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FiX />
        </button>
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
              setName(event.currentTarget.value.trim());
            }}
          />
        </label>
        <div
          className={globalStyles.hFlex}
          style={{
            ["--padding" as any]: 0,
          }}
        >
          <input
            ref={input}
            value={url.href}
            style={{
              flexGrow: 1,
            }}
          ></input>
          <button
            type="button"
            disabled={name === ""}
            onClick={(event) => {
              event.preventDefault();

              if (input.current) {
                input.current.select();
                document.execCommand("copy");

                setCopied(true);

                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
          >
            {copied ? <FiCheck></FiCheck> : <FiCopy></FiCopy>}
          </button>
        </div>
      </div>
    </div>
  );
}

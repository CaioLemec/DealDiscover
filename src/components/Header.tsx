import styles from "./Header.module.css";
import { Handshake } from "@phosphor-icons/react";

export function Header() {
  return (
    <header className={styles.header}>
      <span>
        <Handshake className={styles.handShakeIcon} size={40} />
        <strong>Deal</strong> Discover
      </span>
    </header>
  );
}

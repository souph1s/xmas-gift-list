import styles from "./Header.module.css";
import { Gift } from "@phosphor-icons/react";

export function Header() {
  return (
    <header className={styles.header}>
      <Gift size={32} color="#ededed" className={styles.gift} />
      <strong className={styles.strong}>Gift</strong>
      <strong className={styles.strongPurple}>List</strong>
    </header>
  );
}

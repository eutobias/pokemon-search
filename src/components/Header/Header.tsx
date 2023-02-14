import React from "react";

import logo from "../../assets/pokemon.svg";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.wrapper}>
      <h1>
        <img src={logo} className={styles.logo} alt="Pokemon Logo" />
      </h1>
    </header>
  );
};

export { Header };

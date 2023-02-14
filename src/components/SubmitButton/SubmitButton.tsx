import React from "react";

import styles from "./SubmitButton.module.css";

type SubmitButtonProps = {
  label?: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
  return <button className={styles.button}>{label}</button>;
};

SubmitButton.defaultProps = {
  label: "Enviar",
};

export { SubmitButton };

import React from "react";

import styles from "./Modal.module.css";

type ModalProps = {
  show: boolean;

  onClose: () => void;
};

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  show,
  onClose,
  children,
}) => {
  if (!show) return <></>;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.wrapper}>
        <div className={styles["content-wrapper"]}>
          <div className={styles["close-wrapper"]}>
            <a href="#" className={styles["close-button"]} onClick={onClose}>
              Fechar
            </a>
          </div>
          <div className={styles["content"]}>{children}</div>
        </div>
      </div>
    </>
  );
};

export { Modal };

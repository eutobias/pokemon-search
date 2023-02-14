import React from "react";

import styles from "./TextInput.module.css";

type TextInputProps = {
  name: string;
  value: string;
  defaultValue?: string;
  placeholder?: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: React.FC<TextInputProps> = ({
  name,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

TextInput.defaultProps = {
  placeholder: "",
};

export { TextInput };

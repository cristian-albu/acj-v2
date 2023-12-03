"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { TTextInput } from "./types";
import styles from "./inputs.module.scss";
import InputError from "./utils/InputError";

const TextInput: React.FC<TTextInput> = ({ type, errorCallbacks, onChange, children, ...elementProps }) => {
    const [value, setValue] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
        // Handle onChange prop from parent component
        onChange && onChange(event);
    };

    return (
        <label className={styles.textInputLabel}>
            <span className={styles.textInputDesc}>{children}</span>
            <input className={styles.textInput} type={type || "text"} onChange={handleChange} {...elementProps} />
            {errorCallbacks && <InputError value={value} errors={errorCallbacks} />}
        </label>
    );
};

export default TextInput;

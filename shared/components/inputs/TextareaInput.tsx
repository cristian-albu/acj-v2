import React, { ChangeEvent, useState } from "react";
import { TTextareaInput } from "./types";
import styles from "./inputs.module.scss";
import InputError from "./utils/InputError";

const TextareaInput: React.FC<TTextareaInput> = ({ errorCallbacks, onChange, children, ...elementProps }) => {
    const [value, setValue] = useState("");
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.currentTarget.value);
        // Handle onChange prop from parent component
        onChange && onChange(event);
    };
    return (
        <label className={styles.textInputLabel}>
            <span className={styles.textInputDesc}>{children}</span>
            <textarea className={`${styles.textInput} ${styles.textarea}`} onChange={handleChange} {...elementProps} />
            {errorCallbacks && <InputError value={value} errors={errorCallbacks} />}
        </label>
    );
};

export default TextareaInput;

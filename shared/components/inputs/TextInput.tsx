"use client";
import React, { InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import { TInputEvents, TTextInput, TTextareaInput } from "./types";
import styles from "./inputs.module.scss";
import InputError from "./utils/InputError";

const TextInput: React.FC<TTextInput | TTextareaInput> = (props) => {
    const {
        type,
        errorCallbacks,
        onChange: changeCallback,
        onFocus: focusCallback,
        onBlur: blurCallback,
        children,
        ...elementProps
    } = props;
    const [value, setValue] = useState("");

    const eventHandles: TInputEvents = {
        onChange: (event) => {
            setValue(event.currentTarget.value);
            changeCallback && changeCallback(event);
        },
        onFocus: (event) => {
            focusCallback && focusCallback(event);
        },
        onBlur: (event) => {
            blurCallback && blurCallback(event);
        },
    };

    return (
        <label className={styles.textInputLabel}>
            <span className={styles.textInputDesc}>{children}</span>
            {type === "textarea" ? (
                <textarea
                    className={`${styles.textInput} ${styles.textarea}`}
                    {...eventHandles}
                    {...(elementProps as TextareaHTMLAttributes<HTMLTextAreaElement>)} // reson to hate typescript no. 1
                />
            ) : (
                <input
                    className={styles.textInput}
                    type={type || "text"}
                    {...eventHandles}
                    {...(elementProps as InputHTMLAttributes<HTMLInputElement>)} // reson to hate typescript no. 2
                />
            )}

            {errorCallbacks && <InputError value={value} errors={errorCallbacks} />}
        </label>
    );
};

export default TextInput;

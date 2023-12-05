"use client";
import React, { InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import { TErrorState, TInputEvents, TTextInput, TTextareaInput } from "./types";
import styles from "./inputs.module.scss";
import InputError from "./utils/InputError";

const TextInput: React.FC<TTextInput | TTextareaInput> = ({
    type,
    errorCallbacks,
    onChange: changeCallback,
    onFocus: focusCallback,
    onBlur: blurCallback,
    children,
    ...elementProps
}) => {
    const [value, setValue] = useState("");
    const [errorState, setShowErr] = useState<TErrorState>({
        focusedOnce: false,
        isFocused: false,
        shouldShowErr: false,
        shouldHighlightErr: false,
    });

    const eventHandlers: TInputEvents = {
        onChange: (event) => {
            setValue(event.currentTarget.value);
            changeCallback && changeCallback(event);
        },
        onFocus: (event) => {
            if (errorState.focusedOnce) {
                setShowErr({ ...errorState, shouldShowErr: true, shouldHighlightErr: true, isFocused: true });
            } else {
                setShowErr({ ...errorState, focusedOnce: true, isFocused: true });
            }

            focusCallback && focusCallback(event);
        },
        onBlur: (event) => {
            if (errorState.focusedOnce) {
                setShowErr({ ...errorState, shouldShowErr: false, shouldHighlightErr: true, isFocused: false });
            }
            blurCallback && blurCallback(event);
        },
    };

    const inputErrorEventsHandlers = {
        onMouseEnter: () => {
            setShowErr({ ...errorState, shouldShowErr: true });
        },
        onMouseLeave: () => {
            if (!errorState.isFocused) {
                setShowErr({ ...errorState, shouldShowErr: false });
            }
        },
    };

    return (
        <label className={styles.textInputLabel}>
            <span className={styles.textInputDesc}>{children}</span>
            {type === "textarea" ? (
                <textarea
                    className={`${styles.textInput} ${styles.textarea}`}
                    {...eventHandlers}
                    {...(elementProps as TextareaHTMLAttributes<HTMLTextAreaElement>)} // reson to hate typescript no. 1
                />
            ) : (
                <input
                    className={styles.textInput}
                    type={type || "text"}
                    {...eventHandlers}
                    {...(elementProps as InputHTMLAttributes<HTMLInputElement>)} // reson to hate typescript no. 2
                />
            )}

            {errorCallbacks && (
                <InputError value={value} errors={errorCallbacks} errorState={errorState} {...inputErrorEventsHandlers} />
            )}
        </label>
    );
};

export default TextInput;

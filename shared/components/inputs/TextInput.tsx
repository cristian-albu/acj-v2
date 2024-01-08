"use client";
import React, { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes, useEffect, useState } from "react";
import { TInputError, TTextInput, TTextareaInput } from "./types";
import styles from "./inputs.module.scss";
import {
    TvalidationReturn,
    validateEmail,
    validateMinMaxLength,
    validateSlug,
} from "@/shared/lib/input-validation/inputValidation";
import InputError from "./utils/InputError";
import useInputFocusAndErrorState from "./utils/useFocusAndErrorState";
import debounce from "@/shared/lib/dbounce";

const TextInput: React.FC<TTextInput | TTextareaInput> = ({
    id,
    type,
    errorCallbacks,
    onFocus: focusCallback,
    onBlur: blurCallback,
    onChange: changeCallback,
    children,
    ...elementProps
}) => {
    const { errorState, eventHandlers, inputErrorEventsHandlers } = useInputFocusAndErrorState(
        (focusCallback = focusCallback),
        (blurCallback = blurCallback)
    );

    const [errorListObject, setErrorListObject] = useState<{ [key: string]: TvalidationReturn }>({});

    const [value, setValue] = useState(elementProps.defaultValue?.toString() || "");

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event?.target.value);
        changeCallback && changeCallback(event);
    };

    const validateTextValue = () => {
        if (errorCallbacks) {
            errorCallbacks.map((error: TInputError) => {
                switch (error.validation) {
                    case "email":
                        const resultEmail = validateEmail(value, error.args);
                        setErrorListObject((prevState) => ({
                            ...prevState,
                            email: resultEmail.isValid ? { isValid: true, error: "" } : resultEmail,
                        }));
                        break;
                    case "minmax":
                        const resultMinMax = validateMinMaxLength(value, ...error.args);
                        setErrorListObject((prevState) => ({
                            ...prevState,
                            minmax: resultMinMax.isValid ? { isValid: true, error: "" } : resultMinMax,
                        }));
                        break;
                    case "slug":
                        const resultSlug = validateSlug(value, error.args);
                        setErrorListObject((prevState) => ({
                            ...prevState,
                            slug: resultSlug.isValid ? { isValid: true, error: "" } : resultSlug,
                        }));
                        break;
                }
            });
        }
    };

    const debouncedValidate = debounce(validateTextValue, 300);

    useEffect(() => {
        // Trigger the debounced validation function when the value changes
        debouncedValidate();

        // Cleanup the debounced function on component unmount
        return () => {
            debouncedValidate.cancel();
        };
    }, [value]);

    const errorList = Object.values(errorListObject).filter((e) => !e.isValid);

    return (
        <label className={styles.textInputLabel}>
            <span className={styles.textInputDesc}>{children}</span>
            {type === "textarea" ? (
                <textarea
                    id={id}
                    className={`${styles.textInput} ${styles.textarea}`}
                    onChange={onChange}
                    {...eventHandlers}
                    {...(elementProps as TextareaHTMLAttributes<HTMLTextAreaElement>)} // reson to hate typescript no. 1
                />
            ) : (
                <input
                    id={id}
                    className={styles.textInput}
                    type={type || "text"}
                    onChange={onChange}
                    {...eventHandlers}
                    {...(elementProps as InputHTMLAttributes<HTMLInputElement>)} // reson to hate typescript no. 2
                />
            )}
            {errorCallbacks && <InputError errorList={errorList} errorState={errorState} {...inputErrorEventsHandlers} />}
        </label>
    );
};

export default TextInput;

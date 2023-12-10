"use client";
import React from "react";
import styles from "../inputs.module.scss";
import { TInputErrorProps } from "../types";
import { TvalidationReturn } from "@/shared/lib/input-validation/inputValidation";

const InputError: React.FC<TInputErrorProps> = ({ errorList, errorState, ...rest }) => {
    return (
        <div className={styles.textInputErrors}>
            {errorList.length > 0 && errorState.shouldHighlightErr && (
                <div className={styles.inputErrorFlag} {...rest}>
                    <p>🚩</p> <p>{errorList.length}</p>
                </div>
            )}
            <div
                className={errorState.shouldShowErr ? `${styles.inputErrorList} ${styles.showItems}` : styles.inputErrorList}
            >
                {errorState.shouldShowErr &&
                    errorList.map((err: TvalidationReturn, index: number) => (
                        <p key={err.error}>
                            {index + 1}. {err.error}
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default InputError;

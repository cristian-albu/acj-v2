"use client";
import React from "react";
import { TInputErrorProps } from "../types";
import {
    TvalidationReturn,
    validateFile,
    validateFileSize,
    validateFileType,
} from "@/shared/lib/input-validation/inputValidation";
import checkInputErrors from "./checkInputErrors";
import styles from "../inputs.module.scss";

const InputError: React.FC<TInputErrorProps> = ({ errType, value, errors, errorState, ...rest }) => {
    let errorList: TvalidationReturn[] = [];

    if (errType === "text") {
        errorList = checkInputErrors({ value, errors });
    } else {
        errorList = [];

        // const results = Object.entries(value).map(([key, val]) => {
        //     switch (key) {
        //         case "file":
        //             return validateFile(val as string, errors.);
        //         case "fileSize":
        //             return validateFileSize(val, ...error.args);
        //         case "fileType":
        //             return validateFileType(val, ...error.args);
        //     }
        // });
    }

    return (
        <div className={styles.textInputErrors}>
            {errorList.length && errorState.shouldHighlightErr && (
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

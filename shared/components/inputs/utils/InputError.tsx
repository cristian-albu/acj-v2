"use client";
import React from "react";
import { TInputError, TInputErrorProps } from "../types";
import { TvalidationReturn, validateEmail, validateMinMaxLength } from "@/shared/lib/input-validation/inputValidation";

const InputError: React.FC<TInputErrorProps> = ({ value, errors }) => {
    const errorList = errors.map((error: TInputError) => {
        switch (error.val) {
            case "email":
                return validateEmail(value, error.args);
            case "minmax":
                return validateMinMaxLength(value, ...error.args);
            case "slug":
                return validateEmail(value, error.args);
        }
    });

    return (
        <div>
            {errorList.map((err: TvalidationReturn) => (
                <div>{err.error}</div>
            ))}
        </div>
    );
};

export default InputError;

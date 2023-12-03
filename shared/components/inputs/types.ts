import { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export type TSwitch = TChildren & InputHTMLAttributes<HTMLInputElement>;

type TGenericInput = {
    errorCallbacks?: TInputError[];
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => any;
};

export type TTextInput = {
    type?: "text" | "number";
} & TChildren &
    TGenericInput &
    InputHTMLAttributes<HTMLInputElement>;

export type TTextareaInput = TGenericInput & TChildren & TextareaHTMLAttributes<HTMLTextAreaElement>;

// Validation error types

export type TInputErrorBasic = {
    val: "email" | "slug";
    args?: string;
};

export type TInputErrorMinMax = {
    val: "minmax";
    args: [number, number, string?, string?];
};

export type TInputError = TInputErrorBasic | TInputErrorMinMax;

export type TInputErrorProps = {
    value: string;
    errors: TInputError[];
};

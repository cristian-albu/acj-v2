import { ChangeEvent, FocusEvent, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export type TSwitch = TChildren & InputHTMLAttributes<HTMLInputElement>;

export type TEventItem = HTMLInputElement | HTMLTextAreaElement;
export type TInputEvents = {
    onChange?: (event: ChangeEvent<TEventItem>) => any;
    onBlur?: (event: FocusEvent<TEventItem>) => any;
    onFocus?: (event: FocusEvent<TEventItem>) => any;
};

type TGenericInput = {
    /**
 * @example
    type TInputErrorBasic = {
        val: "email" | "slug";
        args?: string;
    };

    type TInputErrorMinMax = {
        val: "minmax";
        args: [number, number, string?, string?];
    };
 */
    errorCallbacks?: TInputError[];
} & TInputEvents &
    TChildren;

export type TTextInput = {
    type?: "text" | "number";
} & InputHTMLAttributes<HTMLInputElement> &
    TGenericInput;

export type TTextareaInput = { type: "textarea" } & TextareaHTMLAttributes<HTMLTextAreaElement> & TGenericInput;

// Validation error types

export type TInputErrorBasic = {
    validation: "email" | "slug";
    args?: string;
};

export type TInputErrorMinMax = {
    validation: "minmax";
    args: [number, number, string?, string?];
};

export type TInputError = TInputErrorBasic | TInputErrorMinMax;

export type TInputErrorProps = {
    value: string;
    errors: TInputError[];
};

import { ChangeEvent, FocusEvent, HTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

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
};

export type TFileInput = {} & TGenericInput;

export type TTextInput = {
    type?: "text" | "number";
} & InputHTMLAttributes<HTMLInputElement> &
    TGenericInput &
    TChildren &
    TInputEvents;

export type TTextareaInput = { type: "textarea" } & TextareaHTMLAttributes<HTMLTextAreaElement> &
    TGenericInput &
    TChildren &
    TInputEvents;

// Validation error types

export type TInputErrorBasic = {
    validation: "email" | "slug";
    args?: string;
};

export type TInputErrorMinMax = {
    validation: "minmax";
    args: [number, number, string?, string?];
};

export type TInpuErrorFiel = {
    validation: "file";
    args?: string;
};

export type TInputError = TInputErrorBasic | TInputErrorMinMax | TInpuErrorFiel;

export type TErrorState = {
    focusedOnce: boolean;
    isFocused: boolean;
    shouldShowErr: boolean;
    shouldHighlightErr: boolean;
};

export type TErrorProps = {
    value: string;
    errors: TInputError[];
};

export type TInputErrorProps = {
    errorState: TErrorState;
} & TErrorProps &
    HTMLAttributes<HTMLDivElement>;

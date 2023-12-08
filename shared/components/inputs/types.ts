import React, { ChangeEvent, FocusEvent, HTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export type TSwitch = { id?: string } & TChildren & InputHTMLAttributes<HTMLInputElement>;

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
    id?: string;
    errorCallbacks?: TInputError[];
};

export type TFileInput = { id?: string; children?: React.ReactNode } & TGenericInput;

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

export type TInputErrorFile = {
    validation: "file";
    args?: string;
};

export type TInputErrorFileSize = {
    validation: "fileSize";
    args: [number, string?];
};

export type TInputErrorFileType = {
    validation: "fileType";
    args: [string[], string?];
};

export type TInputError = TInputErrorBasic | TInputErrorMinMax | TInputErrorFile | TInputErrorFileSize | TInputErrorFileType;

export type TErrorState = {
    focusedOnce?: boolean;
    isFocused?: boolean;
    shouldShowErr: boolean;
    shouldHighlightErr: boolean;
};

export type TFileError = "clientErr" | "serverErr";

export type TErrorProps = {
    value: string | number;
    errors: TInputError[];
    errType: "text";
};

export type TErrorFileProps = {
    value: { [key: string]: string | number | TFileError };
    errType: "file";
    errors: TInputError[];
};

export type TInputErrorProps = {
    errorState: TErrorState;
} & (TErrorProps | TErrorFileProps) &
    HTMLAttributes<HTMLDivElement>;

// Form

export type TDynamicFormInputText = {
    type: "text" | "textarea" | "number";
} & (TTextInput | TTextareaInput);

export type TDynamicFormInputSwitch = {
    type: "switch";
} & TSwitch;

export type TDynamicFormInputFile = {
    type: "file";
} & TFileInput;

export type TDynamicFormInput = {
    id: string;
} & (TDynamicFormInputText | TDynamicFormInputFile | TDynamicFormInputSwitch);

export type TDynamicFormProps = {
    inputList: TDynamicFormInput[];
    formButton: {
        text: string;
        action: (data: any) => void;
        placement?: "left" | "center" | "right";
    };
};

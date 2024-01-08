import { TvalidationReturn } from "@/shared/lib/input-validation/inputValidation";
import React, {
    ChangeEvent,
    Dispatch,
    HTMLAttributes,
    InputHTMLAttributes,
    SetStateAction,
    TextareaHTMLAttributes,
} from "react";

export type TSwitch = { id?: string } & TChildren & InputHTMLAttributes<HTMLInputElement>;

export type TEventItem = HTMLInputElement | HTMLTextAreaElement;

export type TInputEvent = (event: ChangeEvent<TEventItem>) => any;

export type TInputEvents = {
    onChange?: TInputEvent;
    onBlur?: TInputEvent;
    onFocus?: TInputEvent;
};

export type TErrorEventHandlers = {
    onMouseEnter?: TInputEvent;
    onMouseLeave?: TInputEvent;
};

export type TInputFocusAndErrorStateReturn = {
    errorState: TErrorState;
    setShowErr: Dispatch<SetStateAction<TErrorState>>;
    focusedState: TFocusedState;
    setFocusedState: Dispatch<SetStateAction<TFocusedState>>;
    eventHandlers: TInputEvents;
    inputErrorEventsHandlers: TErrorEventHandlers;
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

export type TFileInput = {
    uploadToServerData: { endpoint: string };
    id?: string;
    children?: React.ReactNode;
} & TGenericInput;

export type TTextInput = {
    type?: "text" | "number" | "password";
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
    shouldShowErr: boolean;
    shouldHighlightErr: boolean;
};

export type TFocusedState = {
    focusedOnce: boolean;
    isFocused: boolean;
};

export type TInputErrorProps = { errorList: TvalidationReturn[]; errorState: TErrorState };

export type TSelectOption = {
    value: string;
    text: string;
};

export type TSelectProps = {
    options: TSelectOption[];
} & React.HTMLAttributes<HTMLDivElement>;
// Form

export type TDynamicFormInputText = {
    type: "text" | "textarea" | "number" | "password";
} & (TTextInput | TTextareaInput);

export type TDynamicFormInputSwitch = {
    type: "switch";
} & TSwitch;

export type TDynamicFormInputFile = {
    type: "file";
} & TFileInput;

export type TDynamicFormInputSelect = {
    type: "select";
} & TSelectProps;

export type TDynamicFormInput = {
    id: string;
} & (TDynamicFormInputText | TDynamicFormInputFile | TDynamicFormInputSwitch | TDynamicFormInputSelect);

/**
 * @example 
 * inputList: [
        {
            type: "text",
            children: "Email Input",
            id: "id1",
            errorCallbacks: [{ validation: "email" }],
            defaultValue: "Default text",
        },
        { type: "text", children: "Slug input", id: "id2", errorCallbacks: [{ validation: "slug" }] },
        { type: "text", children: "Text input", id: "id3", errorCallbacks: [{ validation: "minmax", args: [1, 64] }] },
        { type: "number", children: "Text input", id: "id4", errorCallbacks: [{ validation: "minmax", args: [1, 2] }] },
        { type: "textarea", children: "Textarea", id: "id5", errorCallbacks: [{ validation: "minmax", args: [1, 128] }] },
        {
            uploadToServerData: { endpoint: "/api/file" },
            type: "file",
            children: "File upload",
            id: "id6",
            errorCallbacks: [
                { validation: "file" },
                { validation: "fileSize", args: [5000] },
                { validationType: "fileType", args: [["png", "jpg"]] },
            ],
        },
        {
            type: "file",
            children: "File upload 2",
            uploadToServerData: { endpoint: "/api/file" },
            id: "id7",
            errorCallbacks: [{ validation: "file" }],
        },
        { type: "switch", children: "Switch input", id: "id8" },
    ],
    formButton: {
        text: "🖥️ Submit",
        action: (data) => console.log(data),
        placement: "right",
    },
};
 */
export type TDynamicFormProps = {
    inputList: TDynamicFormInput[];
    formButton: {
        text: string;
        action: (data: any) => void;
        placement?: "left" | "center" | "right";
    };
} & HTMLAttributes<HTMLFormElement>;

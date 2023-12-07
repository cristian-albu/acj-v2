import React, { MouseEvent } from "react";
import Button from "../layout/Button";
import { TDynamicFormInput, TDynamicFormProps } from "./types";

const buildInitialState = (inputList: TDynamicFormInput[]) => {
    const inputData = inputList.reduce((acc: Record<string, string | number | boolean>, curr: TDynamicFormInput) => {
        let { id, type } = curr;

        let value: string | number | boolean = "";

        switch (type) {
            case "text":
                value = "";
                break;
            case "textarea":
                value = "";
                break;
            case "number":
                value = 0;
                break;
            case "switch":
                value = false;
                break;
            case "file":
                value = "";
                break;
        }

        acc[id] = value;

        return acc;
    }, {});

    return inputData;
};

const Form: React.FC<TDynamicFormProps> = ({ inputList, formButton }) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <div>
            <Button onClick={handleClick}>{formButton.text}</Button>
        </div>
    );
};

export default Form;

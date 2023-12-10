import React, { MouseEvent, useRef } from "react";
import Button from "../layout/Button";
import { TDynamicFormProps } from "./types";
import TextInput from "./TextInput";
import Switch from "./Switch";
import FileInput from "./FileInput";
import getFormData from "./utils/getFormData";
import styles from "./inputs.module.scss";

/**
 * Generate a form from the inputList props. The formButton action will get all the form data in a {id: value} format.
 */
const Form: React.FC<TDynamicFormProps> = ({ inputList, formButton }) => {
    const formRef = useRef<null | HTMLFormElement>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!formRef.current) {
            return {};
        }
        const inputData = getFormData(formRef.current);

        formButton.action(inputData);
    };

    return (
        <form ref={formRef}>
            {inputList.map((input) => {
                if (input.type === "text" || input.type === "number" || input.type === "password") {
                    const { type, id, errorCallbacks, children, ...rest } = input;
                    return (
                        <TextInput type={type} id={id} key={id} errorCallbacks={errorCallbacks} {...rest}>
                            {children}
                        </TextInput>
                    );
                } else if (input.type === "textarea") {
                    const { type, id, errorCallbacks, children, ...rest } = input;
                    return (
                        <TextInput type={type} id={id} key={id} errorCallbacks={errorCallbacks} {...rest}>
                            {children}
                        </TextInput>
                    );
                } else if (input.type === "switch") {
                    const { type, id, children, ...rest } = input;
                    return (
                        <Switch id={id} key={id} {...rest}>
                            {children}
                        </Switch>
                    );
                } else if (input.type === "file") {
                    const { uploadToServerData, id, children, errorCallbacks } = input;
                    return (
                        <FileInput uploadToServerData={uploadToServerData} id={id} key={id} errorCallbacks={errorCallbacks}>
                            {children}
                        </FileInput>
                    );
                }
            })}
            <div className={`${styles.formBtnContainer} ${formButton.placement ? styles[formButton.placement] : ""}`}>
                <Button onClick={handleClick}>{formButton.text}</Button>
            </div>
        </form>
    );
};

export default Form;

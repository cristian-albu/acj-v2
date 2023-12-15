"use client";
import React, { Ref, RefObject, forwardRef } from "react";
import styles from "./layout.module.scss";
import { TButton } from "./types";

/**
 * Button component
 * @param {string} btnStyle - button style
 * @param {string} theme - button theme
 * @param {string} btnType - button type
 * @param {string} children - button children
 * @example
 *
 * <Button btnStyle="outline" theme="dark" btnType="primary">Click me</Button>
 */
const Button = forwardRef<HTMLButtonElement, TButton>((props, ref) => {
    const { btnStyle, theme, btnType, children, ...elementsProps } = props;

    const btnStyleList = [styles.button];
    btnType && btnStyleList.push(styles[btnType]);
    theme && btnStyleList.push(styles[theme]);
    btnStyle && btnStyleList.push(styles[btnStyle]);
    const buttonClassName = btnStyleList.join(" ");

    return (
        <button className={buttonClassName} ref={ref} {...elementsProps}>
            {children}
        </button>
    );
});

export default Button;

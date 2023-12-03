import React from "react";
import styles from "./layout.module.scss";
import { TButton } from "./types";

const Button: React.FC<TButton> = ({ type, theme, children, ...elementsProps }) => {
    return (
        <button className={`${styles.button} ${type && styles[type]} ${theme && styles[theme]}`} {...elementsProps}>
            {children}
        </button>
    );
};

export default Button;

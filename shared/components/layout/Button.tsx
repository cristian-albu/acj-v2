import React from "react";
import styles from "./layout.module.scss";
import { TButton } from "./types";

const Button: React.FC<TButton> = ({ type, theme, children, ...elementsProps }) => {
    const btnStyleList = [styles.button];
    type && btnStyleList.push(styles[type]);
    theme && btnStyleList.push(styles[theme]);
    const btnStyle = btnStyleList.join(" ");

    return (
        <button className={btnStyle} {...elementsProps}>
            {children}
        </button>
    );
};

export default Button;

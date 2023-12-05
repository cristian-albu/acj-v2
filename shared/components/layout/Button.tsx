import React from "react";
import styles from "./layout.module.scss";
import { TButton } from "./types";

const Button: React.FC<TButton> = ({ btnType, btnStyle, theme, children, ...elementsProps }) => {
    const btnStyleList = [styles.button];
    btnType && btnStyleList.push(styles[btnType]);
    theme && btnStyleList.push(styles[theme]);
    btnStyle && btnStyleList.push(styles[btnStyle]);
    const buttonClassName = btnStyleList.join(" ");

    return (
        <button className={buttonClassName} {...elementsProps}>
            {children}
        </button>
    );
};

export default Button;

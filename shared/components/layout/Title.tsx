import React from "react";
import styles from "./layout.module.scss";

export type TTitle = {
    children: string;
    size?: "big" | "medium" | "small";
    type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

/**
 * @param children string
 * @param size "big" | "medium" | "small"
 * @param type "h1" - "h6"
 * @returns
 */
const Title: React.FC<TTitle> = ({ children, size, type }) => {
    const sizeCls = size ? `${styles.title} ${styles[size]}` : styles.title;

    switch (type) {
        case "h1":
            return <h1 className={sizeCls}>{children}</h1>;
        case "h2":
            return <h2 className={sizeCls}>{children}</h2>;
        case "h3":
            return <h3 className={sizeCls}>{children}</h3>;
        case "h4":
            return <h4 className={sizeCls}>{children}</h4>;
        case "h5":
            return <h5 className={sizeCls}>{children}</h5>;
        case "h6":
            return <h6 className={sizeCls}>{children}</h6>;
        default:
            return <p className={sizeCls}>{children}</p>;
    }
};

export default Title;

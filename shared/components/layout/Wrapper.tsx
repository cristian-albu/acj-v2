import React from "react";
import { TWrapper } from "./types";
import styles from "./layout.module.scss";

const Wrapper: React.FC<TWrapper> = ({ width, children, ...elementProps }) => {
    return (
        <div className={`${styles.wrapper} ${width && styles[width]}`} {...elementProps}>
            {children}
        </div>
    );
};

export default Wrapper;

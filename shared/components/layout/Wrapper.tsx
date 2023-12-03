import React from "react";
import { TWrapper } from "./types";
import styles from "./layout.module.scss";

const Wrapper: React.FC<TWrapper> = ({ children, ...elementProps }) => {
    return (
        <div className={styles.wrapper} {...elementProps}>
            {children}
        </div>
    );
};

export default Wrapper;

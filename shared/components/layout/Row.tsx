import React from "react";
import { TRow } from "./types";
import styles from "./layout.module.scss";

const Row: React.FC<TRow> = ({ children, ...elementProps }) => {
    return (
        <div className={styles.row} {...elementProps}>
            {children}
        </div>
    );
};

export default Row;

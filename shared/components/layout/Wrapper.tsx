import React from "react";
import { TWrapper } from "./types";
import styles from "./layout.module.scss";

const Wrapper: React.FC<TWrapper> = ({ width, children, ...elementProps }) => {
    const wrapperStyleList = [styles.wrapper];
    width && wrapperStyleList.push(styles[width]);
    const wrapperStyle = wrapperStyleList.join(" ");

    return (
        <div className={wrapperStyle} {...elementProps}>
            {children}
        </div>
    );
};

export default Wrapper;

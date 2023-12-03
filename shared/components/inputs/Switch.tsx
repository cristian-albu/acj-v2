import React from "react";
import styles from "./inputs.module.scss";
import { TSwitch } from "./types";

/**
 * Switch element
 * You can pass any input element prop to the component and it will be passed down to the input element
 */
const Switch: React.FC<TSwitch> = ({ children, ...elementProps }) => {
    return (
        <label className={styles.switchLabel}>
            <input type="checkbox" className={styles.checkbox} {...elementProps} />
            <div className={styles.switch} />
            <span className={styles.switchDesc}>{children}</span>
        </label>
    );
};

export default Switch;

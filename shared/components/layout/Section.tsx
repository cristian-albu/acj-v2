import React from "react";
import styles from "./layout.module.scss";
import { TSection } from "./types";

const Section: React.FC<TSection> = ({ isFullScreen, children, ...elementProps }) => {
    return (
        <section className={`${styles.section} ${isFullScreen && styles["fullscreen"]}`} {...elementProps}>
            {children}
        </section>
    );
};

export default Section;

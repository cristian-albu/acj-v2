import React from "react";
import styles from "./layout.module.scss";
import { TSection } from "./types";

const Section: React.FC<TSection> = ({ isFullScreen, children, ...elementProps }) => {
    const sectionStyleList = [styles.section];
    isFullScreen && sectionStyleList.push(styles["fullscreen"]);
    const sectionStyle = sectionStyleList.join(" ");

    return (
        <section className={sectionStyle} {...elementProps}>
            {children}
        </section>
    );
};

export default Section;

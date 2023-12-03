import React from "react";
import { TCard } from "./types";
import styles from "./layout.module.scss";

const Card: React.FC<TCard> = ({ isHoverable, width, tightPadding, children, ...elementProps }) => {
    return (
        <div
            className={`${styles.card} ${isHoverable && styles["hoverable"]} ${width && styles[width]} ${
                tightPadding && styles["tight"]
            }`}
            {...elementProps}
        >
            {children}
        </div>
    );
};

export default Card;

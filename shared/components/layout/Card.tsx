import React from "react";
import { TCard } from "./types";
import styles from "./layout.module.scss";

const Card: React.FC<TCard> = ({ isHoverable, width, tightPadding, children, ...elementProps }) => {
    const cardStyleList = [styles.card];

    isHoverable && cardStyleList.push(styles["hoverable"]);
    width && cardStyleList.push(styles[width]);
    tightPadding && cardStyleList.push(styles["tight"]);

    const cardStyle = cardStyleList.join(" ");
    return (
        <div className={cardStyle} {...elementProps}>
            {children}
        </div>
    );
};

export default Card;

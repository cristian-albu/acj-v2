"use client";
import React, { useEffect, useRef } from "react";
import styles from "./list.module.scss";
import { TListItemInternalProps } from "./types";

const ListItem: React.FC<TListItemInternalProps> = ({ id, index, focusIndex, children }) => {
    const ref = useRef<null | HTMLLIElement>(null);

    useEffect(() => {
        if (ref.current && focusIndex === index) {
            ref.current.focus();
        }
    }, [focusIndex]);

    return (
        <li id={id} className={styles.listItem} tabIndex={-1} role="option" ref={ref}>
            {children}
        </li>
    );
};

export default ListItem;

"use client";
import React, { useEffect, useRef } from "react";
import styles from "./list.module.scss";
import { TListItemInternalProps } from "./types";

const ListItem: React.FC<TListItemInternalProps> = ({ id, index, focusIndex, setFocusIndex, onClick, children }) => {
    const ref = useRef<null | HTMLLIElement>(null);

    useEffect(() => {
        if (ref.current && focusIndex === index) {
            ref.current.focus();
        }
    }, [focusIndex]);

    const setCurrFocusIndex = () => {
        setFocusIndex(index);
    };

    return (
        <li
            id={id}
            className={styles.listItem}
            tabIndex={index === focusIndex ? 0 : -1}
            role="option"
            ref={ref}
            onFocus={setCurrFocusIndex}
            onMouseEnter={setCurrFocusIndex}
            onClick={onClick}
        >
            {children}
        </li>
    );
};

export default ListItem;

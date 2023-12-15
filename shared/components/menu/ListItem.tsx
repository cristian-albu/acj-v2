"use client";
import React, { KeyboardEvent, useEffect, useRef } from "react";
import styles from "./menu.module.scss";
import { TListItemInternalProps } from "./types";

/**
 * ListItem component
 * @param {string} id - list item id
 * @param {number} index - list item index
 * @param {number} focusIndex - list item focus index
 * @param {function} setFocusIndex - set focus index
 * @param {function} onClick - on click function
 * @param {string} children - list item children
 * @example
 *
 * <ListItem id="list-item" index={0} focusIndex={0} setFocusIndex={setFocusIndex} onClick={onClick}>
 */
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

    const handleClick = () => {
        onClick && onClick();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            handleClick();
        }
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
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {children}
        </li>
    );
};

export default ListItem;

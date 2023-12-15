"use client";
import React, { KeyboardEvent } from "react";
import styles from "./menu.module.scss";
import { TListItemProps, TListProps } from "./types";
import ListItem from "./ListItem";
import useListNavigator from "./utils/useListNavigator";

/**
 * This List component is meant for interactive elements. For non-interactive elements, use a normal ul or ol
 * @param {string} id string
 * @param {TListItemProps[]} listItems - list items
 * @example
 *
 * <List id="list" listItems={listItems} />
 */
const List: React.FC<TListProps> = ({ id, listItems }) => {
    const { focusIndex, nextItem, prevItem, lastItem, firstItem, setFocusIndex } = useListNavigator(listItems);

    const handleKeydown = (event: KeyboardEvent<HTMLUListElement>) => {
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                nextItem();
                break;
            case "ArrowUp":
                event.preventDefault();
                prevItem();
                break;
            case "Home":
                event.preventDefault();
                firstItem();
                break;
            case "End":
                event.preventDefault();
                lastItem();
                break;
        }
    };

    return (
        <ul id={id} className={styles.list} tabIndex={0} role="listbox" onKeyDown={handleKeydown}>
            {listItems.map((listItem: TListItemProps, index: number) => (
                <ListItem
                    key={listItem.id}
                    index={index}
                    focusIndex={focusIndex}
                    setFocusIndex={setFocusIndex}
                    {...listItem}
                />
            ))}
        </ul>
    );
};

export default List;

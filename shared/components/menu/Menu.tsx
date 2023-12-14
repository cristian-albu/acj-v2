"use client";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from "./menu.module.scss";
import { createPortal } from "react-dom";
import { getFocusableElements } from "../../lib/getFocusableElements";
import { TListItemProps, TListProps } from "../list/types";
import List from "../list/List";

export type TMenuProps = {
    menuPosition?: "right" | "right-bottom" | "right-bottom-inner" | "left-bottom-inner";
    menuContents: TListProps;
} & TChildren;

const Menu: React.FC<TMenuProps> = ({ menuPosition = "right", menuContents, children }) => {
    const targetRef = useRef<null | HTMLButtonElement>(null);
    const menuRef = useRef<null | HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    let computedStyles: { [key: string]: string | number } | null = null;

    if (targetRef.current && menuRef.current) {
        const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = targetRef.current;
        const { offsetWidth: menuWith } = menuRef.current;

        if (menuPosition === "right") {
            computedStyles = { left: offsetLeft + offsetWidth, top: offsetTop };
        } else if (menuPosition === "right-bottom-inner") {
            computedStyles = { left: offsetLeft + offsetWidth - menuWith, top: offsetTop + offsetHeight };
        }
    }

    const listItems = menuContents.listItems.map((listItem: TListItemProps) => ({
        id: listItem.id,
        children: listItem.children,
        onClick: () => {
            listItem.onClick && listItem.onClick();
            setIsOpen(false);
        },
    }));

    const handleOutSideMenuClick = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            if ((event.target as Node) != targetRef.current) {
                setIsOpen(false);
            }
        }
    };

    const handleMenuOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const handleMenuKeydown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            setIsOpen(false);
            targetRef.current && targetRef.current.focus();
        }

        if (event.key === "Tab" && menuRef.current) {
            event.preventDefault();

            const { firstElement: ulelement } = getFocusableElements(menuRef.current);

            if (ulelement) {
                const { firstElement, nextElement, prevElement, lastElement, currElement } = getFocusableElements(ulelement);

                if (currElement === lastElement) {
                    firstElement?.focus();
                } else {
                    nextElement?.focus();
                }

                if (event.shiftKey) {
                    if (currElement === firstElement) {
                        lastElement?.focus();
                    } else {
                        prevElement?.focus();
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (targetRef.current && menuRef.current) {
            if (isOpen) {
                document.addEventListener("mousedown", handleOutSideMenuClick);
                const { firstElement } = getFocusableElements(menuRef.current);

                if (firstElement && firstElement.role === "listbox") {
                    const { firstElement: firstListItem } = getFocusableElements(firstElement);
                    firstListItem ? firstListItem.focus() : menuRef.current.focus();
                } else if (firstElement) {
                    firstElement.focus();
                } else {
                    menuRef.current.focus();
                }
            } else {
                targetRef.current.focus();
            }
        }

        return () => {
            document.removeEventListener("mousedown", handleOutSideMenuClick);
        };
    }, [isOpen]);

    return (
        <>
            <button className={styles.menuAnchor} ref={targetRef} onClick={handleMenuOpen}>
                {children}
            </button>
            {isOpen &&
                createPortal(
                    <div
                        ref={menuRef}
                        style={{ position: "absolute", zIndex: 99, ...computedStyles }}
                        className={styles.menuContainer}
                        onKeyDown={handleMenuKeydown}
                        tabIndex={0}
                    >
                        <List listItems={listItems} id={menuContents.id} />
                    </div>,
                    document.body
                )}
        </>
    );
};

export default Menu;

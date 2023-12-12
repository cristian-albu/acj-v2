"use client";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from "./menu.module.scss";
import { createPortal } from "react-dom";
import { getNextFocusableElement } from "./utils/getNextFocusableElement";

export type TMenuProps = {
    menuPosition?: "right" | "right-bottom" | "right-bottom-inner";
    openOnHover?: boolean;
    menuContents: any;
} & TChildren;

const Menu: React.FC<TMenuProps> = ({ menuPosition = "right", openOnHover, menuContents, children }) => {
    const targetRef = useRef<null | HTMLButtonElement>(null);
    const menuRef = useRef<null | HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [computedStyles, setComputedStyles] = useState<{ [key: string]: string | number }>({ left: 0, top: 0 });

    useEffect(() => {
        if (targetRef.current && menuRef.current) {
            const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = targetRef.current;
            const { offsetWidth: menuWith } = menuRef.current;

            if (menuPosition === "right") {
                setComputedStyles({ left: offsetLeft + offsetWidth, top: offsetTop });
            } else if (menuPosition === "right-bottom-inner") {
                setComputedStyles({ left: offsetLeft + offsetWidth - menuWith, top: offsetTop + offsetHeight });
            }

            if (isOpen) {
                const firstFocusableMenuElement = getNextFocusableElement(menuRef.current);

                if (firstFocusableMenuElement && firstFocusableMenuElement.role === "listbox") {
                    const firstListItem = getNextFocusableElement(firstFocusableMenuElement);
                    firstListItem ? firstListItem.focus() : menuRef.current.focus();
                } else if (firstFocusableMenuElement) {
                    firstFocusableMenuElement.focus();
                } else {
                    menuRef.current.focus();
                }
            } else {
                targetRef.current.focus();
            }
        }
    }, [isOpen]);

    const handleMenuOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const handleAnchorKeydown = (event: KeyboardEvent<HTMLButtonElement>) => {};

    const handleMenuKeydown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            setIsOpen(false);
            targetRef.current && targetRef.current.focus();
        }

        if (event.key === "Tab") {
            console.log("tab");
        }
    };

    return (
        <>
            <button
                className={styles.menuAnchor}
                ref={targetRef}
                onClick={handleMenuOpen}
                onKeyDown={handleAnchorKeydown}
                onFocus={() => console.log("anchor focused")}
            >
                {children}
            </button>
            {isOpen &&
                createPortal(
                    <div
                        ref={menuRef}
                        style={{ position: "absolute", zIndex: 99, ...computedStyles }}
                        className={styles.menuContainer}
                        onKeyDown={handleMenuKeydown}
                        onFocus={() => console.log("menu focused")}
                        tabIndex={0}
                    >
                        {menuContents}
                    </div>,
                    document.body
                )}
        </>
    );
};

export default Menu;

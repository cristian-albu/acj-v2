"use client";
import React, { KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import styles from "./menu.module.scss";
import { createPortal } from "react-dom";
import { getFocusableElements } from "../../lib/getFocusableElements";
import { TListItemProps, TMenuProps } from "./types";
import List from "./List";
import Button from "../layout/Button";

/**
 * @param menuPosition - menu position
 * @param menuContents - menu contents
 * @param children - target anchor children that will open the menu. These will be placed inside a button element
 * @example
 * <Menu menuPosition="right" menuContents={menuContents}>
 */
const Menu: React.FC<TMenuProps> = ({
    menuPosition = "right-bottom-inner",
    targetProps,
    menuContents,
    setMenuChoice,
    children,
}) => {
    const targetRef = useRef<null | HTMLButtonElement>(null);
    const menuRef = useRef<null | HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [documentLoaded, setDocumentLoaded] = useState(false);
    const [computedStyles, setComputedStyles] = useState({});
    const menuId = useId();
    const targetId = useId();

    const listItems = menuContents.listItems.map((listItem: TListItemProps, index: number) => ({
        id: listItem.id,
        children: listItem.children,
        onClick: () => {
            listItem.onClick && listItem.onClick();
            setIsOpen(false);
            setMenuChoice && setMenuChoice(index);
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

    // This is a hack to get the menu to render in the correct position
    // The menu needs to be rendered in the DOM before we can get its width
    // We can't get the width of the menu before it is rendered in the DOM
    // We can't render the menu in the DOM before we get its width
    // So we render the menu in the DOM, get its width, and then render it in the correct position
    useEffect(() => {
        const computeMenuStyle = () => {
            const borderRadiusR = "3px 10px 10px 10px";
            const borderRadiusL = "10px 3px 10px 10px";
            if (targetRef.current && menuRef.current) {
                const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = targetRef.current;
                const { offsetWidth: menuWidth } = menuRef.current;

                if (menuPosition === "right") {
                    setComputedStyles({
                        left: offsetLeft + offsetWidth,
                        top: offsetTop,
                        borderRadius: borderRadiusR,
                    });
                } else if (menuPosition === "left") {
                    setComputedStyles({ left: offsetLeft - menuWidth, top: offsetTop, borderRadius: borderRadiusL });
                } else if (menuPosition === "right-bottom") {
                    setComputedStyles({
                        left: offsetLeft + offsetWidth,
                        top: offsetTop + offsetHeight,
                        borderRadius: borderRadiusR,
                    });
                } else if (menuPosition === "left-bottom") {
                    setComputedStyles({
                        left: offsetLeft - menuWidth,
                        top: offsetTop + offsetHeight,
                        borderRadius: borderRadiusL,
                    });
                } else if (menuPosition === "right-bottom-inner") {
                    setComputedStyles({
                        left: offsetLeft + offsetWidth - menuWidth,
                        top: offsetTop + offsetHeight,
                        borderRadius: "10px 3px 10px 10px",
                    });
                } else if (menuPosition === "left-bottom-inner") {
                    setComputedStyles({
                        left: offsetLeft,
                        top: offsetTop + offsetHeight,
                        borderRadius: borderRadiusR,
                    });
                }
            }
        };

        const handleResize = () => {
            computeMenuStyle();
        };

        if (!documentLoaded) {
            setDocumentLoaded(true);
        }

        computeMenuStyle();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [documentLoaded]);

    useEffect(() => {
        if (targetRef.current && menuRef.current) {
            if (isOpen) {
                document.addEventListener("mousedown", handleOutSideMenuClick);
                const { firstElement } = getFocusableElements(menuRef.current);

                if (firstElement) {
                    const { firstElement: firstListItem } = getFocusableElements(firstElement);
                    firstListItem ? firstListItem.focus() : menuRef.current.focus();
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
            <Button
                id={targetId}
                ref={targetRef}
                onClick={handleMenuOpen}
                aria-haspopup={true}
                aria-controls={menuId}
                aria-expanded={isOpen}
                {...targetProps}
            >
                {children}
            </Button>
            {documentLoaded &&
                createPortal(
                    <div
                        ref={menuRef}
                        id={menuId}
                        role="menu"
                        aria-labelledby={targetId}
                        style={{ position: "absolute", zIndex: 99, scale: isOpen ? "1" : "0", ...computedStyles }}
                        className={styles.menuContainer}
                        onKeyDown={handleMenuKeydown}
                        tabIndex={isOpen ? 0 : -1}
                    >
                        {<List listItems={listItems} id={menuContents.id} />}
                    </div>,
                    document.body
                )}
        </>
    );
};

export default Menu;

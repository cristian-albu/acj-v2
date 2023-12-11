"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./menu.module.scss";
import { createPortal } from "react-dom";

export type TMenuProps = {
    menuPosition: "right" | "right-bottom" | "right-bottom-inner";
} & TChildren;

const Menu: React.FC<TMenuProps> = ({ menuPosition, children }) => {
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
                menuRef.current && menuRef.current.focus();
            } else {
                targetRef.current && targetRef.current.focus();
            }
        }
    }, [isOpen]);

    const handleMenuOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <button
                className={styles.menuAnchor}
                ref={targetRef}
                onClick={handleMenuOpen}
                onKeyDown={() => console.log("anchor keys")}
                onFocus={() => console.log("anchor focused")}
            >
                {children}
            </button>
            {isOpen &&
                createPortal(
                    <div
                        ref={menuRef}
                        style={{ position: "absolute", ...computedStyles }}
                        className={styles.menuContainer}
                        onKeyDown={() => console.log("menu keys")}
                        onFocus={() => console.log("menu focused")}
                        tabIndex={0}
                    >
                        <button>Some button inside</button>
                    </div>,
                    document.body
                )}
        </>
    );
};

export default Menu;

"use client";
import React, { MouseEvent, useId, useRef, useState } from "react";
import styles from "./inputs.module.scss";
import { getFocusableElements } from "@/shared/lib/getFocusableElements";
import { TSelectProps } from "./types";

const Select: React.FC<TSelectProps> = ({ options, id, onKeyDown, children, ...rest }) => {
    const selectRef = useRef<HTMLDivElement | null>(null);
    const optionsRef = useRef<HTMLUListElement | null>(null);
    const selectId = useId();

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState({ text: "Select an option", value: "" });

    const handleOpen = (event: MouseEvent) => {
        event.preventDefault();
        setIsOpen((prev) => !prev);

        if (isOpen) {
            selectRef.current && getFocusableElements(selectRef.current).firstElement?.focus();
        } else {
            optionsRef.current && getFocusableElements(optionsRef.current).firstElement?.focus();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown && onKeyDown(event);
        if (event.key === "Escape") {
            event.preventDefault();
            setIsOpen(false);
        }
    };

    const handleSelection = (event: React.ChangeEvent<HTMLUListElement>) => {
        if (event.target instanceof HTMLInputElement) {
            const val = event.target.value;

            const selected = options.find((item) => item.value === val);
            selected && setSelected(selected);
        }

        setIsOpen(false);
    };

    return (
        <div className={styles.select} ref={selectRef} onKeyDown={handleKeyDown} {...rest}>
            <span>{children}</span>
            <button
                className={styles.selectBtn}
                onClick={handleOpen}
                role="combobox"
                aria-labelledby="select button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={selectId}
            >
                {selected.text} <div />
            </button>

            <ul
                role="listbox"
                id={selectId}
                className={styles.selectOptions}
                ref={optionsRef}
                onChange={handleSelection}
                style={{
                    position: "absolute",
                    scale: isOpen ? 1 : 0,
                    opacity: isOpen ? 1 : 0,
                    top: "100%",
                }}
            >
                {options.map((item) => (
                    <li key={item.text} role="option" className={styles.option}>
                        <label>
                            <input type="radio" name={id} id={`${id}-select-${item.text}`} value={item.value} />
                            <span>{item.text}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Select;

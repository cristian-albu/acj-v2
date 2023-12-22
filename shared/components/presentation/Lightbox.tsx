"use client";
import React, { CSSProperties, use, useEffect, useId, useRef, useState } from "react";
import styles from "./presentation.module.scss";
import { TPresentationComponent, TPresentationImages } from "./types";
import PresentationItem from "./PresentationItem";
import { createPortal } from "react-dom";
import Button from "../layout/Button";
import { getFocusableElements } from "@/shared/lib/getFocusableElements";

const basePresItemStyle: CSSProperties = { scale: 1, opacity: 1 };
const activePresItemStyle: CSSProperties = { scale: 1.5, zIndex: 50, opacity: 0 };

const Lightbox: React.FC<TPresentationImages> = ({ type, presentationItems }) => {
    const lightboxIdPrefix = useId();
    const modalIdPrefix = useId();
    const lightboxRef = useRef<HTMLDivElement | null>(null);
    const lightboxContainerRef = useRef<HTMLDivElement | null>(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const [currIndex, setCurrIndex] = useState(0);

    const handleItemClick = (index: number) => {
        setCurrIndex(index);
        setIsLightboxOpen((prev) => !prev);
    };

    const handleModalClose = () => {
        setIsLightboxOpen(false);

        const { elements } = getFocusableElements(lightboxContainerRef.current as HTMLDivElement);
        const target = elements.findIndex((element) => element.id === `${lightboxIdPrefix}-presentation-item-${currIndex}`);
        elements[target].focus();
    };

    const handlePrevious = () => {
        if (currIndex === 0) {
            setCurrIndex(presentationItems.length - 1);
        } else {
            setCurrIndex(currIndex - 1);
        }
    };

    const handleNext = () => {
        if (currIndex === presentationItems.length - 1) {
            setCurrIndex(0);
        } else {
            setCurrIndex(currIndex + 1);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (isLightboxOpen) {
            if (e.key === "Escape") {
                e.preventDefault();
                handleModalClose();
            }

            if (e.key === "ArrowLeft") {
                e.preventDefault();
                handlePrevious();
            }

            if (e.key === "ArrowRight") {
                e.preventDefault();
                handleNext();
            }

            if (e.key === "Tab") {
                e.preventDefault();
            }
        }
    };

    const handleLightboxContainerKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        console.log(e.key);
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleItemClick(currIndex);
        }

        if (e.key === "ArrowLeft") {
            e.preventDefault();
            handlePrevious();
        }

        if (e.key === "ArrowRight") {
            e.preventDefault();
            handleNext();
        }
    };

    return (
        <div className={styles.lightboxWrapper} ref={lightboxRef} onKeyDown={onKeyDown}>
            <div
                className={styles.lightboxContainer}
                role="listbox"
                tabIndex={0}
                ref={lightboxContainerRef}
                onKeyDown={handleLightboxContainerKeydown}
            >
                {presentationItems.map((item, index) => (
                    <PresentationItem
                        idPrefix={lightboxIdPrefix}
                        key={index.toString()}
                        item={item.item}
                        type={type}
                        index={index}
                        draggable={false}
                        className={styles.presItem}
                        tabIndex={0}
                        onClick={() => handleItemClick(index)}
                        style={index === currIndex && isLightboxOpen ? activePresItemStyle : basePresItemStyle}
                        onFocus={() => setCurrIndex(index)}
                    />
                ))}
            </div>

            {isLightboxOpen &&
                createPortal(
                    <div className={styles.lightboxModal} tabIndex={0} role="listbox">
                        <div className={styles.lightboxBackground} onClick={handleModalClose} />

                        <div className={styles.modalContainer}>
                            <Button onClick={handlePrevious}>{"<"}</Button>
                            <PresentationItem
                                idPrefix={modalIdPrefix}
                                key={currIndex.toString()}
                                item={presentationItems[currIndex].item}
                                type={type}
                                index={currIndex}
                                draggable={false}
                                tabIndex={0}
                                className={styles.presItem}
                            />
                            <Button onClick={handleNext}>{">"}</Button>
                        </div>
                        <Button onClick={handleModalClose} id={styles.closeBtn}>
                            X
                        </Button>
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default Lightbox;

"use client";
import React, { CSSProperties, useId, useRef, useState } from "react";
import styles from "./presentation.module.scss";
import { TPresentationImages } from "./types";
import PresentationItem from "./PresentationItem";
import { createPortal } from "react-dom";
import Button from "../layout/Button";
import { getFocusableElements } from "@/shared/lib/getFocusableElements";
import useSlider from "./useSlider";

const basePresItemStyle: CSSProperties = { scale: 1, opacity: 1 };
const activePresItemStyle: CSSProperties = { scale: 1.5, zIndex: 50, opacity: 0 };

const Lightbox: React.FC<TPresentationImages> = (props) => {
    const { type, presentationItems } = props;

    const lightboxIdPrefix = useId();

    const lightboxRef = useRef<HTMLDivElement | null>(null);
    const lightboxContainerRef = useRef<HTMLDivElement | null>(null);

    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const [lightBoxIndex, setLightoxIndex] = useState(0);
    const { currIndex, setCurrIndex, handlePrevious, handleNext, slides } = useSlider(props);

    const handleItemClick = (index: number) => {
        setLightoxIndex(index);
        setCurrIndex(index);
        setIsLightboxOpen((prev) => !prev);
    };

    const handleModalClose = () => {
        setIsLightboxOpen(false);
        setLightoxIndex(currIndex);
        const { elements } = getFocusableElements(lightboxContainerRef.current as HTMLDivElement);
        const target = elements.findIndex((element) => element.id === `${lightboxIdPrefix}-presentation-item-${currIndex}`);
        elements[target].focus();
    };

    const handleLightboxContainerKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleItemClick(currIndex);
        }

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

    return (
        <div className={styles.lightboxWrapper} ref={lightboxRef} onKeyDown={handleLightboxContainerKeydown}>
            <div className={styles.lightboxContainer} role="listbox" tabIndex={0} ref={lightboxContainerRef}>
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
                        style={index === lightBoxIndex && isLightboxOpen ? activePresItemStyle : basePresItemStyle}
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
                            {slides}
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

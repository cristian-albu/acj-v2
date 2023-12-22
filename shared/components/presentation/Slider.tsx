"use client";
import React, { useRef, useState } from "react";
import styles from "./presentation.module.scss";
import { TImage, TPresentationComponent, TPresentationProps } from "./types";
import Button from "../layout/Button";
import PresentationItem from "./PresentationItem";
import isCurrPrevOrNextIndex from "./utils/isCurrPrevOrNextIndex";
import PresentationOverlay from "./utils/PresentationOverlay";

/**
 * Slider
 * - A slider component that can be used to display images or components
 * - It has a menu that can be used to navigate to a specific slide
 * - It has a previous and next button
 * - It can be navigated with the keyboard
 * @param {TPresentationProps} props
 * @returns {React.FC<TPresentationProps>}
 * @example
 * <Slider presentationItems={sliderData.presentationItems} type={sliderData.type} />
 */
const Slider: React.FC<TPresentationProps> = ({ type, presentationItems }) => {
    const dragStartVal = useRef<number>(0);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const sliderContentRef = useRef<HTMLDivElement | null>(null);
    const sliderMenuRef = useRef<HTMLDivElement | null>(null);

    const [currIndex, setCurrIndex] = useState(1);

    const handleSelectSlideFromMenu = (index: number) => {
        setCurrIndex(index);
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

    /**
     * - onTouchStart and onTouchEnd are for mobile
     * - onDragStart and onDragEnd are for desktop
     */
    const eventHandlers = {
        onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => {
            const touch = e.touches[0];
            dragStartVal.current = touch.clientX;
        },
        onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => {
            const touch = e.changedTouches[0];
            const touchEndVal = touch.clientX;
            if (touchEndVal - dragStartVal.current > 0) {
                handlePrevious();
            } else if (touchEndVal - dragStartVal.current < 0) {
                handleNext();
            }
        },
        onDragStart: (e: React.DragEvent<HTMLDivElement>) => {
            const newEmptyImg = new window.Image(); // so it does not show the dragged item with half opacity
            newEmptyImg.src = "";
            e.dataTransfer.setDragImage(newEmptyImg, 0, 0);

            dragStartVal.current = e.clientX;
        },
        onDragEnd: (e: React.DragEvent<HTMLDivElement>) => {
            const dragEndVal = e.clientX;
            if (dragEndVal - dragStartVal.current > 0) {
                handlePrevious();
            } else if (dragEndVal - dragStartVal.current < 0) {
                handleNext();
            }
        },
    };

    /**
     * - ArrowLeft: previous slide
     * - ArrowRight: next slide
     * - ArrowDown: focus slider menu
     */
    const handleWrapperKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            handlePrevious();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            handleNext();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            sliderMenuRef.current?.focus();
        }
    };

    const handleSliderMenuKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            sliderContentRef.current?.focus();
        }
    };

    return (
        <div
            className={styles.sliderWrapper}
            onKeyDown={handleWrapperKeydown}
            ref={sliderRef}
            role="region"
            aria-label="Slider"
            tabIndex={0}
        >
            <div className={styles.btnContainer}>
                <Button onClick={handlePrevious} aria-label="Previous slide">
                    {"<"}
                </Button>
                <Button onClick={handleNext} aria-label="Next slide">
                    {">"}
                </Button>
            </div>

            <div className={styles.sliderContainer} ref={sliderContentRef} role="listbox" tabIndex={0}>
                {presentationItems.map((item, index) => (
                    <PresentationItem
                        key={index.toString()}
                        item={
                            type === "images" ? (item as TPresentationComponent).item : (item as TPresentationComponent).item
                        }
                        type={type}
                        index={index}
                        eventHandlers={eventHandlers}
                        className={`${styles.presItem} ${index === currIndex ? styles.active : ""}`}
                        onFocus={() => setCurrIndex(index)}
                        style={{
                            translate: `${-100 * currIndex}%`,
                            scale: index === currIndex ? 1.1 : 0.8,
                            opacity: isCurrPrevOrNextIndex(index, currIndex, presentationItems.length) ? 1 : 0,
                        }}
                    />
                ))}
            </div>

            <PresentationOverlay />

            <div
                className={styles.sliderMenu}
                ref={sliderMenuRef}
                tabIndex={0}
                role="listbox"
                onKeyDown={handleSliderMenuKeydown}
            >
                {presentationItems.map((item, index) => (
                    <Button
                        key={index.toString()}
                        role="option"
                        onClick={() => handleSelectSlideFromMenu(index)}
                        btnStyle={index === currIndex ? undefined : "outline"}
                        aria-label={`slider button that navigates to the slide number ${index + 1}. ${
                            type === "images" ? (item.item as TImage).alt || "" : ""
                        }`}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Slider;

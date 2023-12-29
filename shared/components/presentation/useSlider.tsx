"use client";
import React, { useState } from "react";
import { TPresentationComponent, TPresentationProps } from "./types";
import PresentationItem from "./PresentationItem";
import styles from "./presentation.module.scss";

/**
 * useSlider
 * - A hook that can be used to create a slider
 * - It returns the current index, the slides, and the event handlers for the previous and next buttons
 * @param {TPresentationProps} props
 * @example
 * const { currIndex, setCurrIndex, slides, handlePrevious, handleNext } = useSlider(props);
 */
const useSlider = ({ type, presentationItems }: TPresentationProps) => {
    const [currIndex, setCurrIndex] = useState(0);

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

    const slides = (
        <div className={styles.useSliderContainer} role="listbox" tabIndex={0} aria-label="Slider">
            {presentationItems.map((item, index) => (
                <PresentationItem
                    key={index.toString()}
                    item={type === "images" ? (item as TPresentationComponent).item : (item as TPresentationComponent).item}
                    type={type}
                    index={index}
                    className={styles.presItem}
                    style={{
                        translate: `${-100 * currIndex}%`,
                        opacity: currIndex === index ? 1 : 0,
                    }}
                />
            ))}
        </div>
    );

    return { currIndex, setCurrIndex, slides, handlePrevious, handleNext };
};

export default useSlider;

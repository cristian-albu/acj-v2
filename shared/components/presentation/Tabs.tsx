"use client";
import React from "react";
import { TImage, TPresentationProps } from "./types";
import styles from "./presentation.module.scss";
import Button from "../layout/Button";
import PresentationOverlay from "./utils/PresentationOverlay";
import useSlider from "./useSlider";

/**
 *  Tabs
 * - A slider component that can be used to display images or components
 * @param props
 * @example
 * <Tabs presentationItems={sliderData.presentationItems} type={sliderData.type} />
 */
const Tabs: React.FC<TPresentationProps> = (props) => {
    const { type, presentationItems } = props;

    const { currIndex, setCurrIndex, slides } = useSlider(props);

    return (
        <div
            className={`${styles.tabs} ${type === "images" ? styles.tabImages : ""}`}
            role="region"
            aria-label="Tabs"
            tabIndex={0}
        >
            <div className={styles.tabMenu}>
                {presentationItems.map((item, index) => (
                    <Button
                        key={index.toString()}
                        role="option"
                        btnStyle={index === currIndex ? undefined : "outline"}
                        onClick={() => setCurrIndex(index)}
                        aria-label={`slider button that navigates to the tab number ${index + 1}. ${
                            type === "images" ? (item.item as TImage).alt || "" : ""
                        }`}
                    >
                        {item.itemHeader || index + 1}
                    </Button>
                ))}
            </div>
            <div className={styles.tabContainer}>
                {slides}
                <PresentationOverlay />
            </div>
        </div>
    );
};

export default Tabs;

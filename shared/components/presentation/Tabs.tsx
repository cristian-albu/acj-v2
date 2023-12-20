"use client";
import React, { useRef, useState } from "react";
import { TImage, TPresentationComponent, TPresentationProps } from "./types";
import PresentationItem from "./PresentationItem";
import styles from "./presentation.module.scss";
import Button from "../layout/Button";
import PresentationOverlay from "./utils/PresentationOverlay";

const Tabs: React.FC<TPresentationProps> = ({ type, presentationItems }) => {
    const [currIndex, setCurrIndex] = useState(0);
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
                        onClick={() => setCurrIndex(index)}
                        aria-label={`slider button that navigates to the tab number ${index + 1}. ${
                            type === "images" ? (item.item as TImage).alt || "" : ""
                        }`}
                    >
                        {item.itemHeader || index + 1}
                    </Button>
                ))}
            </div>
            <div className={styles.tabContainer} role="listbox" tabIndex={0} aria-label="Tabs menu">
                {presentationItems.map((item, index) => (
                    <PresentationItem
                        key={index.toString()}
                        item={
                            type === "images" ? (item as TPresentationComponent).item : (item as TPresentationComponent).item
                        }
                        type={type}
                        index={index}
                        className={styles.presItem}
                        style={{
                            translate: `${-100 * currIndex}%`,
                            opacity: currIndex === index ? 1 : 0,
                        }}
                    />
                ))}
                <PresentationOverlay />
            </div>
        </div>
    );
};

export default Tabs;

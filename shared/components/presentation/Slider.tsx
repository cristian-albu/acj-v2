"use client";
import React, { useRef, useState } from "react";
import styles from "./presentation.module.scss";
import { TImage, TPresentationItem, TSliderComponent, TSliderProps } from "./types";
import Image from "next/image";
import Button from "../layout/Button";

const Slider: React.FC<TSliderProps> = ({ type, sliderItems }) => {
    const dragStartVal = useRef<number>(0);

    const [currIndex, setCurrIndex] = useState(1);

    const handleSetIndex = (index: number) => {
        setCurrIndex(index);
    };

    const handlePrevious = () => {
        if (currIndex === 0) {
            setCurrIndex(sliderItems.length - 1);
        } else {
            setCurrIndex(currIndex - 1);
        }
    };

    const handleNext = () => {
        if (currIndex === sliderItems.length - 1) {
            setCurrIndex(0);
        } else {
            setCurrIndex(currIndex + 1);
        }
    };

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

    const handleWrapperKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            handlePrevious();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            handleNext();
        }
    };

    return (
        <div className={styles.sliderWrapper} onKeyDown={handleWrapperKeydown}>
            <div className={styles.btnContainer}>
                <Button onClick={handlePrevious}>{"<"}</Button>
                <Button onClick={handleNext}>{">"}</Button>
            </div>

            <div className={styles.sliderContainer}>
                {sliderItems.map((item, index) => (
                    <PresentationItem
                        key={index.toString()}
                        item={type === "images" ? (item as TSliderComponent).item : (item as TSliderComponent).item}
                        type={type}
                        eventHandlers={eventHandlers}
                        className={styles.presItem}
                        style={{
                            translate: `${-100 * currIndex}%`,
                            scale: index === currIndex ? 1.1 : 0.8,
                        }}
                    />
                ))}
            </div>
            <div className={styles.sliderMenu}>
                {sliderItems.map((_item, index) => (
                    <Button key={index.toString()} onClick={() => handleSetIndex(index)}>
                        {index}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Slider;

export const PresentationItem: React.FC<TPresentationItem> = ({ item, type, className, style, eventHandlers }) => {
    return (
        <div className={className} draggable={true} style={style} {...eventHandlers}>
            {type === "components" ? (
                (item as React.ReactNode)
            ) : (
                <div className={styles.imgContainer}>
                    <Image
                        src={(item as TImage).src}
                        width={600}
                        height={600}
                        alt={(item as TImage).alt || "slider image"}
                        className={styles.img}
                    />
                </div>
            )}
        </div>
    );
};

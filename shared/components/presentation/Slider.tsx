"use client";
import React, { CSSProperties, DragEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from "./presentation.module.scss";
import { TLightBoxProps } from "./types";
import Image from "next/image";
import Button from "../layout/Button";

const sliderWidthToken = 600;
const initialWrapperLeftValue = -sliderWidthToken / 2;

const Slider: React.FC<TLightBoxProps> = ({ data }) => {
    const initialData = data.length > 4 ? [...data] : [...data, ...data, ...data, ...data];
    const containerRef = useRef<null | HTMLDivElement>(null);

    const [sliderStyle, setSliderStyle] = useState<CSSProperties>({ opacity: 0 });
    const [wrapperLeftValue, setWrapperLeftValue] = useState<number>(initialWrapperLeftValue);

    const [sliderData, setSliderData] = useState(initialData);

    const handleLeftArrow = () => {
        setWrapperLeftValue((prevValue) => prevValue + sliderWidthToken * 1.25);
        setSliderData((prevData) => [prevData[prevData.length - 1], ...prevData.slice(0, prevData.length - 1)]);
    };

    const handleRightArrow = () => {
        setWrapperLeftValue((prevValue) => prevValue - sliderWidthToken * 1.25);
        setSliderData((prevData) => [...prevData.slice(1), prevData[0]]);
    };

    const onSliderKeydown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
            handleLeftArrow();
        }
        if (event.key === "ArrowRight") {
            handleRightArrow();
        }
    };

    useEffect(() => {
        containerRef.current &&
            setSliderStyle({ ...sliderStyle, left: `-${containerRef.current.offsetLeft}px`, opacity: 1 });
    }, []);

    const dragStartVal = useRef(0);

    const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setDragImage(new window.Image(), 0, 0);
        dragStartVal.current = event.clientX;
    };

    const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
        if (dragStartVal.current > event.clientX) {
            handleRightArrow();
        } else {
            handleLeftArrow();
        }
    };

    return (
        <div className={styles.sliderContainer} ref={containerRef} onKeyDown={onSliderKeydown} tabIndex={0}>
            <div className={styles.slider} style={sliderStyle}>
                <div className={styles.arrowContainer}>
                    <Button onClick={handleLeftArrow}>{"<"}</Button> <Button onClick={handleRightArrow}>{">"}</Button>
                </div>
                <div className={styles.sliderWrapper} style={{ left: `${wrapperLeftValue}px` }} draggable={false}>
                    {sliderData.map(({ src, alt }) => (
                        <div
                            className={`${styles.image}`}
                            key={src}
                            style={{ width: `${sliderWidthToken}px`, marginRight: `${sliderWidthToken / 20}px` }}
                            draggable={true}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        >
                            <Image className={styles.img} width={1920} height={1080} src={src} alt={alt || "image"} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slider;

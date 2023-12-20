"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../presentation.module.scss";
import getEffectiveBackgroundColor from "@/shared/lib/getEffectiveBackgroundColor";
const PresentationOverlay = () => {
    const presRef = useRef<HTMLDivElement | null>(null);
    const [realBackgroundColor, setRealBackgroundColor] = useState<string>("rgba(0,0,0,0)");

    useEffect(() => {
        if (presRef.current) {
            const realBgColor = getEffectiveBackgroundColor(presRef.current);
            setRealBackgroundColor(realBgColor);
        }
    }, []);
    return (
        <div
            ref={presRef}
            className={styles.sliderOverlay}
            style={{
                background: `linear-gradient(90deg, ${realBackgroundColor} 0%, rgba(0,0,0,0) 3%, rgba(0,0,0,0) 97%, ${realBackgroundColor} 100%)`,
            }}
        />
    );
};

export default PresentationOverlay;

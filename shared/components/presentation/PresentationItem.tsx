"use client";
import Image from "next/image";
import styles from "./presentation.module.scss";
import { TImage, TPresentationItem } from "./types";
/**
 * PresentationItem
 *  - Can be either an image or a component
 * - If it is an image, it will be rendered as an image
 * - If it is a component, it will be rendered as a component
 * @param {TPresentationItem} props
 * @returns {React.FC<TPresentationItem>}
 * @example
 * <PresentationItem item={item} type={type} index={index} eventHandlers={eventHandlers} className={styles.presItem} />
 */
export const PresentationItem: React.FC<TPresentationItem> = ({
    item,
    type,
    idPrefix,
    className,
    style,
    index,
    draggable = true,
    tabIndex,
    onFocus,
    onClick,
    eventHandlers,
}) => {
    const handleFocus = () => {
        onFocus && onFocus();
    };

    const handleClick = () => {
        onClick && onClick();
    };
    return (
        <div
            id={`${idPrefix}-presentation-item-${index}`}
            className={className}
            draggable={draggable}
            style={style}
            aria-label={`Item number: ${index + 1} ${(type === "images" && (item as TImage).alt) || ""}`}
            role={type === "components" || tabIndex === 0 ? "option" : "img"}
            tabIndex={tabIndex === 0 ? 0 : -1 || type === "images" ? -1 : 0}
            onFocus={handleFocus}
            onClick={handleClick}
            {...eventHandlers}
        >
            {type === "components" ? (
                (item as React.ReactNode)
            ) : (
                <div className={styles.imgContainer}>
                    <Image
                        src={(item as TImage).src}
                        width={600}
                        height={600}
                        alt={(item as TImage).alt || "image"}
                        className={styles.img}
                    />
                </div>
            )}
        </div>
    );
};

export default PresentationItem;

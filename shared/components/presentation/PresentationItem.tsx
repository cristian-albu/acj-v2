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
    className,
    style,
    index,
    onFocus,
    eventHandlers,
}) => {
    return (
        <div
            className={className}
            draggable={true}
            style={style}
            aria-label={`Slide number: ${index + 1}`}
            role="option"
            tabIndex={0}
            onFocus={() => onFocus()}
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
                        alt={(item as TImage).alt || "slider image"}
                        className={styles.img}
                    />
                </div>
            )}
        </div>
    );
};

export default PresentationItem;

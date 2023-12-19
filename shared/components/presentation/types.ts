import React from "react";

export type TImage = {
    src: string;
    alt?: string;
};

export type TSliderImage = {
    item: TImage;
    index?: number;
};

export type TSliderComponent = {
    item: React.ReactNode;
    index?: number;
};

export type TPresentationItem = {
    type: "images" | "components";
    onFocus: () => void;
    index: number;
    eventHandlers: Record<string, (e: any) => void>;
    className: string;
    style?: React.CSSProperties;
} & (TSliderImage | TSliderComponent);

export type TSliderImages = {
    type: "images";
    sliderItems: TSliderImage[];
};

export type TSliderComponents = {
    type: "components";
    sliderItems: TSliderComponent[];
};

export type TSliderProps = TSliderImages | TSliderComponents;

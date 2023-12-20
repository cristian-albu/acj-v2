import React from "react";

export type TImage = {
    src: string;
    alt?: string;
};

export type TPresentationImage = {
    item: TImage;
    itemHeader?: React.ReactNode;
    index?: number;
};

export type TPresentationComponent = {
    item: React.ReactNode;
    itemHeader?: React.ReactNode;
    index?: number;
};

export type TPresentationItem = {
    type: "images" | "components";
    onFocus?: () => void;
    index: number;
    eventHandlers?: Record<string, (e: any) => void>;
    className: string;
    style?: React.CSSProperties;
    itemHeader?: React.ReactNode;
} & (TPresentationImage | TPresentationComponent);

export type TPresentationImages = {
    type: "images";
    presentationItems: TPresentationImage[];
};

export type TPresentationComponents = {
    type: "components";
    presentationItems: TPresentationComponent[];
};

export type TPresentationProps = TPresentationImages | TPresentationComponents;

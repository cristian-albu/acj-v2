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

export type TImageType = "images";
export type TComponentType = "components";
export type TPresentationItem = {
    type: TImageType | TComponentType;
    idPrefix?: string;
    onFocus?: () => void;
    onClick?: () => void;
    tabIndex?: number;
    draggable?: boolean;
    index: number;
    eventHandlers?: Record<string, (e: any) => void>;
    className: string;
    style?: React.CSSProperties;
    itemHeader?: React.ReactNode;
} & (TPresentationImage | TPresentationComponent);

export type TPresentationImages = {
    type: TImageType;
    presentationItems: TPresentationImage[];
};

export type TPresentationComponents = {
    type: TComponentType;
    presentationItems: TPresentationComponent[];
};

export type TPresentationProps = TPresentationImages | TPresentationComponents;

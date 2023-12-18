import { CSSProperties, KeyboardEvent, MouseEvent } from "react";

export type TLightboxData = {
    id?: string;
    alt?: string;
    src: string;
};

export type TLightBoxProps = {
    data: TLightboxData[];
};

export type TOnAction = KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>;

export type TImageContainer = {
    src: string;
    index: number;
    className: string;
    style?: CSSProperties;
    alt?: string;
    onAction: (index: number, event: TOnAction) => void;
};

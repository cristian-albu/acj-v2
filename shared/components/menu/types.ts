import React, { Dispatch, SetStateAction } from "react";
import { TGenericButtonProps } from "../layout/types";

export type TListItemProps = {
    id: string;
    onClick?: () => void;
} & TChildren;

export type TListItemInternalProps = {
    focusIndex: number;
    setFocusIndex: Dispatch<SetStateAction<number>>;
    index: number;
} & TListItemProps;

export type TListProps = {
    id?: string;
    listItems: TListItemProps[];
};

export type TMenuProps = {
    menuPosition?: "right" | "right-bottom" | "right-bottom-inner" | "left-bottom-inner" | "left" | "left-bottom";
    targetProps?: TGenericButtonProps;
    menuContents: TListProps;
    setMenuChoice?: Dispatch<SetStateAction<number>>;
} & TChildren;

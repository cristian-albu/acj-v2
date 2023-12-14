import React, { Dispatch, SetStateAction } from "react";

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

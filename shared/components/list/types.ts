import React from "react";

export type TListItemProps = {
    id: string;
} & TChildren;

export type TListItemInternalProps = {
    focusIndex: number;
    index: number;
} & TListItemProps;

export type TListProps = {
    id?: string;
    listItems: TListItemProps[];
};

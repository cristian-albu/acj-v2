"use client";
import { useState } from "react";
import { TListItemProps } from "../types";

const useListNavigator = (listItems: TListItemProps[]) => {
    const [focusIndex, setFocusIndex] = useState(-1);

    const nextItem = () => {
        if (focusIndex + 1 < listItems.length) {
            setFocusIndex(focusIndex + 1);
        }
    };

    const prevItem = () => {
        if (focusIndex > 0) {
            setFocusIndex(focusIndex - 1);
        }
    };

    const lastItem = () => {
        setFocusIndex(listItems.length - 1);
    };

    const firstItem = () => {
        setFocusIndex(0);
    };

    return { focusIndex, nextItem, prevItem, lastItem, firstItem };
};

export default useListNavigator;

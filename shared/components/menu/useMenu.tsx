"use client";
import React, { useState } from "react";
import { TMenuProps } from "./types";
import Menu from "./Menu";

/**
 *
 * @param props Menu props
 * @returns Menu component and menuChoice state as an object. The menuChoice state is the index of the menu item that was clicked
 *
 * @example
 *
 * const { Menu, menuChoice } = useMenu({
 *      menuContents: { listItems: listItems },
 *      menuPosition: "right",
 *      children: "Menu",
 * });
 *
 * return <Menu />
 *
 */
const useMenu = (props: TMenuProps) => {
    const [menuChoice, setMenuChoice] = useState(-1);

    return { Menu: () => <Menu setMenuChoice={setMenuChoice} {...props} />, menuChoice };
};

export default useMenu;

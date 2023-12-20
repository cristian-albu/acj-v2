import { TListItemProps, TMenuProps } from "@/shared/components/menu/types";

export const mock_listItems: TListItemProps[] = [
    { id: "firstItem", children: "First list item" },
    { id: "secondItem", children: "Second list item" },
    { id: "thirdItem", children: "Third list item" },
    { id: "fourthItem", children: "Fourth list item" },
];

export const mock_menuItems: TMenuProps = {
    menuPosition: "right",
    children: "Menu",
    menuContents: {
        listItems: mock_listItems,
    },
};

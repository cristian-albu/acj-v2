import { LinkProps } from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes } from "react";

export type TSection = {
    isFullScreen?: boolean;
} & HTMLAttributes<HTMLDivElement> &
    TChildren;

export type TWrapper = {
    width?: "big" | "small";
} & HTMLAttributes<HTMLDivElement> &
    TChildren;

export type TRow = {} & HTMLAttributes<HTMLDivElement> & TChildren;

export type TGenericButtonProps = {
    btnType?: "primary" | "secondary";
    btnStyle?: "outline";
    theme?: "light" | "dark";
};

export type TButton = TGenericButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & TChildren;

type TGenericLinkButton = {
    href: string;
    linkStyle?: "linkText" | "linkButton";
};
type TInternalButtonLink = TGenericLinkButton & LinkProps & TChildren & TGenericButtonProps;

type TExternalButtonLink = TGenericLinkButton & AnchorHTMLAttributes<HTMLAnchorElement> & TChildren & TGenericButtonProps;

export type TButtonLink = TInternalButtonLink | TExternalButtonLink;

export type TCard = {
    isHoverable?: boolean;
    width?: "full" | "half" | "third" | "quarter";
    tightPadding?: boolean;
} & HTMLAttributes<HTMLDivElement> &
    TChildren;

import React, { Ref, RefObject, forwardRef } from "react";
import styles from "./layout.module.scss";
import { TButtonLink } from "./types";
import Link from "next/link";

/**
 * ButtonLink component
 * @param {string} btnStyle - button style
 * @param {string} theme - button theme
 * @param {string} linkStyle - link style
 * @param {string} href - link href
 * @param {string} children - button children
 * @example
 *
 * <ButtonLink btnStyle="outline" theme="dark" btnType="primary" href={"/"} linkStyle="linkText">
 */
const ButtonLink = forwardRef<HTMLAnchorElement, TButtonLink>(
    ({ href, btnStyle, theme, linkStyle, children, ...rest }, ref) => {
        const styleList = [styles.button];

        linkStyle && styleList.push(styles[linkStyle]);
        btnStyle && styleList.push(styles[btnStyle]);
        theme && styleList.push(styles[theme]);
        const linkStyleClass = styleList.join(" ");

        if (href[0] != "/") {
            return (
                <a href={href} className={linkStyleClass} {...rest}>
                    {children}
                </a>
            );
        } else {
            return (
                <Link href={href} className={linkStyleClass} ref={ref} {...rest}>
                    {children}
                </Link>
            );
        }
    }
);

export default ButtonLink;

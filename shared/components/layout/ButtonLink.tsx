import React from "react";
import styles from "./layout.module.scss";
import { TButtonLink } from "./types";
import Link from "next/link";

const ButtonLink: React.FC<TButtonLink> = (props) => {
    const { isExternal, type, theme, linkStyle } = props;

    const linkStyleClass = `
    ${styles.button} 
    ${linkStyle && styles[linkStyle]} 
    ${type && styles[type]} 
    ${theme && styles[theme]} 
    `;

    if (isExternal) {
        const { href, children, ...elementsProps } = props;

        return (
            <a href={href} className={linkStyleClass} {...elementsProps}>
                {children}
            </a>
        );
    } else {
        const { type, theme, as, href, replace, scroll, shallow, passHref, children, ...elementsProps } = props;

        return (
            <Link
                as={as}
                href={href}
                passHref={passHref}
                replace={replace}
                scroll={scroll}
                shallow={shallow}
                className={linkStyleClass}
                {...elementsProps}
            >
                {children}
            </Link>
        );
    }
};

export default ButtonLink;

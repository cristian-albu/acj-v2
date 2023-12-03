import React from "react";
import styles from "./layout.module.scss";
import { TButtonLink } from "./types";
import Link from "next/link";

const ButtonLink: React.FC<TButtonLink> = (props) => {
    const { href, type, theme, linkStyle, children, ...rest } = props;

    const styleList = [styles.button];

    linkStyle && styleList.push(styles[linkStyle]);
    type && styleList.push(styles[type]);
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
            <Link href={href} className={linkStyleClass} {...rest}>
                {children}
            </Link>
        );
    }
};

export default ButtonLink;

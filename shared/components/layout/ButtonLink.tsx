import React from "react";
import styles from "./layout.module.scss";
import { TButtonLink } from "./types";
import Link from "next/link";

const ButtonLink: React.FC<TButtonLink> = (props) => {
    const { href, btnStyle, theme, linkStyle, children, ...rest } = props;

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
            <Link href={href} className={linkStyleClass} {...rest}>
                {children}
            </Link>
        );
    }
};

export default ButtonLink;

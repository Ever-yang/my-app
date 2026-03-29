import React from "react";
import { classnames } from "../../utils/utils";
import styles from '../button/index.module.scss'

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string,
    disabled?: boolean,
    size?: ButtonSize,
    btnType?: ButtonType,
    children: React.ReactNode,
    href?: string,
    onClick: () => void
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
type AnchorButtonProps = BaseButtonProps & React.BaseHTMLAttributes<HTMLAnchorElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button = (props: BaseButtonProps) => {
    const { className, disabled, size, btnType, children, href, onClick, ...restProps } = props
    console.log(styles)
    const classes = classnames(styles['btn'], className, {
        [styles[`btn-${btnType}`]]: btnType,
        [styles[`btn-${size}`]]: size,
        [styles['disable']]: btnType === ButtonType.Link && disabled
    })

    return (<>
        {
            btnType === ButtonType.Link && <a className={classes} href={href} {...restProps}>
                {children}
            </a>
        }
        {
            btnType !== ButtonType.Link &&
            <button className={classes} disabled={disabled} {...restProps}>
                {children}
            </button>
        }
    </>)
}

export default Button
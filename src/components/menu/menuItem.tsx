import React, { useContext } from "react"
import { classnames } from "../../utils/utils"
import { MenuContext } from "./menu"


export interface MenuItemProps {
    index: number,
    disabled?: boolean,
    className?: string,
    style?: React.CSSProperties
    children?: React.ReactNode
}

export const MenuItem = (props: MenuItemProps) => {
    const context = useContext(MenuContext)
    const { index, disabled, className, children, style } = props
    const classes = classnames('menu-item', className, { 'is-disabled': disabled, 'is-active': context.index === index })
    return <li className={classes} style={style} onClick={() => {
        context.onSelect && context.onSelect(index)
    }}>
        {children}
    </li>
}
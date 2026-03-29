import React, { createContext, useState } from "react";
import { classnames } from "../../utils/utils";


type MenuMode = 'horizontial' | 'vertical'
export interface MenuProps {
    defaultIndex?: number;
    className?: string,
    mode?: MenuMode
    style?: React.CSSProperties;
    children?: React.ReactNode
    onSelect?: (selectIndex: number) => void
}


interface IMenuContext {
    index: number,
    onSelect?: (id: number) => void

}

export const MenuContext = createContext<IMenuContext>({ index: 0 })

export const Menu = (props: MenuProps) => {
    const { className, mode, style, defaultIndex, children, onSelect } = props
    const classes = classnames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
    })

    const [currentActive, setCurrentActive] = useState(defaultIndex)

    const passContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onSelect: (index: number) => {
            setCurrentActive(index)
            onSelect && onSelect(index)
        }
    }


    return <ul className={classes}>
        <MenuContext.Provider value={passContext}>
            {children}
        </MenuContext.Provider>
    </ul>

}

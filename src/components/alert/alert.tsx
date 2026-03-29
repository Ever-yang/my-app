
import { classnames } from '../../utils/utils'
import styles from './index.module.scss'
export enum AlertType {
    SUCCESS = 'success',
    DEFAULT = 'default',
    DANGER = 'danger',
    WARNING = 'warning'
}


interface AlertProps {
    type: AlertType,
    closeable?: boolean,
    children?: React.ReactNode,
    msg?: string
}
const Alert = (props: AlertProps) => {
    const { type, closeable, children, msg = '111' } = props
    const iconClasses = classnames(styles['icon'], styles[`icon-${type}`])
    const wrapClasses = classnames(styles['alert-wrap'], styles[`wrap-${type}`])
    const closeClasses = classnames(styles['icon'], styles[`icon-close`])
    return (<div className={wrapClasses}>
        <span className={iconClasses}></span>
        <span>{msg}</span>
        <span className={closeClasses}></span>
    </div>)
}

export default Alert
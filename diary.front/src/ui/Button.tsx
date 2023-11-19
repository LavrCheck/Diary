import { CSSProperties } from 'react'
import './Button.sass'

export const Button = ({
    children,
    onClick,
    style,
    sign = false,
    outline = false,
    signed = false
}: {
    children: string | React.ReactElement
    onClick?: any
    style?: CSSProperties
    sign?: boolean
    outline?: boolean
    signed?: boolean
}) => {
    return (
        <button style={style} className={`Button ${sign ? 'sign' : ''} ${outline ? 'outline' : ''} ${signed ? 'signed' : ''}`}
            onClick={onClick}>{children}</button>
    )
}
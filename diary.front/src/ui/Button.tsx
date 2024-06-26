import { CSSProperties } from 'react'
import './Button.sass'

export const Button = ({
    children,
    onClick,
    style,
    sign = false,
    outline = false,
    signed = false,
    className
}: {
    children: string | React.ReactElement
    onClick?: any
    style?: CSSProperties
    sign?: boolean
    outline?: boolean
    signed?: boolean
    className?: string
}) => {
    return (
        <button style={style} className={`Button ${className ?? ''} ${sign ? 'sign' : ''} ${outline ? 'outline' : ''} ${signed ? 'signed' : ''}`}
            onClick={onClick}>{children}</button>
    )
}
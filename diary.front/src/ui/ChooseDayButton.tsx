import { CSSProperties } from 'react'
import './ChooseDayButton.sass'



export const ChooseDayButton = ({
    children,
    onClick,
}:{
    children: string
    onClick: any
}) => {
    return (
        <button className="ChooseDayButton" onClick={onClick}>{children}</button>
    )
}
import './PasswordInput.sass'
import eyeOpen from '../images/eyeOpen.svg'
import eyeClose from '../images/eyeClose.svg'
import { useState } from 'react'

export const PasswordInput = ({
    value,
    onChange,
    placeholder
}: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
}) => {

    const [isPassword, setIsPassword] = useState(true)


    return (
        <div className="PasswordInput">
            <input placeholder={placeholder} value={value} onChange={(e) => onChange(e)} type={isPassword ? 'password' : 'text'} />
            <button onClick={() => setIsPassword(!isPassword)}><img src={isPassword ? eyeOpen : eyeClose} alt='eye'/></button>
        </div>
    )
}
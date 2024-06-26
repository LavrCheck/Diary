import './PasswordInput.sass'
import eyeOpen from '../images/eyeOpen.svg'
import eyeClose from '../images/eyeClose.svg'
import { useRef, useState } from 'react'

export const PasswordInput = ({
    value,
    onChange,
    placeholder,
    className
}: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    className?: string
}) => {

    const [isPassword, setIsPassword] = useState<boolean>(true)
    const inputRef = useRef<HTMLInputElement>(null)


    return (
        <div className="PasswordInput">
            <input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)}
                type={isPassword ? 'password' : 'text'}
                className={className}
                ref={inputRef}
            />
            <button
                onMouseDown={(e) => {
                    e.preventDefault();
                    inputRef.current?.focus();
                    setIsPassword(!isPassword);
                }}
            >
                <img src={isPassword ? eyeOpen : eyeClose} alt='eye' />
            </button>
        </div>
    )
}
import './Authorization.sass'
import { Button } from '../ui/Button'
import { useNavigate } from 'react-router-dom'



export const Authorization = ({
    userName
}: {
    userName: string | null
}) => {

    const navigate = useNavigate()

    return (
        <div className="Authorization">
            <p>{userName ? userName : 'Чтобы сохранять задачи, нужно'}</p>
            <Button sign={true} signed={userName ? true : false} outline={true} style={userName ? {} : { width: '100px' }}
                onClick={() => navigate('/sign')} >{userName ? '' : 'Войти'}</Button>
        </div>
    )
}
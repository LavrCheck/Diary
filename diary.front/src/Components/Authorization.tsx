import './Authorization.sass'
import { Button } from '../ui/Button'
import { useNavigate } from 'react-router-dom'



export const Authorization = ({
    userId,
    userName
}: {
    userId: string | null
    userName: string | null
}) => {

    const navigate = useNavigate()

    return (
        <div className="Authorization">
            <p>{userId ? userName : 'Чтобы сохранять задачи нужно'}</p>
            <Button sign={true} signed={userId ? true : false} outline={true} style={userId ? {} : { width: '100px' }}
                onClick={() => navigate('/sign')} >{userId ? '' : 'Войти'}</Button>
        </div>
    )
}
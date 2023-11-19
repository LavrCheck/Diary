import './Alert.sass'

export const Alert = ({
    isSignUp,
    isVisible = false
}:{
    isSignUp: boolean
    isVisible: boolean
}) => {

    return (
        <div className='Alert' style={{opacity: isVisible ? '1' : '0'}}>
            <p>{ isSignUp ? 'Имя уже зарегистрировано' : 'Такого пользователя нет'}</p>
        </div>
    )
}
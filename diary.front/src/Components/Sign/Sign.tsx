import { Button } from '../../ui/Button'
import { Alert } from './Alert'
import './Sign.sass'
import { useEffect, useState } from 'react'
import { signIn, signUp, getTasks } from '../../api'
import { ServerAlert } from './ServerAlert'
import { useDispatch } from 'react-redux'
import { actions } from '../../store'
import { todayTime, tomorrowTime, afterTomorrowTime } from '../Dairy'
import { useNavigate } from 'react-router-dom'



function renameKeys(arr : any[]) {
    return arr.map(obj => ({
      userId: obj.userid,
      taskId: obj.taskid,
      taskName: obj.taskname,
      important: obj.important,
      date: obj.date 
    }))
  }



export const Sign = () => {

    const [isSignUp, setIsSignUp] = useState<boolean>(true)

    const [name, setName] = useState<string>('')
    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }
    const [password, setPassword] = useState<string>('')
    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }
    useEffect(() => {
        setName('')
        setPassword('')
        setIsAlert(false)
        setIsServerAlert(false)
    }, [isSignUp])

    const [isAlert, setIsAlert] = useState<boolean>(false)
    const [isServerAlert, setIsServerAlert] = useState<boolean>(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function sortAdd(tasks: any[]) {
        tasks.forEach((x) => {
            if ( x.date === null ) { dispatch(actions.addTaskFuture(x)) } else {
                if ( x.date < todayTime ) { dispatch(actions.addTaskToday(x)) } else {
                    if ( x.date < tomorrowTime ) { dispatch(actions.addTaskTomorrow(x)) } else {
                        if ( x.date < afterTomorrowTime ) { dispatch(actions.addTaskAfterTomorrow(x)) }
                    }
                }
            }
        })
    }

    async function signUpTC() { // TC - Try Catch
        try {
            const user = await signUp(name, password)
            dispatch(actions.resetState())
            dispatch(actions.addUserId(user.userid))
            dispatch(actions.addUserName(user.username))
            navigate('/')
        } catch (err: any) {
            if (err.response && err.response.status === 409) {
                setIsAlert(true)
                setTimeout(() => setIsAlert(false), 2000)
            } else {
                setIsServerAlert(true)
            }
        }
    }

    async function signInTC() {
        try {
            const user = await signIn(name, password)
            const tasks = await getTasks(user.userid)
            dispatch(actions.resetState())
            dispatch(actions.addUserId(user.userid))
            dispatch(actions.addUserName(user.username))
            sortAdd(renameKeys(tasks))
            navigate('/')            
        } catch (err: any) {
            if (err.response && err.response.status === 404) {
                setIsAlert(true)
                setTimeout(() => setIsAlert(false), 2000)
            } else {
                setIsServerAlert(true)
            }
        }
    }



    return (<>
        {isServerAlert && <ServerAlert />}
        <div className="Sign">
            <Alert isVisible={isAlert} isSignUp={isSignUp} />
            <h1>{isSignUp ? 'Регистрация' : 'Вход'}</h1>
            <div className='inputs-container'>
                <input value={name} onChange={changeName} type='text' />
                <input value={password} onChange={changePassword} type='password' />
            </div>
            <div className='buttons-container'>
                <Button onClick={() => { if (name !== '' && password !== '') {
                    isSignUp ? signUpTC() : signInTC() }
                }} sign={true} >{isSignUp ? 'Зарегистрироваться' : 'Войти'}</Button>
                <Button sign={true} outline={true} onClick={() => { setIsSignUp(!isSignUp) }}
                >{isSignUp ? 'Уже есть аккаунт?' : 'Еще не с нами?'}</Button>
            </div>
        </div>
    </>
    )
}
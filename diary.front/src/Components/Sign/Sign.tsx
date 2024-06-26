import { Button } from '../../ui/Button'
import { Alert } from './Alert'
import './Sign.sass'
import { useEffect, useState } from 'react'
import { signIn, signUp, getTasks } from '../../api'
import { ServerAlert } from './ServerAlert'
import { useDispatch } from 'react-redux'
import { actions } from '../../store'
import { useNavigate } from 'react-router-dom'
import { Task } from '../../types'
import { PasswordInput } from '../../ui/PasswordInput'



function renameKeys(arr: any[]): Task[] {
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
    const [isAlert, setIsAlert] = useState<boolean>(false)
    const [isAlertExists, setIsAlertExists] = useState<boolean>(true)
    const [isServerAlert, setIsServerAlert] = useState<boolean>(false)

    function changeSign() {
        setIsSignUp(!isSignUp)
        setIsAlertExists(false)
        setTimeout(() => setIsAlertExists(true), 1)
    }

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

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function addTasksToState(tasks: Task[]) {
        tasks.forEach((x: Task) => {
            dispatch(actions.addTask(x))
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
            const renamedTasks = renameKeys(tasks)
            addTasksToState(renamedTasks)
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
            {isAlertExists && <Alert isVisible={isAlert} isSignUp={isSignUp} />}
            <h1>{isSignUp ? 'Регистрация' : 'Вход'}</h1>
            <div className='inputs-container'>
                <input value={name} onChange={changeName} type='text' placeholder='Имя'/>
                <PasswordInput className='password' value={password} onChange={changePassword} placeholder='Пароль'/>
            </div>
            <div className='buttons-container'>
                <Button onClick={() => {
                    if (name !== '' && password !== '') {
                        isSignUp ? signUpTC() : signInTC()
                    }
                }} sign={true} >{isSignUp ? 'Зарегистрироваться' : 'Войти'}</Button>
                <Button sign={true} outline={true} onClick={() => changeSign()}
                >{isSignUp ? 'Уже есть аккаунт?' : 'Еще не с нами?'}</Button>
            </div>
        </div>
    </>
    )
}
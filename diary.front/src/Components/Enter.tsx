import './Enter.sass'
import important from '../images/important.svg'
import arrowUp from '../images/arrowUp.svg'
import {Button} from '../ui/Button'
import {useEffect, useRef, useState} from 'react'
import {v1 as uuidv1} from 'uuid';
import {actions} from '../store'
import {useDispatch} from 'react-redux'
import {addTaskBD} from '../api'
import {InputSwitch} from 'primereact/inputswitch'


class Task {
    userId: string | null
    taskId: string
    taskName: string
    important: boolean
    date: number | null

    constructor(userId: string | null, taskName: string, important: boolean, date: number | null) {
        this.userId = userId
        this.taskId = uuidv1()
        this.taskName = taskName
        this.important = important
        this.date = date
    }
}


export const Enter = ({
                          userId,
                          date,
                          hideEnter,
                          isEnterVisible
                      }: {
    userId: string | null
    date: number | null
    hideEnter: () => void
    isEnterVisible?: boolean
}) => {

    const [taskName, setTaskName] = useState<string>('')
    const [isCheckbox, setIsCheckbox] = useState<boolean>(false)

    const taskInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (taskInputRef.current) {
            taskInputRef.current.focus()
        }
    }, [])

    const dispatch = useDispatch()

    useEffect(() => {
        if (isEnterVisible) setTaskName('')
    }, [isEnterVisible]);

    async function submit() {
        hideEnter()
        if (!taskName) {
            return
        }
        dispatch(actions.addTask(new Task(userId, taskName, isCheckbox, date)))
        if (userId !== null) {
            await addTaskBD(new Task(userId, taskName, isCheckbox, date))
        }
    }

    return (
        <div className="Enter">
            <input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                type='text'
                className='task-input'
                ref={taskInputRef}
            />
            <div className='important'>
                <InputSwitch
                    checked={isCheckbox}
                    onChange={(e) => setIsCheckbox(e.value)}
                />
                <img src={important}/>
            </div>
            <Button onClick={() => submit()}>
                <img src={arrowUp}/>
            </Button>
        </div>
    )
}
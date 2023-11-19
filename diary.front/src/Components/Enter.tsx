import './Enter.sass'
import important from '../images/important.svg'
import submitEnter from '../images/submitEnter.svg'
import { Button } from '../ui/Button'
import { useState } from 'react'
import { v1 as uuidv1 } from 'uuid';



class Task {
    userId: string | null
    taskId: string 
    taskName: string
    important: boolean
    date: number | null

    constructor (userId: string | null, taskName: string, important: boolean, date: number | null) {
        this.userId = userId
        this.taskId = uuidv1()
        this.taskName = taskName
        this.important = important
        this.date = date
    }
}



export const Enter = ({
    submit,
    userId,
    date
}:{
    submit: (x: any) => void
    userId : string | null
    date: number | null
}) => {


    const [taskName, setTaskName] = useState('')
    const changeTask = (e :any) => {setTaskName(e.target.value)}

    const [isCheckbox, setIsCheckbox] = useState(false)
    const changeCheckbox = (e : any) => {setIsCheckbox(e.target.checked)}


    return (
        <div className="Enter">
            <input value={taskName} onChange={changeTask} type='text' className='task'/>
            <div className='important'>
                <input checked={isCheckbox} onChange={changeCheckbox} type='checkbox'/>
                <img src={important} alt='!' />
            </div>
            <Button onClick={() =>{ if(taskName !== '') { submit(new Task(userId, taskName, isCheckbox, date)) }}}><img src={submitEnter} alt='+'/></Button>
        </div>
    )
}

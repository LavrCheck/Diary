import './Selector.sass'
import { ChooseDayButton } from '../ui/ChooseDayButton'
import { Enter } from './Enter'
import { useState } from 'react'
import { TaskUnit } from './TaskUnit'
import { Task } from '../store'



export const Selector = ({
    title,
    tasks,
    remove,
    submit,
    userId,
    date
}:{
    title: string
    tasks: Task[]
    submit: (x: any) => void
    remove: (x:any) => void
    userId: string | null
    date: number | null
}) => {
    
    const [isEnterVisible, setIsEnterVisible] = useState(false)

    return (
        <div className="Selector">
            <ChooseDayButton onClick={() => setIsEnterVisible(!isEnterVisible)} children={title}/>
            {isEnterVisible && <Enter date={date} userId={userId} submit={(task) => {submit(task); setIsEnterVisible(!isEnterVisible)}}/> }
            {tasks.map((x) => {return (
                <TaskUnit remove={(taskId) => remove(taskId)} key={x.taskId} title={x.taskName} isImportant={x.important} taskId={x.taskId}/>
            )})}
        </div>
    )
    
}

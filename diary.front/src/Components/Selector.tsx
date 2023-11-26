import './Selector.sass'
import { ChooseDayButton } from '../ui/ChooseDayButton'
import { Enter } from './Enter'
import { useState } from 'react'
import { TaskUnit } from './TaskUnit'
import { Task } from '../types'



export const Selector = ({
    title,
    tasks,
    userId,
    date
}: {
    title: string
    tasks: Task[]
    userId: string | null
    date: number | null
}) => {

    const [isEnterVisible, setIsEnterVisible] = useState(false)

    return (
        <div className="Selector">
            <ChooseDayButton onClick={() => setIsEnterVisible(!isEnterVisible)} children={title} />
            {isEnterVisible && <Enter hideEnter={() => setIsEnterVisible(false)} date={date} userId={userId} />}
            {tasks.map((x) => {
                return (
                    <TaskUnit userId={userId} key={x.taskId} title={x.taskName} isImportant={x.important} taskId={x.taskId} />
                )
            })}
        </div>
    )

}
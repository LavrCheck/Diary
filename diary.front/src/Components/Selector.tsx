import './Selector.sass'
import {ChooseDayButton} from '../ui/ChooseDayButton'
import {Enter} from './Enter'
import {useState} from 'react'
import {TaskUnit} from './TaskUnit'
import {Task} from '../types'


export const Selector = (
    {
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
            <ChooseDayButton onClick={() => setIsEnterVisible(!isEnterVisible)} children={title}/>
            <div className={`enter-height-animation ${isEnterVisible ? 'enter-height-animation-active' : ''}`}>
                <Enter isEnterVisible={isEnterVisible} hideEnter={() => setIsEnterVisible(false)} date={date}
                       userId={userId}/>
            </div>

            {tasks.map((x) => (
                <TaskUnit
                    key={x.taskId}
                    userId={userId}
                    title={x.taskName}
                    isImportant={x.important}
                    taskId={x.taskId}
                />
            ))}
        </div>
    )

}
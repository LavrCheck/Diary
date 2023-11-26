import './TaskUnit.sass'
import important from '../images/important.svg'
import doneTask from '../images/doneTask.svg'
import { Button } from '../ui/Button'
import { useDispatch } from 'react-redux'
import { actions } from '../store'
import { removeTaskBD } from '../api'



export const TaskUnit = ({
    title,
    isImportant,
    taskId,
    userId
}: {
    title?: string
    isImportant?: boolean
    taskId: string
    userId: string | null
}) => {

    const dispatch = useDispatch()

    async function removeTask() {
        dispatch(actions.removeTask(taskId))
        if (userId !== null) { await removeTaskBD(taskId) }
    }

    return (
        <div className="TaskUnit">
            <p>{title}</p>
            <div>
                {isImportant && <img src={important} className='important' alt='!' />}
                <Button onClick={() => removeTask()}><img src={doneTask} alt='+' /></Button>
            </div>
        </div>
    )
}
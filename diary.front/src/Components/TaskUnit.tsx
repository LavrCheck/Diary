import './TaskUnit.sass'
import important from '../images/important.svg'
import doneTask from '../images/doneTask.svg'
import { Button } from '../ui/Button'



export const TaskUnit = ({
    title,
    isImportant,
    taskId,
    remove
}:{
    title?: string
    isImportant?: boolean
    taskId: string
    remove: (x: any) => void
}) => {
    
    return (
        <div className="TaskUnit">
            <p>{title}</p>
            <div>
                {isImportant && <img src={important} className='important' alt='!'/>}
                <Button onClick={()=> remove(taskId)}><img src={doneTask} alt='+'/></Button>
            </div>
        </div>
    )
}
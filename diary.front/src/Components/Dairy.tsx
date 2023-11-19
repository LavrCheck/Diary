import { Selector } from "./Selector"
import './Dairy.sass'
import { connect } from 'react-redux'
import { TaskState } from "../store"
import { useDispatch } from 'react-redux/es/exports'
import { actions } from '../store'
import { removeTask, addTask } from "../api"
import { Authorization } from "./Authorization"



const mapStateToProps = (state: { tasks: TaskState }) => ({
    tasks: state.tasks
})

export const todayTime = new Date().getTime()
export const tomorrowTime = new Date().getTime() + (24 * 60 * 60 * 1000) // Добавляем 1 день в миллисекундах
export const afterTomorrowTime = new Date().getTime() + (2 * 24 * 60 * 60 * 1000) // Добавляем 2 дня в миллисекундах

async function removeTaskFromBD(userId: string | null, taskId: string) {
    if (userId !== null) { await removeTask(taskId) }
}
async function addTaskToBD(userId: string | null, task: any) {
    if (userId !== null) { await addTask(task) }
}



const Dairy = ({ tasks }: { tasks: TaskState }) => {

    const dispatch = useDispatch()



    return (
        <div className="Dairy">
            <Authorization userId={tasks.userId} userName={tasks.userName}/>            
            <Selector tasks={tasks.Today} title='Сегодня' userId={tasks.userId} date={todayTime}
                submit={(task) => { addTaskToBD(tasks.userId, task); dispatch(actions.addTaskToday(task)) }}
                remove={(taskId) => { removeTaskFromBD(tasks.userId, taskId); dispatch(actions.removeTaskToday(taskId)) }} />
            <Selector tasks={tasks.Tomorrow} title='Завтра' userId={tasks.userId} date={tomorrowTime}
                submit={(task) => { addTaskToBD(tasks.userId, task); dispatch(actions.addTaskTomorrow(task)) }}
                remove={(taskId) => { removeTaskFromBD(tasks.userId, taskId); dispatch(actions.removeTaskTomorrow(taskId)) }} />
            <Selector tasks={tasks.AfterTomorrow} title='Послезавтра' userId={tasks.userId} date={afterTomorrowTime}
                submit={(task) => { addTaskToBD(tasks.userId, task); dispatch(actions.addTaskAfterTomorrow(task)) }}
                remove={(taskId) => { removeTaskFromBD(tasks.userId, taskId); dispatch(actions.removeTaskAfterTomorrow(taskId)) }} />
            <Selector tasks={tasks.Future} title='В будущем' userId={tasks.userId} date={null}
                submit={(task) => { addTaskToBD(tasks.userId, task); dispatch(actions.addTaskFuture(task)) }}
                remove={(taskId) => { removeTaskFromBD(tasks.userId, taskId); dispatch(actions.removeTaskFuture(taskId)) }} />
        </div>
    )
}


export default connect(mapStateToProps)(Dairy)

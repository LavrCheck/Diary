import { Selector } from "./Selector"
import './Diary.sass'
import { connect } from 'react-redux'
import { TaskState, Task } from '../types'
import { Authorization } from "./Authorization"



const mapStateToProps = (state: { tasks: TaskState }) => ({
    tasks: state.tasks
})

const todayTime = (): number => new Date().getTime()
const tomorrowTime = (): number => new Date().getTime() + (24 * 60 * 60 * 1000)
const afterTomorrowTime = (): number => new Date().getTime() + (2 * 24 * 60 * 60 * 1000)



const Diary = ({ tasks }: { tasks: TaskState }) => {

    const today: Task[] = []
    const tomorrow: Task[] = []
    const afterTomorrow: Task[] = []
    const future: Task[] = []

    tasks.tasks.forEach((task) => {
        if (task.date === null) { future.push(task) }
        else if (task.date <= todayTime()) { today.push(task) }
        else if (task.date <= tomorrowTime()) { tomorrow.push(task) }
        else if (task.date <= afterTomorrowTime()) { afterTomorrow.push(task) }
    })



    return (
        <div className="Dairy">
            <Authorization userName={tasks.userName} />
            <Selector tasks={today} title='Сегодня' userId={tasks.userId} date={todayTime()} />
            <Selector tasks={tomorrow} title='Завтра' userId={tasks.userId} date={tomorrowTime()} />
            <Selector tasks={afterTomorrow} title='Послезавтра' userId={tasks.userId} date={afterTomorrowTime()} />
            <Selector tasks={future} title='В будущем' userId={tasks.userId} date={null} />
        </div>
    )
}

export default connect(mapStateToProps)(Diary)
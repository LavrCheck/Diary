import './TaskUnit.sass'
import important from '../images/important.svg'
import {Button} from '../ui/Button'
import {useDispatch} from 'react-redux'
import {actions} from '../store'
import {removeTaskBD} from '../api'


export const TaskUnit = (
    {
        title,
        isImportant,
        taskId,
        userId,
    }: {
        title?: string
        isImportant?: boolean
        taskId: string
        userId: string | null
    }) => {

    const dispatch = useDispatch()

    async function removeTask() {
        dispatch(actions.removeTask(taskId))
        if (userId !== null) {
            await removeTaskBD(taskId)
        }
    }

    return (
        <div className={`TaskUnit`}>
            <p>{title}</p>
            <div>
                {isImportant && <img src={important} className='important' alt='!'/>}
                <Button onClick={() => removeTask()}>
                    <svg
                        id={`done-icon-${taskId}`}
                        viewBox="0 0 128 128"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`done-icon done-icon-${taskId}`}
                    >
                        <defs>
                            <linearGradient
                                id={`gradient-${taskId}`}
                                x1="12"
                                x2="116"
                                y1="64"
                                y2="64"
                            >
                                <stop
                                    offset="0"
                                    stopColor="#5098ff"
                                    className={`gradient-stop gradient-stop-${taskId}`}
                                />
                            </linearGradient>
                        </defs>
                        <rect
                            width="104"
                            height="104"
                            x="12"
                            y="12"
                            rx="17.33"
                            fill={`url(#gradient-${taskId})`}
                        />
                        <path
                            fill="#fff"
                            d="M54.91,84.29h-.14a5.73,5.73,0,0,1-4.15-2L41.3,71.73A6.41,6.41,0,0,1,41.61,63a5.65,5.65,0,0,1,8.27.32l5.25,6L78.32,45.46a5.66,5.66,0,0,1,8.29.11,6.44,6.44,0,0,1-.11,8.74L59,82.54A5.71,5.71,0,0,1,54.91,84.29Z"
                        />
                    </svg>
                </Button>
            </div>
        </div>
    )
}
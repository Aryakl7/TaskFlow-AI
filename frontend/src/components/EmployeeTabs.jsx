export const TaskBoard = ({employees, taskList}) => {
    return (
        <div className="bg-white mt-5 p-5">
            <h3 className="text-3xl font-bold mb-5">Task Board</h3>
            <ul className="flex justify-between flex-wrap">
                {
                    taskList.map((task) => (
                        <li 
                            className="mx-3 bg-blue-100 p-5 w-1/4 mb-5"
                             key={task.taskTitle}>
                            <p>{task.empName}</p>
                            <p>Task Title : {task.taskTitle}</p>
                            <p>Task Desc : {task.taskDesc}</p>
                            <p className="font-bold">Predicting Time : {task.estimatedTime}</p>
                        </li>
                    ))
                }
            </ul>
        </div>   
    )
}
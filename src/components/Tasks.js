import React,{useContext} from 'react'
import Task from "./Task";
import {TaskContext} from '../context'



const Tasks = (props) => {
    const [tasks,setTasks] = useContext(TaskContext)
    return (
        <>
            <h3>My Task</h3>
            {tasks.map((task,index) => (
                <Task key={index} task={task}/>
                
            ))}
        </>
    )
}

export default Tasks

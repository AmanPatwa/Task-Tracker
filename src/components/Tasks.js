import React from 'react'
import Task from "./Task";

const Tasks = ({tasks, onDelete, onToggle}) => {
    return (
        <>
            <h3>My Task</h3>
            {tasks.map((task,index) => (
                <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle}/>
                
            ))}
        </>
    )
}

export default Tasks

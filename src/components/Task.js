import React,{useContext} from 'react'
import { FaTimes } from 'react-icons/fa';
import {TaskContext} from '../context'

const Task = (props) => {
    const [tasks,setTasks] = useContext(TaskContext)
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
    
        setTasks(tasks.filter((task) => task.id !== id))
      }
    
      const toggleReminder = async (task) => {
        // const task = await getTaskById(id)
        const object = { ...task, reminder: !task.reminder }
        const response = await fetch(`http://localhost:5000/tasks/${task.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(object),
        })
        const data = await response.json()
    
        setTasks(tasks.map((task1) => task1.id === task.id ? { ...task1, reminder: data.reminder } : task1))
      }
    return (
        <div className={`task ${props.task.reminder? 'reminder' : ''}`} onDoubleClick={()=> toggleReminder(props.task)}>
            <h3>{props.task.text} <FaTimes style={{color:'red',cursor:'pointer'}} onClick={() => deleteTask(props.task.id)}/></h3>
            <p>{props.task.day}</p>
        </div>
    )
}

export default Task

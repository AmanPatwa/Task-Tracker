import React,{useContext} from 'react'
import { TaskContext } from '../context'
import Tasks from './Tasks'

const MidComponent = () => {
    const [tasks,setTasks] = useContext(TaskContext)
    return (
        <>
           {tasks.length > 0 ?
              (<Tasks  />) :
              (<h2>No task yet, Please add one</h2>)
            } 
        </>
    )
}

export default MidComponent

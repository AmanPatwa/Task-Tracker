import {useState, useContext} from 'react'
import {TaskContext} from '../context'

const AddTask = (props) => {
    const [tasks,setTasks] = useContext(TaskContext)
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if (!text || !day){
            alert('Some field are missing')
            return
        }
        addTask({text,day,reminder})

        setText('')
        setDay('')
        setReminder(false)
    }

    const addTask = async (task) => {
        // const id = Math.floor(Math.random()*1000) +1
    
        const response = await fetch('http://localhost:5000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task),
        })
        const data = await response.json()
        setTasks([...tasks, data])
      }

    return (

        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label htmlFor="">Task</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='Add Task' name="" id="" />
            </div>
            <div className='form-control'>
                <label htmlFor="">Day & Time</label>
                <input type="text" value={day} onChange={(e) => setDay(e.target.value)} placeholder='Add Day & Time' name="" id="" />
            </div>
            <div className='form-control form-control-check'>
                <label htmlFor="">Set Reminder</label>
                <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>
            <input type="submit" className='btn btn-block' value="Save Task" />
        </form>
    )
}

export default AddTask

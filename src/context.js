import React,{createContext, useState,useEffect} from 'react'



export const TaskContext = createContext()
const tasksArray = [
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 2:30pm',
      reminder: true
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 5th at 2:30pm',
      reminder: false
    }
  ]

export const TaskProvider = (props) => {
  const [tasks, setTasks] = useState(tasksArray)
  useEffect(() => {
    const getTask = async () => {
      const taskFromServer = await fetchTask()
      setTasks(taskFromServer)
    }
    getTask()
  }, [])

  const fetchTask = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

    return (
        <TaskContext.Provider value={[tasks,setTasks]}>
            {props.children}
        </TaskContext.Provider>
    )
}

// export const context


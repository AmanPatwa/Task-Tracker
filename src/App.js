import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

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

function App() {
  const [tasks, setTasks] = useState(tasksArray)
  const [showAdd, setshowAdd] = useState(false)

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

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const getTaskById = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data

  }

  const toggleReminder = async (id) => {
    const task = await getTaskById(id)
    const object = { ...task, reminder: !task.reminder }
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object),
    })
    const data = await response.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
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
    <Router>
      <div className="container">
        <Header onAddShow={() => setshowAdd(!showAdd)} onShow={showAdd} />
        
        <Route path='/' exact render={(props) => (
          <>
            {showAdd && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ?
              (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) :
              (<h2>No task yet, Please add one</h2>)
            }
          </>
        )}>

        </Route>
        <Route path='/about' component={About}></Route>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

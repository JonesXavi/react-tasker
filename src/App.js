import { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import Header from './components/Header';
import Tasks from './components/Tasks';

function App() {
  const [showAddTask, setShowAddTask] =  useState(false);
  const [tasks, setTasks] = useState([]);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json;odata.metadata=full',
    'Content-type': 'application/json'
  };

  useEffect(() => {
    //Fetch the tasks from db.json
    const fetchTasks = async () => {
      const res = await fetch('https://my-json-server.typicode.com/jonesxavi/react-tasker/tasks', {
        headers: headers
      });
      const data = await res.json();

      setTasks(data);
    }

    fetchTasks();
  }, []);

  const addTask = async(task) => {
    task.day = `${task.day.toDateString()} ${task.day.toLocaleTimeString()}`;
    
    const res = await fetch('https://my-json-server.typicode.com/jonesxavi/react-tasker/tasks/', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(task)
    })

    const data = await res.json();
    setTasks([...tasks, data]);
    setShowAddTask(!showAddTask);
  }

  const deleteTask = async (id) => {
    await fetch(`https://my-json-server.typicode.com/jonesxavi/react-tasker/tasks/${id}`, {
      method: 'DELETE',
      headers: headers
    })

    setTasks(tasks.filter((task) => task.id !== id));
  }

  //Fetch a single task
  const fetchTask = async (id) => {
    const res = await fetch(`https://my-json-server.typicode.com/jonesxavi/react-tasker/tasks/${id}`, {
      headers: headers
    });
    return await res.json();
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder};

    const res = await fetch(`https://my-json-server.typicode.com/jonesxavi/react-tasker/tasks/${id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json();

    setTasks(tasks.map((task) =>
      task.id === id ? {...task, reminder: data.reminder} : task
    ));
  }

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  }

  return (
    <div className="container">
      <Header onToggle={toggleAddTask} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {
        tasks.length > 0 ?
          (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
          ) : (
            'No Tasks To Show'
          )
      }
    </div>
  );
}

export default App;

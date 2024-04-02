import React, { useState } from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';

import Task from './Task';
import Input from "./Input";
import MyButton from './MyButton';

function App() {
  // useState
  const [list, setList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");

  const [openCalendarId, setOpenCalendarId] = useState(null);


  // Comportements
  const deleteTask = (id) => {
    setList(list.filter(task => task.id !== id));
  }

  const Update = () => {
    if (editingTaskId !== null && editingTaskTitle.trim() !== "") {
      setList(list.map(task => {
        if (task.id === editingTaskId) {
          return { ...task, title: editingTaskTitle };
        }
        return task;
      }));
      setEditingTaskId(null);
      setEditingTaskTitle("");

    }
  }

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newId = list.length > 0 ? list[list.length - 1].id + 1 : 1;
      setList([...list, { id: newId, title: newTask, status: false, date: null }]);
      setNewTask("");


    }
  }
  const selectDate = (id, date) => {
    setList(list.map(task => {
      if (task.id === id) {
        return { ...task, date: date };
      }
      return task;
    }));
    setOpenCalendarId(null);
    alert(`Date sélectionnée pour la tâche ${id} : ${date.toDateString()}`);
  }
  const toggleTaskStatus = (id) => {
    setList(list.map(task => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    }));
  }

  return (
      <>
        <h1>Todo List</h1>
        <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nouvelle Tache"
        />
        <MyButton name={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-plus" viewBox="0 0 16 16">
          <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
        </svg>} onClick={addTask}/>
        <ul>
          {list.map((task) => (
              <Task
                  key={task.id}
                  task={task}
                  onToggleStatus={() => toggleTaskStatus(task.id)}
                  onEdit={() => setEditingTaskId(task.id)}
                  onDelete={() => deleteTask(task.id)}
                  onEditChange={(e) => setEditingTaskTitle(e.target.value)}
                  onEditSubmit={Update}
                  isEditing={task.id === editingTaskId}
                  onDateSelect={(date) => selectDate(task.id, date)}
                  openCalendar={openCalendarId === task.id}
                  setOpenCalendarId={() => setOpenCalendarId(openCalendarId === task.id ? null : task.id)}
                  selectedDate={selectedDate}

              />
          ))}

        </ul>
      </>

  )
}

export default App;

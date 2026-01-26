import React, { useState } from "react";
import "./styles.css";
const columns = ["todo", "in-progress", "completed"];

export default function KanbanBoard() {
  const [task, setTask] = useState([]);
  const [label, setLabel] = useState('');
  const [editFieldId, setEditFieldId] = useState(null);
  const [editLabel, setEditLabel] = useState('');

  const addTask = () => {
    if (label.trim() === '') return;
    setTask(prev => [
      ...prev,
      {
        name: label,
        status: 0,
        id: Date.now()
      }
    ])
    setLabel('')
  };

  const moveTask = (id, direction) => {
    let state = (direction === 'left') ? -1 : 1;
    setTask(prev =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status + state }
          : task
      )
    )
  };

  const deleteTask = (id) => {
    setTask(prev =>
      prev.filter((task) => task.id !== id)
    )
  };

  const saveTitle = (id) => {
    setTask(prev =>
      prev.map((task) => task.id === id ? { ...task, name: editLabel } : task)
    )
    setEditFieldId(null)
  };

  return (
    <div>
      <h2>Kanban Board</h2>
      <input
        data-testid="task-input"
        placeholder="Enter task"
        className="inputBox"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <button
        data-testid="add-task-button"
        className="addTaskBtn"
        onClick={addTask}
      >
        Add Task
      </button>
      <div className="kanban-board">
        {columns.map((col, index) => (
          <div key={col} className="column" data-testid={`column-${col}`}>
            <h4>{col.replace("-", " ").toUpperCase()}</h4>
            {task
              .filter((t) => index === t.status)
              .map((t) =>
              (<div className='task-card' data-testid={`task-${t.id}`}>
                {editFieldId === t.id
                  ? (<input
                    autoFocus
                    data-testid={`task-title-edit-${t.id}`}
                    value={editLabel}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveTitle(t.id);
                      }
                    }}
                    onBlur={() => saveTitle(t.id)}
                    onChange={(e) => setEditLabel(e.target.value)}>
                  </input>)
                  : (<div
                    data-testid={`task-title-${t.id}`}>
                    {t.name}
                  </div>
                  )}
                <div className='task-buttons'>
                  <button data-testid={`move-left-${t.id}`} hidden={t.status === 0} className='shiftBtn' onClick={() => moveTask(t.id, 'left')}>←</button>
                  <button data-testid={`move-right-${t.id}`} hidden={t.status === 2} className='shiftBtn' onClick={() => moveTask(t.id, 'right')}>→</button>
                  <button data-testid={`edit-button-${t.id}`} className='editBtn' onClick={() => {
                    setEditFieldId(t.id)
                    setEditLabel(t.name);
                  }}>Edit</button>
                  <button data-testid={`delete-button-${t.id}`} className='deleteBtn' onClick={() => deleteTask(t.id)}>Delete</button>
                </div>
              </div>)
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import './TaskManagement.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskManagement = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Task 1', description: 'Description of Task 1', status: 'In Progress' },
        { id: 2, title: 'Task 2', description: 'Description of Task 2', status: 'Pending' },
        { id: 3, title: 'Task 3', description: 'Description of Task 3', status: 'Completed' },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskStatus, setNewTaskStatus] = useState('Pending');

    const handleEditTask = (taskId) => {
        const taskToEdit = tasks.find(task => task.id === taskId);
        setEditTaskId(taskId);
        setNewTaskName(taskToEdit.title);
        setNewTaskDescription(taskToEdit.description);
        setNewTaskStatus(taskToEdit.status);
        setShowModal(true);
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const handleAddTask = () => {
        setEditTaskId(null);
        setNewTaskName('');
        setNewTaskDescription('');
        setNewTaskStatus('Pending');
        setShowModal(true);
    };

    const handleSubmitTask = () => {
        if (editTaskId !== null) {
            const updatedTasks = tasks.map(task => {
                if (task.id === editTaskId) {
                    return {
                        ...task,
                        title: newTaskName,
                        description: newTaskDescription,
                        status: newTaskStatus,
                    };
                }
                return task;
            });
            setTasks(updatedTasks);
        } else {
            const newTask = {
                id: tasks.length + 1,
                title: newTaskName,
                description: newTaskDescription,
                status: newTaskStatus,
            };
            setTasks([...tasks, newTask]);
        }
        setEditTaskId(null);
        setNewTaskName('');
        setNewTaskDescription('');
        setNewTaskStatus('Pending');
        setShowModal(false);
    };

    const handleCancel = () => {
        setEditTaskId(null);
        setNewTaskName('');
        setNewTaskDescription('');
        setNewTaskStatus('Pending');
        setShowModal(false);
    };

    const onDragEnd = (result) => {
        // Destructure properties from result
        const { destination, source, draggableId } = result;

        // If there's no destination, return early
        if (!destination) {
            return;
        }

        // If the task is dropped back into its original position, return early
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Reorder tasks in the state
        const updatedTasks = Array.from(tasks);
        const [removedTask] = updatedTasks.splice(source.index, 1);
        updatedTasks.splice(destination.index, 0, removedTask);

        setTasks(updatedTasks);
    };

    return (
        <div className="task-management">
            <div className="task-header">
                <h1>Task Management</h1>
                {showModal && (
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                )}
            </div>
            {tasks.length === 0 ? (
                <div className="no-tasks-message">
                    <p>No tasks assigned.</p>
                </div>
            ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <div className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
                                {tasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={`task-${task.id}`} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="task-item"
                                            >
                                                <h2>{task.title}</h2>
                                                <p>{task.description}</p>
                                                <div className="task-footer">
                                                    <p>Status: {task.status}</p>
                                                    <button onClick={() => handleEditTask(task.id)}>Edit</button>
                                                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
            <div className="add-task">
                <button onClick={handleAddTask}>Add Task</button>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{editTaskId !== null ? 'Edit Task' : 'Add New Task'}</h2>
                        <div className="form-group">
                            <label htmlFor="taskName">Task Name</label>
                            <input
                                type="text"
                                id="taskName"
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskDescription">Task Description</label>
                            <textarea
                                id="taskDescription"
                                value={newTaskDescription}
                                onChange={(e) => setNewTaskDescription(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskStatus">Task Status</label>
                            <select
                                id="taskStatus"
                                value={newTaskStatus}
                                onChange={(e) => setNewTaskStatus(e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="modal-actions">
                            <button onClick={handleSubmitTask}>Submit</button>
                            <button onClick={handleCancel} type="button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskManagement;

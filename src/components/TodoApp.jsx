import React, { useState, useEffect } from 'react';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetch('https://run.mocky.io/v3/cb74646f-0bf9-4ba8-a167-d652a413c74b')
            .then(res => res.json())
            .then(data => setTasks(data));
    }, []);

    const addTask = () => {
        if (newTask.trim() === '') return;
        setTasks([...tasks, { id: tasks.length + 1, task: newTask, completed: false }]);
        setNewTask('');
    };

    const toggleComplete = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((_, i) => _.id !== id);
        setTasks(updatedTasks);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    const viewTaskStatus = (status) => {
        setFilter(status);
    }

    const taskCount = tasks.length;
    const completedCount = tasks.filter(task => task.completed).length;

    const sortList = () => {
        const updated = [...tasks].sort((a, b) => a.task.localeCompare(b.task));
        setTasks(updated);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">To-Do List</h1>

            <div className="h-[80vh] overflow-y-auto max-w-lg mx-auto bg-white px-6 pb-6 pt-3 rounded-lg shadow-md">
                <div className='sticky top-0 bg-white pb-1'>
                    <div className="mb-4 flex">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Add a new task"
                            className="flex-grow border border-[#5DA1E4] outline-[#BFDBF7] rounded-l px-4 py-2"
                        />
                        <button
                            onClick={addTask}
                            className="bg-[#5DA1E4] hover:bg-[#BFDBF7] cursor-pointer text-white px-4 py-2 rounded-r">
                            Add Task
                        </button>
                    </div>

                    <div className='flex items-center justify-between m-5'>
                        <div className="text-center font-medium">
                            <p>Total Tasks: {taskCount}</p>
                            <p>Completed: {completedCount}</p>
                        </div>
                        <select name="status-selector" id="status-selector" className='font-medium border-solid border-2 border-[#5DA1E4] rounded outline-[#BFDBF7] cursor-pointer' onChange={(e) => viewTaskStatus(e.target.value)}>
                            <option value="all" className='font-medium'>All Tasks</option>
                            <option value="pending" className='font-medium'>Pending</option>
                            <option value="completed" className='font-medium'>Completed</option>
                        </select>
                    </div>

                    <div>
                        <button
                            onClick={sortList}
                            className="bg-[#5DA1E4] hover:bg-[#BFDBF7] cursor-pointer text-white px-4 py-2 rounded-r">
                            Sort
                        </button>
                    </div>
                </div>

                {filteredTasks.length === 0 ? (
                    <p className="text-center text-gray-500">No tasks available</p>
                ) : (
                    <ul className="space-y-3">
                        {filteredTasks.map((task, index) => (
                            <li key={index} className="flex justify-between items-center p-3 bg-gray-100 rounded">
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(index)}
                                        className='w-4 h-4 rounded-lg focus:ring-blue-500 cursor-pointer'
                                    />
                                    <span className={task.completed ? 'line-through text-gray-400' : ''}>
                                        {task.task}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="text-red-500 hover:text-red-100">
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TodoApp;

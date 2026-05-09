import React from 'react'
import { useTaskStore } from '../store/useTaskStore';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = () => { 
  const {authUser} = useAuthStore();
  const {fetchMyTasks, tasks, loading,
     createTask, createTaskLoading, createTaskError, 
      updateTask, updateTaskLoading, updateTaskError,
       deleteTask, deleteTaskLoading, deleteTaskError } = useTaskStore();

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
      return;
    }
    try{
       fetchMyTasks();  
    }catch(error){
      console.error('Error fetching tasks:', error);
      toast.error('Error fetching tasks');
    }
  }, [authUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim().length<3 || description.trim().length<5) {
      toast.error('Title and description are required');
      return;
    }
      if (editingTask) {
        updateTask(editingTask._id, title, description);
      } else {
        createTask(title, description);
      } 
      setTitle('');
      setDescription('');
      setEditingTask(null);
      // toast.success(`Task ${editingTask ? 'updated' : 'created'} successfully!`);
  
  };

  const handleEdit = (task) => {
      setTitle(task.title);
      setDescription(task.description);
      setEditingTask(task);
  };

  const handleDelete = (taskId) => {
      deleteTask(taskId);
  };

  if(!authUser) {
   navigate('/login');
   return null;
  }

  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50"> 
        <div className="text-gray-500 text-lg">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl mb-4 text-gray-800">
            {editingTask ? 'Update Task' : 'Create New Task'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                placeholder="Enter task description"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingTask ? 'Update Task' : 'Add Task'}
              </button>
              {editingTask && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingTask(null);
                    setTitle('');
                    setDescription('');
                  }}
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-gray-800">Your Tasks</h2>

          {tasks.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              No tasks yet. Create your first task above!
            </div>
          ) : (
            tasks.map(task => (
              <div key={task._id} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl mb-2 text-gray-800">{task.title}</h3>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


export default Home
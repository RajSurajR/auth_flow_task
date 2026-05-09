import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';
import { useTaskStore } from '../store/useTaskStore';
import { toast } from 'react-toastify';

export default function AllTasks() {
  const {allTasks, fetchAllTasksAdmin, loading,
     deleteTaskAdmin, deleteTaskLoading, deleteTaskError} = useTaskStore();
  const {authUser} = useAuthStore();

  const navigate = useNavigate();
  const [allTasksWithUsers, setAllTasksWithUsers] = useState([]);

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
      return;
    }
    console.log('Auth User:', authUser);

    if (authUser.role !== 'admin') {
      navigate('/tasks');
      return;
    }
    try{
      fetchAllTasksAdmin();
    }catch(error){
      toast.error(error.message || 'Error fetching all tasks');
      console.error('Error fetching all tasks:', error);
    }
  }, [authUser, navigate]);

  const handleDelete = (taskId) => {
    if(window.confirm('Are you sure you want to delete this task?')) {
        deleteTaskAdmin(taskId);
    }
  };



  if(!authUser){
    navigate('/login');
    return null;
  }

  if (!authUser.role || authUser.role !== 'admin') {
    navigate('/');
     return null;
  }

  if(loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl mb-6 text-gray-800">All Tasks (Admin View)</h2>

        {allTasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            No tasks in the system yet.
          </div>
        ) : (
          <div className="space-y-4">
            {allTasks.map(task => (
              <div key={task._id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl mb-2 text-gray-800">{task.title}</h3>
                    <p className="text-gray-600 mb-3">{task.description}</p>

                    <div className="flex gap-6 text-sm text-gray-500">
                      <div>
                        <span className="font-semibold">User:</span> {task.user.name }
                      </div>
                      <div>
                        <span className="font-semibold">Email:</span> {task.user.email}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

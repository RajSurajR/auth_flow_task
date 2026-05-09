import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const [logoutLoad, setLogoutLoad] = useState(false);
  const navigate = useNavigate();

  const {logout, authUser} = useAuthStore();

  const handleLogout = () => {
    try{
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };


  return (<nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Task Manager</div>

          <div className="flex gap-4 justify-between items-center">
            {authUser && (
              <button
              onClick={()=> navigate("/")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                My Tasks
              </button>
            )}

            {authUser?.role === 'admin' && (
              <button
                onClick={() => navigate('/all-tasks')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                All Tasks
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            {authUser && (
              <>
              <span className="text-gray-700">Welcome, {authUser.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                Logout
              </button>
              </>
            )}
          </div>
        </div>
      </nav>
  )
}

export default Navbar
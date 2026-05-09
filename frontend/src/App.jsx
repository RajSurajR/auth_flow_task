import { Routes, Route, Navigate} from "react-router-dom"
import Home from './pages/Home'
import AllTasks from "./pages/AllTasks"
import Signup from './pages/Signup'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
import { useAuthStore } from "./store/useAuthStore"
import Navbar from "./components/Navbar"
import { use } from "react"
import { useEffect } from "react"

const App = () => {
  const {authUser, fetchProfile, loading} = useAuthStore();

  useEffect(() => {
    if (!authUser) {
      fetchProfile();
    }
  }, [authUser, fetchProfile]);

  return (
    <>
    {loading ? 
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    :
      <div className="h-screen flex flex-col">
        <Navbar/>
        <Routes>
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login"/>} />
          <Route path="/all-tasks" element={(authUser && authUser.role === 'admin') ? <AllTasks /> : <Navigate to="/"/>} />
          {/* admin protect route */}
        </Routes>
        <ToastContainer/>
      </div>
      }
    </>
  )
}

export default App
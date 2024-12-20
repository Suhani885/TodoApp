import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Todo from './pages/Todo.jsx';
import Register from './pages/Register.jsx';
import Admin from './pages/Admin.jsx';
import Dashboard from './pages/Dashboard.jsx'
import Manager from './pages/Manager.jsx'

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/todo" element={<Todo />} />
      </Routes>
    </>

  )
}

export default App


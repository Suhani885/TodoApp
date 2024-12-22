import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

// const Dashboard = () => {
//   const user = useSelector((state) => state.auth?.user);
//   const [tasks, setTasks] = useState([]);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/tasks?userId=${user.id}`
//       );
//       setTasks(response.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

// const roleContent = () => {
//   } else {
//     return (
//       <div className="p-4 mt-8">
//         <div className="bg-pink-50 p-6 rounded-2xl shadow-md">
//           <h3 className="text-3xl mb-6 font-bold text-gray-800">My Tasks</h3>
//           {/* <ul className="list-disc list-inside text-gray-600">
//             {tasks.length > 0 ? (
//               tasks.map((task) => (
//                 <li key={task.id}>
//                   {task.title} -{" "}
//                   <span
//                     className={
//                       task.completed ? "text-green-600" : "text-red-600"
//                     }
//                   >
//                     {task.completed ? "Completed" : "Pending"}
//                   </span>
//                 </li>
//               ))
//             ) : (
//               <p>No tasks yet.</p>
//             )}
//           </ul> */}
//           <button
//             onClick={() => navigate("/todo")}
//             className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white rounded-lg px-4 py-2 mt-4"
//           >
//             View All Tasks
//           </button>
//         </div>
//       </div>
//     );
//   }
// };

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const roleContent = () => {
    if (user?.role === "Admin") {
      return (
        <div className="p-4 mt-8">
          <div className="bg-pink-50 p-8 rounded-2xl shadow-md">
            <h3 className="mt-2 text-2xl font-bold text-gray-800">
              User Role Management
            </h3>
            <p className="mt-2 mb-7 text-gray-600">
              Get started and manage roles of all using DoBeeDo.
            </p>
            <Link to="/admin">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
              >
                Start Now
              </button>
            </Link>
          </div>
        </div>
      );
    } else if (user?.role === "Manager") {
      return (
        <div className="p-4 mt-8">
          <div className="bg-pink-50 p-8 rounded-2xl shadow-md">
            <h3 className="mt-2 text-2xl font-bold text-gray-800">
              User Permissions Management
            </h3>
            <p className="mt-2 mb-7 text-gray-600">
              Get started and assign user permissions for DoBeeDo.{" "}
            </p>
            <Link to="/manager">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
              >
                Start Now
              </button>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-4 mt-8">
          <div className="bg-pink-50 p-6 rounded-2xl shadow-md">
            <h3 className="text-3xl mb-6 font-bold text-gray-800">My Tasks</h3>
            {/* <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-600 text-sm">Completed Tasks</p>
                <p className="text-2xl font-bold text-green-600">
                  {completedTasks}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-600 text-sm">Pending Tasks</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {pendingTasks}
                </p>
              </div>
            </div> */}
            <Link to="/todo">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 flex flex-col">
      <Header />

      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl text-xl-sm font-bold text-gray-800">
              Welcome, {user?.fName} !
            </h2>
            <p className="text-gray-600 mt-2">{user?.role} Dashboard</p>
          </div>

          {roleContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Users,
  Package,
  BarChart3,
  Settings,
  Home,
  LogOut,
  Menu
} from 'lucide-react';
import { useDispatch } from 'react-redux';
// import { removeUser } from '../utils/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { removeAdmin } from '../utils/adminSlice';

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAdminLogOut = async () => {
    try {
      await axios.post(BASE_URL + "admin/logout", {}, { withCredentials: true })
      dispatch(removeAdmin())
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {/* Hamburger Menu Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg sm:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed h-full w-64 z-50 bg-gray-900 text-white p-4 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } sm:translate-x-0`}
      >
        <div className="flex items-center gap-2 mb-8">
          <Package className="h-8 w-8 text-blue-500" />
          <h1 className="text-xl font-bold">StockMaster</h1>
        </div>

        <nav className="space-y-2">
          <ul>
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 p-3 rounded-lg w-full 
                  ${location.pathname === '/dashboard' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className={`flex items-center gap-2 p-3 rounded-lg w-full 
                  ${location.pathname === '/users' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
              >
                <Users className="h-5 w-5" />
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={`flex items-center gap-2 p-3 rounded-lg w-full 
                  ${location.pathname === '/products' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
              >
                <Package className="h-5 w-5" />
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/sales"
                className={`flex items-center gap-2 p-3 rounded-lg w-full 
                  ${location.pathname === '/sales' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
              >
                <BarChart3 className="h-5 w-5" />
                Sales
              </Link>
            </li>
            {/* <li>
              <Link
                to="/settings"
                className={`flex items-center gap-2 p-3 rounded-lg w-full 
                  ${location.pathname === '/settings' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </li> */}
          </ul>
        </nav>

        <div className="absolute bottom-4 w-full left-0 px-4">
          <button onClick={handleAdminLogOut} className="flex items-center gap-2 text-gray-400 hover:text-white w-full">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10  sm:hidden "
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
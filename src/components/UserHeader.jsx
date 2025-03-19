import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, BarChart2 } from 'lucide-react'; // Icons for Logout and Sales
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';

const UserHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation()

    const loggedInUser = useSelector((store) => store.user)

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "logout", {}, { withCredentials: true })
            dispatch(removeUser())
            navigate('/login')
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <header className="bg-white shadow-sm p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between">
                {/* Logo or Brand Name */}
                <Link to="/user/products">
                    <div className="flex items-center gap-2 mb-4 sm:mb-0">
                        <h1 className="text-xl font-semibold text-gray-800">StockMaster</h1>
                    </div>
                </Link>
                {/* Navigation Links */}
                {location.pathname !== '/login' && <div className="flex items-center gap-4">
                    {/* Sales Link */}
                    <p className='font-bold text-blue-700'> Welcome, {loggedInUser?.firstName}</p>
                    <Link
                        to="/user/sales"
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition duration-300"
                    >
                        <BarChart2 className="h-5 w-5" />
                        <span className="hidden sm:block">Sales</span>
                    </Link>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition duration-300"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="hidden sm:block">Logout</span>
                    </button>
                </div>}
            </div>
        </header>
    );
};

export default UserHeader;
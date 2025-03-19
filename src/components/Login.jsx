import axios from 'axios';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { addAdmin } from '../utils/adminSlice';
// import { AuthContext } from './AuthContext';

const Login = () => {
    const navigate = useNavigate();
    //   const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role is 'user'
    const [error, setError] = useState('');
    const dispatch = useDispatch()
    const timer = useRef(null)



    const handleLogin = async () => {
        // e.preventDefault();

        try { // Basic validation
            if (!email || !password) {
                setError('Please fill in all fields.');
                return;
            }
            // Simulate login logic (replace with actual API call)


            const userLogin = await axios.post(BASE_URL + "login", { emailId: email, password: password }, { withCredentials: true })
            dispatch(addUser(userLogin?.data))
            navigate('/user/products')
            setError('')



        } catch (err) {
            console.log(err)
            setError(err.response.data)

            navigate('/login')

        }
    };

    const handleAdminLogin = async () => {
        // e.preventDefault();

        try { // Basic validation
            if (!email || !password) {
                setError('Please fill in all fields.');
                return;
            }
            // Simulate login logic (replace with actual API call)

            const adminLogin = await axios.post(BASE_URL + "admin/login", { adminEmailId: email, adminPassword: password }, { withCredentials: true })
            dispatch(addAdmin(adminLogin?.data))
            navigate('/dashboard')
            setError('')



        } catch (err) {
            console.log(err)
            setError(err.response.data)

            navigate('/login')

        }
    };

    if (timer.current) {
        clearInterval(timer.current)
    }

    timer.current = setTimeout(() => {
        setError('')
    }, 3000)

    useEffect(() => {
        // handleLogin()
        return () => {
            // clearTimeout(toastTimerRef.current)
            clearTimeout(timer.current)

            // clearTimeout(timer)

        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome to StockMaster</h1>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

                {/* Email Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {/* Role Selector */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* Error Message */}
                <p className="text-red-500 text-sm mb-4">{error}</p>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    onClick={role === 'user' ? handleLogin : handleAdminLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
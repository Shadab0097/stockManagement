import React, { useEffect, useRef, useState } from 'react';
import { UserPlus, Edit2, Trash2, X } from 'lucide-react';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUserManagement } from '../utils/userManagementSlice';
import Toast from './Toast';


const UserManagement = () => {
  const dispatch = useDispatch();
  const getUser = useSelector((store) => store.userManagements); // Get users from Redux store
  const [render, setRender] = useState(false)
  const [error, setError] = useState()
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [getUserId, setGetUserId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    role: 'user',
  });
  const [isUpdateTrue, setIsUpdateTrue] = useState(false)
  const [isToastVisible, setIsToastVisible] = useState(false);
  const timer = useRef(null)

  const hideToast = () => {
    setIsToastVisible(false);
  };

  // Fetch all users
  const getAllUser = async () => {
    // if (getUser) return
    setError('')
    try {
      const response = await axios.get(BASE_URL + 'admin/getalluser', { withCredentials: true });
      // console.log(response)
      dispatch(addUserManagement(response?.data.data)); // Dispatch to Redux store
      // setUsers(getUser)

    } catch (err) {
      console.log(err);
      setError(err.response.data)
    }
  };

  useEffect(() => {
    getAllUser();

    return () => {
      // clearTimeout(toastTimerRef.current)
      clearTimeout(timer.current)

      // clearTimeout(timer)

    }
  }, [render]);
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // if (!getUser) return;
  // Handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      if (editingUser) {
        setError('')
        // Update user
        const response = await axios.patch(
          BASE_URL + 'admin/update/' + getUserId,
          formData,
          { withCredentials: true }
        );
        setIsUpdateTrue(true)
        if (response.status === 200) {
          setIsToastVisible(true);
          setEditingUser(false)

        }

        // dispatch(addUserManagement(response?.data)); // Dispatch updated user to Redux store
        setRender(!render)
      } else {
        // Add new user
        setIsUpdateTrue(false)
        const response = await axios.post(BASE_URL + 'adduser', formData, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsToastVisible(true);

        }

        // dispatch(addUserManagement(response?.data)); // Dispatch new user to Redux store
        setRender(!render)
      }
      setShowModal(false); // Close modal
      setFormData({ firstName: '', lastName: '', emailId: '', password: '', role: 'user' }); // Reset form
    } catch (err) {
      console.log(err);
      setError(err.response.data)
      setIsUpdateTrue(false)

    }
  };

  if (timer.current) {
    clearInterval(timer.current)
  }

  timer.current = setTimeout(() => {
    setError('')
  }, 3000)

  // Handle edit user
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
      password: user.password,
      role: user.role,
    });
    setGetUserId(user._id);
    setShowModal(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ firstName: '', lastName: '', emailId: '', password: '', role: 'user' });
  };

  // Fetch users on component mount


  if (!getUser) return <div>Loading...</div>; // Show loading state if getUser is not available

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <UserPlus className="h-5 w-5" />
            Add New User
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              {!getUser ? <h1 className='font-bold text-gray-600 m-auto'> No User Yet</h1> : <tbody className="bg-white divide-y divide-gray-200">
                {getUser?.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          {user.firstName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.emailId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        // onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>}
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h2>
                <button onClick={handleCloseModal}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                      autocomplete="new-password"
                    />
                  </div>
                </div>
                <p className="text-red-500 text-sm mb-4">{error}</p>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {editingUser ? 'Update' : 'Add'} User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Toast
        message={isUpdateTrue ? "User Updated Successfully" : " User Added Successfully"}
        isVisible={isToastVisible}
        onClose={hideToast}
      />
    </>
  );
};

export default UserManagement;
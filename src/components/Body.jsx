import { Outlet, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../utils/constant"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { addAdmin } from "../utils/adminSlice"
import { useEffect, useMemo } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import UserHeader from "./UserHeader"

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const fetchUserData = async () => {
        try {
            // First try fetching admin data
            const adminData = await axios.get(BASE_URL + "admin/profile/view", { withCredentials: true })
            dispatch(addAdmin(adminData.data))
            navigate('/dashboard')
        } catch (err) {
            if (err.response.status === 400) {
                // If admin data fails, try fetching user data
                navigate('/login')
                try {
                    const userData = await axios.get(BASE_URL + "profile/view", { withCredentials: true })
                    dispatch(addUser(userData.data))
                    navigate('/user/products')
                } catch (userErr) {
                    if (userErr.response.status === 401) {
                        navigate('/login')
                    }
                    console.error(userErr.message)
                }
            } else {
                console.error(err.message)
            }
        }
    }
    const hideSidebarPaths = useMemo(() => ['/user/products', '/login', '/user/sales'], []);
    const hideUserHeaderrPaths = useMemo(() => ['/user/products', '/login', '/user/sales'], []);

    const isSidebarVisible = useMemo(() => !hideSidebarPaths.includes(location.pathname), [location.pathname, hideSidebarPaths]);



    useEffect(() => {
        fetchUserData()


    }, []) // No dependency required since it's fetching once on mount

    return (
        <div>
            <div className="flex h-screen">
                {!hideSidebarPaths.includes(location.pathname) && <Sidebar />}
                <div className={`flex-1 ${isSidebarVisible ? 'sm:ml-64 ml-0' : 'ml-0'}`}>
                    {/* {!hideSidebarPaths.includes(location.pathname) && } */}
                    {hideUserHeaderrPaths.includes(location.pathname) ? <UserHeader /> : <Header />}


                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Body

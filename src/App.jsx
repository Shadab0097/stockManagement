import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import ProductManagement from './components/ProductManagement';
import SalesAnalytics from './components/SalesAnalytics';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Login from './components/Login';
import UserProductPage from './components/UserProductPage';
import Body from './components/Body';
import UserSalesPage from './components/UserSalesPage';

function App() {
  // const user = useSelector((store) => store.user)
  return (
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Body />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/sales" element={<SalesAnalytics />} />
            <Route path="/user/products" element={<UserProductPage />} />
            <Route path="/user/sales" element={<UserSalesPage />} />

            <Route path="*" element={<div>Page not found</div>} />
          </Route>
        </Routes>

      </BrowserRouter>
    </Provider>
  );
}

export default App;





// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { AuthProvider, AuthContext } from './AuthContext';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import Dashboard from './components/Dashboard';
// import UserManagement from './components/UserManagement';
// import ProductManagement from './components/ProductManagement';
// import SalesAnalytics from './components/SalesAnalytics';
// import LandingPage from './components/LandingPage';
// import UserProductPage from './components/UserProductPage'; // New component for User UI

// function App() {
//   const { user } = useContext(AuthContext);

//   return (
//     <Router>
//       <Routes>
//         {/* Landing Page (Public) */}
//         <Route path="/" element={<LandingPage />} />

//         {/* Admin Routes */}
//         {user?.role === 'admin' && (
//           <Route
//             path="/admin/*"
//             element={
//               <div className="flex h-screen bg-gray-100">
//                 <Sidebar />
//                 <div className="flex-1 sm:ml-64 ml-0">
//                   <Header />
//                   <main className="overflow-auto sm:h-[calc(100vh-4rem)] h-screen">
//                     <Routes>
//                       <Route path="/dashboard" element={<Dashboard />} />
//                       <Route path="/users" element={<UserManagement />} />
//                       <Route path="/products" element={<ProductManagement />} />
//                       <Route path="/sales" element={<SalesAnalytics />} />
//                       <Route path="*" element={<div>Page not found</div>} />
//                     </Routes>
//                   </main>
//                 </div>
//               </div>
//             }
//           />
//         )}

//         {/* User Routes */}
//         {user?.role === 'user' && (
//           <Route
//             path="/user/*"
//             element={
//               <div className="flex h-screen bg-gray-100">
//                 <Header />
//                 <main className="overflow-auto h-screen p-4">
//                   <Routes>
//                     <Route path="/products" element={<UserProductPage />} />
//                     <Route path="*" element={<div>Page not found</div>} />
//                   </Routes>
//                 </main>
//               </div>
//             }
//           />
//         )}

//         {/* Redirect to Landing Page if Not Authenticated */}
//         {!user && <Route path="*" element={<Navigate to="/" />} />}
//       </Routes>
//     </Router>
//   );
// }

// export default function AppWrapper() {
//   return (
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   );
// }

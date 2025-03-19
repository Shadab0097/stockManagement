import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';

const Header = ({ currentView, toggleSidebar }) => {

  const getPageTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Dashboard';
      case 'users':
        return 'User Management';
      case 'products':
        return 'Product Management';
      case 'sales':
        return 'Sales Analytics';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="bg-white shadow-sm p-4">
      <div className="flex  items-center justify-between">
        {/* Left Section: Hamburger Menu and Title */}
        <div className="flex items-center gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
          {/* Hamburger Menu Button for Mobile */}
          <button
            onClick={toggleSidebar}
            className="sm:hidden p-2 bg-gray-900 text-white rounded-lg"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Page Title */}
          <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
        </div>

        {/* Middle Section: Search Bar */}
        {/* <div className="w-full sm:w-auto mb-4 sm:mb-0 justify-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
        </div> */}

        {/* Right Section: Notifications and Profile */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          {/* Notifications */}
          <button className="relative">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="font-medium hidden sm:block">Md Imran</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
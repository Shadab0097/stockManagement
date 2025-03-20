import React, { useEffect, useState } from 'react';
import { Users, Package, DollarSign, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRecentSales, addTotalSales } from '../utils/recentSalesSlice';

const StatCard = ({ icon, title, value, trend }) => {

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <p className={`text-sm mt-2 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {/* {trend >= 0 ? '+' : ''}{trend}% from last month */}
          </p>
        </div>
        <div className="bg-blue-100 p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

const RecentSales = () => {
  const dispatch = useDispatch();
  const sales = useSelector((store) => store.recentSales);

  const getAllSales = async () => {
    try {
      const recentSales = await axios.get(BASE_URL + 'admin/getallsale', { withCredentials: true });
      dispatch(addRecentSales(recentSales.data.allSales));
    } catch (err) {
      console.log(err);
    }
  };

  // Format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero
    return `${year}-${month}-${day}`;
  };

  // Check if a sale was made today
  const isToday = (dateString) => {
    const saleDate = new Date(dateString).toDateString();
    const today = new Date().toDateString();
    return saleDate === today;
  };

  // Sort sales by date (most recent first)
  const sortedSales = sales
    ? [...sales].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  useEffect(() => {
    getAllSales();
  }, []);

  if (!sales) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold mb-6">Recent Sales</h2>
      {!sales ? <h1 className='font-bold text-gray-600 m-auto'> No Sales Yet</h1> : <div className="overflow-x-auto max-h-96 overflow-y-auto"> {/* Scrollable container */}
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b sticky top-0 bg-white">
              <th className="pb-4 px-4">Sold By</th>
              <th className="pb-4 px-4">Product</th>
              <th className="pb-4 px-4">Quantity</th>
              <th className="pb-4 px-4">Customer</th>
              <th className="pb-4 px-4">Address</th>
              <th className="pb-4 px-4">Amount</th>
              <th className="pb-4 px-4">Payment Mode</th> {/* New column */}
              <th className="pb-4 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedSales?.map((sale) => {
              const saleDate = formatDate(sale.createdAt);
              const today = isToday(sale.createdAt);

              return (
                <tr
                  key={sale._id}
                  className={`border-b hover:bg-gray-50 transition-colors ${today ? 'bg-green-50' : ''}`}
                >
                  <td className="py-4 px-4">{sale.sellerName}</td>
                  <td className="py-4 px-4">{sale.productName}</td>
                  <td className="py-4 px-4">{sale.salesQuantity}</td>
                  <td className="py-4 px-4">{sale.buyerName}</td>
                  <td className="py-4 px-4">{sale.buyerAddress}</td>
                  <td className="py-4 px-4">₹{sale.productPrice}</td>
                  <td className="py-4 px-4">{sale.paymentMode || "None"}</td> {/* New column */}
                  <td className="py-4 px-4">
                    {saleDate}
                    {today && (
                      <span className="ml-2 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                        Today
                      </span>
                    )} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>}
    </div>
  );
};

const Dashboard = () => {
  const [totaldata, setTotalData] = useState({
    totalSales: 0,
    totalProducts: 0,
    totalPayment: 0

  })

  const totalData = async () => {
    const data = await axios.get(BASE_URL + 'total-sales', { withCredentials: true })
    console.log(data)
    // dispatch(addTotalSales(data.data))
    setTotalData(data?.data)
  }
  useEffect(() => {
    totalData()

  }, []);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            icon={<Users className="h-6 w-6 text-blue-600" />}
            title="Total Sales"
            value={totaldata.totalSales}
            trend={12}
          />
          <StatCard
            icon={<Package className="h-6 w-6 text-blue-600" />}
            title="Total Products"
            value={totaldata.totalProducts}
          // trend={8}
          />
          <StatCard
            icon={<DollarSign className="h-6 w-6 text-blue-600" />}
            title="Total Revenue"
            value={`₹${totaldata.totalPayment}`}
            trend={15}
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
            title="Growth"
            value="%"
            trend={-5}
          />
        </div>

        <RecentSales />
      </div>
    </>
  );
};

export default Dashboard;
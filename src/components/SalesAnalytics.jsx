import React, { useEffect, useState } from 'react';
import { BarChart3, DollarSign, Package, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addSales } from '../utils/salesDataSlice';

const SalesAnalytics = () => {
  const dispatch = useDispatch()
  const salesData = useSelector((store) => store.salesData)
  // if (!salesData) return
  // const [salesData] = useState([
  //   { id: 1, product: 'Laptop Pro', sales: 145, revenue: 188550, growth: 12 },
  //   { id: 2, product: 'Wireless Mouse', sales: 289, revenue: 14161, growth: 23 },
  //   { id: 3, product: 'Monitor 4K', sales: 176, revenue: 105424, growth: 8 },
  //   { id: 4, product: 'Keyboard Pro', sales: 211, revenue: 21100, growth: 15 },
  //   { id: 5, product: 'USB-C Hub', sales: 167, revenue: 8350, growth: -5 },
  // ]);

  // console.log(getSales)

  const getSalesSummary = async () => {
    try {
      const summary = await axios.get(BASE_URL + 'sales-summary', { withCredentials: true })

      dispatch(addSales(summary.data))
    } catch (err) {
      console.log(err)
    }
  }







  // Calculate growth for each product and combined average growth
  const calculateGrowth = () => {
    if (!salesData?.productSales) return { productGrowth: [], averageGrowth: 0 };

    // Example: Assume salesData includes previous sales data
    const productGrowth = salesData.productSales.map((item) => {
      const currentSales = item.totalSales;
      const previousSales = item.previousSales || 0; // Default to 0 if no previous sales data

      // Calculate growth
      const growth = previousSales === 0 ? 0 : ((currentSales - previousSales) / previousSales) * 100;

      return {
        ...item,
        growth: growth.toFixed(1), // Round to 1 decimal place
      };
    });

    // Calculate combined average growth
    const totalGrowth = productGrowth.reduce((sum, item) => sum + parseFloat(item.growth), 0);
    const averageGrowth = totalGrowth / productGrowth.length;

    return { productGrowth, averageGrowth: averageGrowth.toFixed(1) }; // Round to 1 decimal place
  };

  useEffect(() => {
    getSalesSummary();
  }, []);

  const { productGrowth, averageGrowth } = calculateGrowth();
  // if (!salesData) return
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sales Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">₹{salesData?.totalPayment || 0}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Sales</p>
              <h3 className="text-2xl font-bold mt-1">{salesData?.totalSales || 0} units</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Growth</p>
              <h3 className="text-2xl font-bold mt-1">{averageGrowth || 0}%</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Product Performance</h2>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-500">Last 30 days</span>
          </div>
        </div>

        <div className="space-y-4">
          {productGrowth && productGrowth.length > 0 ? (
            productGrowth.map((item) => {
              // Ensure item is an object and has the required properties
              if (!item || typeof item !== 'object') return null;

              const { productName, totalSales, totalPayment, growth } = item;

              // Ensure growth, totalSales, and totalPayment are valid numbers
              const formattedGrowth = typeof growth === 'number' ? growth.toFixed(1) : '0.0';
              const formattedSales = typeof totalSales === 'number' ? totalSales.toLocaleString() : '0';
              const formattedPayment = typeof totalPayment === 'number' ? totalPayment.toLocaleString() : '0';

              return (
                <div key={item.productId} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{productName || 'N/A'}</span>
                    <span className={`text-sm font-semibold ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formattedGrowth}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-600 rounded-full"
                          style={{ width: `${Math.abs(parseFloat(formattedSales))}%` }} // Set progress bar width based on growth
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formattedSales} sales
                    </div>
                    <div className="text-sm font-medium">
                      ₹{formattedPayment}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-gray-500">No sales data available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
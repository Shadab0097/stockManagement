// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../utils/constant';

// const UserSalesPage = () => {
//     const [salesData, setSalesData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [page, setPage] = useState(1);
//     const [hasMore, setHasMore] = useState(true);

//     const tableContainerRef = useRef(null);

//     // Fetch sales data from the API
//     const fetchSalesData = useCallback(async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}user/sale?page=${page}&limit=5`, {
//                 withCredentials: true,
//             });
//             const newSales = response?.data?.userSales || [];

//             if (newSales.length > 0) {
//                 setSalesData((prevSales) => [...prevSales, ...newSales]);
//             } else {
//                 setHasMore(false);
//             }
//             setLoading(false);
//         } catch (err) {
//             console.error('Error fetching sales data:', err);
//             setError('Failed to fetch sales data. Please try again later.');
//             setLoading(false);
//         }
//     }, [page]);

//     // Initial data fetch
//     useEffect(() => {
//         fetchSalesData();
//     }, [fetchSalesData]);

//     // Infinite scroll logic within table container
//     useEffect(() => {
//         const tableContainer = tableContainerRef.current;

//         const handleScroll = () => {
//             if (
//                 tableContainer &&
//                 tableContainer.scrollTop + tableContainer.clientHeight >=
//                 tableContainer.scrollHeight - 20 &&
//                 !loading &&
//                 hasMore
//             ) {
//                 setPage((prevPage) => prevPage + 1);
//             }
//         };

//         if (tableContainer) {
//             tableContainer.addEventListener('scroll', handleScroll);
//         }

//         return () => {
//             if (tableContainer) {
//                 tableContainer.removeEventListener('scroll', handleScroll);
//             }
//         };
//     }, [loading, hasMore]);

//     if (loading && page === 1) {
//         return <div className="p-4">Loading...</div>;
//     }

//     if (error) {
//         return <div className="p-4 text-red-500">{error}</div>;
//     }

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-6">Your Sales</h1>

//             <div className="bg-white rounded-lg shadow-sm border border-gray-300">
//                 <div
//                     ref={tableContainerRef}
//                     className="border border-gray-300 overflow-y-auto overflow-x-auto"
//                     style={{
//                         height: '400px', // ✅ Explicit height to ensure scrolling
//                         display: 'block', // ✅ Avoid flexbox conflicts
//                     }}
//                 >
//                     <table className="w-full">
//                         <thead className="sticky top-0 bg-gray-50 z-10">
//                             <tr>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Seller Name
//                                 </th>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Product Name
//                                 </th>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Quantity
//                                 </th>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Price
//                                 </th>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Buyer Name
//                                 </th>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Buyer Address
//                                 </th>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Empty Received
//                                 </th>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Payment Mode
//                                 </th>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Created At
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {salesData.map((sale, index) => (
//                                 <tr key={index}>
//                                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
//                                         {sale.sellerName}
//                                     </td>
//                                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
//                                         {sale.productName}
//                                     </td>
//                                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
//                                         {sale.salesQuantity}
//                                     </td>
//                                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
//                                         ₹{sale.productPrice}
//                                     </td>
//                                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
//                                         {sale.buyerName}
//                                     </td>
//                                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
//                                         {sale.buyerAddress}
//                                     </td>
//                                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
//                                         {sale.emptyQuantity}
//                                     </td>
//                                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
//                                         {sale.paymentMode}
//                                     </td>
//                                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
//                                         {new Date(sale.createdAt).toLocaleDateString()}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {loading && page > 1 && <div className="p-4">Loading more sales...</div>}
//             {!hasMore && <div className="p-4 text-gray-500">No more sales to load.</div>}
//         </div>
//     );
// };

// export default UserSalesPage;





import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

const UserSalesPage = () => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const tableContainerRef = useRef(null); // Ref for the table container

    // Fetch sales data from the API
    const fetchSalesData = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}user/sale?page=${page}&limit=50`, {
                withCredentials: true,
            });
            const newSales = response?.data?.userSales || [];

            if (newSales.length > 0) {
                setSalesData((prevSales) => [...prevSales, ...newSales]);
            } else {
                setHasMore(false); // No more data to load
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching sales data:', err);
            setError('Failed to fetch sales data. Please try again later.');
            setLoading(false);
        }
    }, [page]);

    // Initial data fetch
    useEffect(() => {
        fetchSalesData();
    }, [fetchSalesData]);

    // Infinite scroll logic
    useEffect(() => {
        const tableContainer = tableContainerRef.current;

        const handleScroll = () => {
            if (
                tableContainer &&
                tableContainer.scrollTop + tableContainer.clientHeight >=
                tableContainer.scrollHeight - 100 &&
                !loading &&
                hasMore
            ) {
                setPage((prevPage) => prevPage + 1); // Load next page
            }
        };

        // Add event listener only if the container exists
        if (tableContainer) {
            tableContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (tableContainer) {
                tableContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loading, hasMore]);

    if (loading && page === 1) {
        return <div className="p-4">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Your Sales</h1>

            <div className="bg-white rounded-lg shadow-sm">
                <div
                    ref={tableContainerRef} // Attach the ref here
                    id="table-container"
                    className="overflow-x-auto overflow-y-auto"
                    style={{ maxHeight: 'calc(100vh - 200px)' }}
                >
                    {/* ... rest of the table code ... */}
                    <table className="w-full">
                        <thead className="sticky top-0 bg-gray-50 z-10">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Seller Name
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Buyer Name
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Buyer Address
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Empty Received
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment Mode
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {salesData.map((sale, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {sale.sellerName}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {sale.productName}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {sale.salesQuantity}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                        ₹{sale.productPrice}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {sale.buyerName}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {sale.buyerAddress}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {sale.emptyQuantity}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {sale.paymentMode}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(sale.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {loading && page > 1 && <div className="p-4">Loading more sales...</div>}
            {!hasMore && <div className="p-4 text-gray-500">No more sales to load.</div>}
        </div>
    );
};

export default UserSalesPage;
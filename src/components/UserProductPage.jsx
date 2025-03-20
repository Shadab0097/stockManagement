import React, { useEffect, useState } from 'react';
import { Package, Plus, X } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import Toast from './Toast';

const UserProductPage = () => {
    const [products, setProducts] = useState([
        // { id: 1, name: 'Laptop Pro', price: 1200, stock: 10 },
        // { id: 2, name: 'Wireless Mouse', price: 50, stock: 25 },
        // { id: 3, name: 'Monitor 4K', price: 600, stock: 15 },
    ]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [getId, setGetId] = useState(null)
    const [formData, setFormData] = useState({
        salesQuantity: 0,
        buyerName: '',
        buyerAddress: '',
        emptyQuantity: 0,
        mode: '',
    });

    const [isToastVisible, setIsToastVisible] = useState(false);



    const hideToast = () => {
        setIsToastVisible(false);
    };


    const getallProduct = async () => {
        try {
            const response = await axios.get(BASE_URL + 'getallproduct', { withCredentials: true })
            console.log(response)
            setProducts(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    // Open modal and set selected product
    const handleSellClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        setGetId(product._id)
    };

    // Close modal and reset form
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        setFormData({
            salesQuantity: 0,
            buyerName: '',
            buyerAddress: '',
            emptyQuantity: 0,
            mode: ''
        });
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Convert numeric fields to numbers
        const numericFields = ['emptyQuantity', 'stockQuantity', 'productPrice'];
        const parsedValue = numericFields.includes(name) ? Number(value) : value;
        const updatedValue = name === 'mode' ? value.toLowerCase() : parsedValue;

        setFormData(prev => ({
            ...prev,
            [name]: updatedValue
        }));
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!selectedProduct) return;

            // Validate form fields
            if (
                formData.salesQuantity < 1 || // Ensure sales quantity is at least 1
                formData.buyerName.trim() === '' ||
                formData.buyerAddress.trim() === '' ||
                formData.emptyQuantity < 0 || // Allow 0 but check for negative values
                formData.mode.trim() === ''
            ) {
                alert('Please fill all fields correctly');
                return;
            }

            // Handle form submission logic (e.g., API call)



            const res = await axios.post(BASE_URL + 'sale/' + getId, formData, { withCredentials: true })


            if (res.status === 200) {
                setIsToastVisible(true);

            }
            // console.log('Selling Product:', selectedProduct);
            // console.log('Form Data:', formData);

            // Close modal and reset form
            handleCloseModal();
        } catch (err) {
            console.log(err)
            setIsToastVisible(false);

        }

    };
    useEffect(() => {
        getallProduct()
        // submitSales()
    }, [])


    return (
        <>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Products</h1>

                {/* Product List */}
                {products ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Package className="h-6 w-6 text-blue-600" />
                                    <h2 className="text-lg font-semibold">{product.productName}</h2>
                                </div>
                                <span className="text-sm text-gray-500">₹{product.productPrice}</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">Stock: {product.stockQuantity}</p>
                            <button
                                onClick={() => handleSellClick(product)}
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Sell
                            </button>
                        </div>
                    ))}
                </div>
                    : <h1 className='font-bold text-gray-600 m-auto'> No Products</h1>}

                {/* Sell Product Modal */}
                {isModalOpen && selectedProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">Sell {selectedProduct.productName}</h2>
                                <button onClick={handleCloseModal}>
                                    <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    {/* Sales Quantity */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Sales Quantity</label>
                                        <input
                                            type="number"
                                            name="salesQuantity"
                                            value={formData.salesQuantity}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                            min="1"
                                        />
                                    </div>

                                    {/* Buyer Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Buyer Name</label>
                                        <input
                                            type="text"
                                            name="buyerName"
                                            value={formData.buyerName}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Buyer Address */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Buyer Address</label>
                                        <input
                                            type="text"
                                            name="buyerAddress"
                                            value={formData.buyerAddress}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Empty Quantity */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Empty Quantity</label>
                                        <input
                                            type="number"
                                            name="emptyQuantity"
                                            value={formData.emptyQuantity}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                            min="0"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
                                        <input
                                            type="text"
                                            name="mode"
                                            value={formData.mode}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                            min="0"
                                        />
                                    </div>
                                </div>

                                {/* Form Actions */}
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
                                        Sell
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
            <Toast
                message="Sale Recorded Successfully!"
                isVisible={isToastVisible}
                onClose={hideToast}
            />
        </>
    );
};

export default UserProductPage;
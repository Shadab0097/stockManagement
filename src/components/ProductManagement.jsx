
import React, { useEffect, useState } from 'react';
import { Package, Edit2, Trash2, X } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { addProduct } from '../utils/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Toast from './Toast';


const ProductManagement = () => {
  // const [products, setProducts] = useState([
  // ]);
  const [error, setError] = useState()
  const [getProductId, setGetProductId] = useState('');
  const [render, setRender] = useState(false)
  const [isUpdateTrue, setIsUpdateTrue] = useState(false)
  const [isToastVisible, setIsToastVisible] = useState(false);

  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState('');
  const [formData, setFormData] = useState({
    productName: '',
    emptyRecieved: 0,
    productPrice: '',
    stockQuantity: ''
  });
  const getProduct = useSelector((store) => store.product); // Get users from Redux store
  // console.log(getProduct)

  const getAllProduct = async () => {
    try {
      const response = await axios.get(BASE_URL + 'admin/getallproduct', { withCredentials: true });
      console.log(response)
      dispatch(addProduct(response?.data?.data)); // Dispatch to Redux store
      // setUsers(getUser); // Update local state
    } catch (err) {
      console.log(err);
      setError(err.response.data)
    }
  };

  const hideToast = () => {
    setIsToastVisible(false);
  };

  // useEffect(() => {
  //   getAllProduct();

  //   return () => {
  //     // clearTimeout(toastTimerRef.current)
  //     clearTimeout(timer.current)

  //     // clearTimeout(timer)

  //   }
  // }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert numeric fields to numbers
    const numericFields = ['emptyRecieved', 'stockQuantity', 'productPrice'];
    const parsedValue = numericFields.includes(name) ? Number(value) : value;

    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      if (editingProduct) {
        setError('')
        // Update user
        const response = await axios.patch(
          BASE_URL + 'update/product/' + getProductId,
          formData,
          { withCredentials: true }

        );
        setIsUpdateTrue(true)
        if (response.status === 200) {
          setIsToastVisible(true);

        }

        // dispatch(addUserManagement(response?.data)); // Dispatch updated user to Redux store
        setRender(!render)
      } else {
        // Add new user
        setIsUpdateTrue(false)
        setEditingProduct(false)

        const response = await axios.post(BASE_URL + 'addproduct', formData, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsToastVisible(true);

        }
        // dispatch(addUserManagement(response?.data)); // Dispatch new user to Redux store
        setRender(!render)
      }
      setShowModal(false); // Close modal
      setFormData({ productName: '', emptyRecieved: 0, productPrice: '', stockQuantity: '' }); // Reset form
    } catch (err) {
      console.log(err);
      setError(err.response.data)
      setIsUpdateTrue(false)

    }
  };


  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      productName: product.productName,
      emptyRecieved: product.emptyRecieved,
      productPrice: product.productPrice,
      stockQuantity: product.stockQuantity,

    });
    setGetProductId(product._id);
    setShowModal(true);
  };

  // const handleDelete = (productId) => {
  //   setProducts(products.filter(product => product.id !== productId));
  // };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ productName: '', emptyRecieved: 0, productPrice: '', stockQuantity: '' });
  };

  useEffect(() => {
    getAllProduct()
  }, [render])

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Package className="h-5 w-5" />
            Add New Product
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Empty
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              {!getProduct ? <h1 className='font-bold text-gray-600 m-auto'> No Products Yet</h1> : <tbody className="bg-white divide-y divide-gray-200">
                {getProduct?.map((product) => (
                  <tr key={product._id}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.productName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.emptyRecieved}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${product.productPrice}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stockQuantity > 40 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {product.stockQuantity} units
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        // onClick={() => handleDelete(product._id)}
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
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={handleCloseModal}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Empty</label>
                    <input
                      type="number"
                      name="emptyRecieved"
                      value={formData.emptyRecieved}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      name="productPrice"
                      value={formData.productPrice}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                      type="number"
                      name="stockQuantity"
                      value={formData.stockQuantity}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                      min="0"
                    />
                  </div>
                </div>
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
                    {editingProduct ? 'Update' : 'Add'} Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Toast
        message={isUpdateTrue ? "Product Updated Successfully" : " Product Added Successfully"}
        isVisible={isToastVisible}
        onClose={hideToast}
      />
    </>
  );
};

export default ProductManagement;
"use client";

import React from 'react'
import { v4 } from 'uuid';

export type ProductFormData = {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
}

type CreateProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: ProductFormData) => void;
}

const CreateProductModal = (
    {isOpen, onClose, onCreate}: CreateProductModalProps
) => {

    const [formData, setFormData] = React.useState({
        productId: v4(),
        name: '',
        price: 0,
        stockQuantity: 0,
        rating: 0
    });

    const handleCreate = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    }

    if (!isOpen) {
        return null;
    }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300"
         onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Product
            </h2>
            <form onSubmit={handleCreate} className="space-y-5">
                <div className="relative">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Product Name</label>
                    <input
                        type="text"
                        placeholder="Enter product name"
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                </div>
                <div className="relative">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Price ($)</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                        required
                    />
                </div>
                <div className="relative">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Stock Quantity</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="Available quantity"
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                        value={formData.stockQuantity}
                        onChange={(e) => setFormData({...formData, stockQuantity: Number(e.target.value)})}
                        required
                    />
                </div>
                <div className="relative">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Rating (0-5)</label>
                    <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        placeholder="Product rating"
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                        required
                    />
                </div>
                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Create Product
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateProductModal
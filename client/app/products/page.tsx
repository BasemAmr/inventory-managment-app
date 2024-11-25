"use client";

import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { Loader, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "../(components)/Header";
import { renderStars } from "../dashboard/PopularProductsCard";
import CreateProductModal, { ProductFormData } from "./CreateProductModal";

const Products = () => {

    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {data, isLoading, isError} = useGetProductsQuery(search);

    const [createProduct] = useCreateProductMutation();
    const handleCreate = async (formData: ProductFormData) => {
        try {
            const product = await createProduct(formData);
            // res log
            console.log(product);
        } catch (error) {
            // error log
            console.log(error);
        }
    }

    if (isLoading) {
        return <div className="flex items-center justify-center h-full">
            <Loader className="animate-spin" size={32} />
        </div>
    }

    if (isError || !data) {
        return <div className="flex items-center justify-center h-full">
            <div className="text-red-500">An error occurred</div>
        </div>
    }

  return (
    
    <>

        <div className="flex items-center space-x-4 justify-around p-4">
            <Header name="Products" />
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" /> 
            </div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Add Product
            </button>
        </div>

        {/* Body Product List, Products shuld be responsive cards , display name price rating using Rating vomponent, stock, image Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {data.map((product) => (
                <div key={product.productId} className="bg-white shadow-md rounded-md p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-gray-500">{product.price}</p>
                        </div>
                        <div>
                            {
                                renderStars(product.rating)
                            }
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-500">Stock: {product.stockQuantity}</p>
                    </div>
                </div>
            ))}
        </div>
        
        {/* Create Product Modal */}
        
        <CreateProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} 
            onCreate={
                handleCreate
            }/>

    </>
  )
}

export default Products
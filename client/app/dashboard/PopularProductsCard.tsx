'use client';
import { Products, useGetDashboardMetricsQuery } from '@/state/api';
import Image from 'next/image';
import { Star, ShoppingCart, Loader } from 'lucide-react';


export const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }).map((_, index) => (
        <Star
            key={index}
            size={16}
            fill={index < rating ? '#FFD700' : 'none'}
            color={index < rating ? '#FFD700' : '#cbd5e1'}
        />
    ));
};

const PopularProductsCard = () => {
    const { data, isLoading } = useGetDashboardMetricsQuery();


    if (isLoading) {
        return (
            <div className='animate-pulse'>
                <Loader size={32} />
            </div>
        );
    }



    return (
        <div className="bg-white shadow-md rounded-lg p-6 row-span-1 col-span-1 md:row-span-3 xl:row-span-6 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Popular Products</h2>
            <hr className="mb-4" />
            
            <div className="space-y-4">
                {data?.popularProducts?.map((product: Products) => (
                    <div key={product.productId} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                                <div className="flex items-center space-x-1">
                                    {renderStars(product.rating)}
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-gray-600">
                            <ShoppingCart size={20} />
                            <span>{(product.stockQuantity / 1000).toFixed(1)}k</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularProductsCard;
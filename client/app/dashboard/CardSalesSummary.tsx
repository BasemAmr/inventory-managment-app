import { SalesSummary, useGetDashboardMetricsQuery } from "@/state/api";
import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon, Loader } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const CardSalesSummary = () => {
    const { data, isLoading } = useGetDashboardMetricsQuery();
    const [timeframe, setTimeframe] = useState('today');
    
    const salesData: SalesSummary[] = data?.salesSummary || [];
    const totalSales = salesData?.reduce((acc, curr) => acc + curr.totalValue, 0);

    // Calculate trend (comparing last two entries)
    const isTrendingUp = salesData.length >= 2 && 
        salesData[salesData.length - 1].totalValue > salesData[salesData.length - 2].totalValue;

    const highestSalesDate = salesData?.reduce((acc, curr) => 
        acc.totalValue > curr.totalValue ? acc : curr, salesData[0])?.date || '';

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-full'>
                <Loader className="animate-spin" size={32} />
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 row-span-1 col-span-1 md:row-span-3 xl:row-span-6 flex flex-col h-full">
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800">Sales Summary</h2>
            <div className="h-px bg-gray-200 w-full my-4" />

            {/* Body Header */}
            <div className="space-y-4">
                <p className="text-gray-500 text-sm">Total Sales</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold">
                            ${(totalSales / 1000000).toFixed(2)}m
                        </h3>
                        {isTrendingUp ? (
                            <ArrowUpIcon className="text-green-500 h-5 w-5" />
                        ) : (
                            <ArrowDownIcon className="text-red-500 h-5 w-5" />
                        )}
                    </div>
                    <div className="relative">
                        <select 
                            className="appearance-none bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pr-10 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                        >
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                    </div>
                </div>
            </div>
            
            {/* Chart */}
            <div className="flex-grow my-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                        <XAxis 
                            dataKey="date"
                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                            fontSize={12}
                        />
                        <YAxis 
                            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}m`}
                            fontSize={12}
                        />
                        <Tooltip  
                            labelFormatter={(value) => new Date(value).toLocaleDateString()}
                            formatter={(value) => `$${(value / 1000000).toFixed(1)}m`}
                        />
                        <Bar 
                            dataKey="totalValue" 
                            fill="#6366f1"  
                            barSize={32}
                            shape={(props) => {
                                const { x, y, width, height, fill } = props;
                                return (
                                    <path
                                        d={`
                                            M${x},${y + height}
                                            L${x},${y + 8}
                                            Q${x},${y} ${x + 8},${y}
                                            L${x + width - 8},${y}
                                            Q${x + width},${y} ${x + width},${y + 8}
                                            L${x + width},${y + height}
                                            Z
                                        `}
                                        fill={fill}
                                    />
                                );
                            }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Footer */}
            <div className="flex justify-between text-sm text-gray-500 mt-auto pt-4 border-t">
                <p className="font-medium">{salesData.length} Days</p>
                <p className="font-medium">
                    Highest: {highestSalesDate ? new Date(highestSalesDate).toLocaleDateString() : ''}
                </p>
            </div>
        </div>
    );
};

export default CardSalesSummary;
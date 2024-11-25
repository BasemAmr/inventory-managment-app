import { PurchaseSummary, useGetDashboardMetricsQuery } from "@/state/api";
import { ArrowDownIcon, ArrowUpIcon,  Loader } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const PurchaseSummaryCard = () => {
    const { data, isLoading } = useGetDashboardMetricsQuery();
    
    const purchaseData: PurchaseSummary[] = data?.purchaseSummary || [];
    const lastPurchasePoint = purchaseData[purchaseData.length - 1];
    
    // Calculate trend and change percentage
    const isTrendingUp = purchaseData.length >= 2 && 
        purchaseData[purchaseData.length - 1].totalPurchased > 
        purchaseData[purchaseData.length - 2].totalPurchased;

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-full'>
                <Loader className="animate-spin" size={32} />
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 row-span-1 col-span-1 md:col-span-2 md:row-span-2 xl:col-span-1 xl:row-span-3 flex flex-col h-full">
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800">Purchase Summary</h2>
            <div className="h-px bg-gray-200 w-full my-4" />

            {/* Body Header */}
            <div className="space-y-4">
                <p className="text-gray-500 text-sm">Total Purchases</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold">
                            ${((lastPurchasePoint?.totalPurchased || 0) / 1000000).toFixed(2)}M
                        </h3>
                        <div className="flex items-center">
                            {isTrendingUp ? (
                                <ArrowUpIcon className="text-green-500 h-5 w-5" />
                            ) : (
                                <ArrowDownIcon className="text-red-500 h-5 w-5" />
                            )}
                            <span className={`text-sm ${isTrendingUp ? 'text-green-500' : 'text-red-500'}`}>
                                {lastPurchasePoint?.changePercentage?.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Chart */}
            <div className="flex-grow mt-6">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={purchaseData}>
                        <XAxis 
                            dataKey="date"
                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                            fontSize={12}
                        />
                        <YAxis 
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                            fontSize={12}
                        />
                        <Tooltip 
                            labelFormatter={(value) => new Date(value).toLocaleDateString()}
                            formatter={(value) => [`$${value.toLocaleString()}`, "Total Purchased"]}
                        />
                        <Area
                            type="monotone"
                            dataKey="totalPurchased"
                            stroke="#6366f1"
                            fill="url(#purchaseGradient)"
                            strokeWidth={2}
                        />
                        <defs>
                            <linearGradient id="purchaseGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PurchaseSummaryCard;
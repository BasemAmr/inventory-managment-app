"use client";

import { useGetProductsQuery } from "@/state/api";
import { Loader } from "lucide-react";
import Header from "../(components)/Header";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'productId', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'price', headerName: 'Price', type: 'number', width: 110, editable: true },
    { field: 'rating', headerName: 'Rating', type: 'number', width: 110, editable: true },
    { field: 'stockQuantity', headerName: 'Stock Quantity', type: 'number', width: 150, editable: true },
  ];
  
  const InventoryPage = () => {
    const { data, isLoading, isError } = useGetProductsQuery("");
  
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader className="animate-spin" size={32} />
        </div>
      );
    }
  
    if (isError || !data) {
      return (
        <div className="flex items-center justify-center h-full">
          <p>Error fetching products</p>
        </div>
      );
    }
  
    return (
      <>
        <Header name="Inventory" />
        <Box
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 h-full overflow-auto"
        >
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.productId}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            getRowClassName={(params) =>
              `hover:bg-blue-100 dark:hover:bg-blue-800 ${params.indexRelativeToCurrentPage % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`
            }
          />
        </Box>
      </>
    );
  };

export default InventoryPage;
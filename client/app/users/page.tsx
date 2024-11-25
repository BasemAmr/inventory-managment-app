"use client";

import { useGetUsersQuery } from "@/state/api"
import { Loader } from "lucide-react"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';


const Users = () => {

    const {data, isLoading, isError} = useGetUsersQuery()   

    const userColDef: GridColDef[] = [
        { field: 'userId', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150, editable: true },
        { field: 'email', headerName: 'Email', width: 150, editable: true },
    ]

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader className="animate-spin" size={32} />
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Error fetching users</p>
            </div>
        )
    }


  return (
    // MUI DataGrid component
    <Box
      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 h-full overflow-auto"
    >
        <DataGrid
            rows={data}
            columns={userColDef}
            getRowId={(row) => row.userId}
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
  )
}

export default Users
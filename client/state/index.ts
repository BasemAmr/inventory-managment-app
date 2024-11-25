import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction} from '@reduxjs/toolkit';


export interface IInitialState {
    isCollapsed: boolean;
    isDarkMode: boolean;
}

const initialState: IInitialState = {
    isCollapsed: false,
    isDarkMode: false,
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isCollapsed = action.payload;
        },
        setIsDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        },
    },
});

export const { setIsSidebarCollapsed, setIsDarkMode } = globalSlice.actions;
export default globalSlice.reducer;
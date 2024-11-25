"use client";

import { useAppSelector, useAppDispatch } from "@/app/redux";
import { setIsSidebarCollapsed, setIsDarkMode } from "@/state";
import {  Menu, Moon, Settings, Sun } from "lucide-react";
import React from "react";

const Navbar = () => {

    const isCollapsed = useAppSelector((state) => state.global.isCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const dispatch = useAppDispatch();

    const setIsCollapsed = (value: boolean) => {
        dispatch(setIsSidebarCollapsed(value));
    }
   
    const toggleDarkMode = () => {
        dispatch(setIsDarkMode(!isDarkMode));
    }  

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-full hover:bg-gray-200">
            <Menu className="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer" />
            </button>
        </div>
        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200">
                {
                    isDarkMode ?  <Sun className="w-6 h-6 text-blue-500" /> : <Moon className="w-6 h-6 text-blue-500" />    

                }
            </button>
            <hr className="h-6 border-l border-gray-300" />
            <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full"
            />
            <span className="text-gray-700">John Doe</span>
            <button onClick={() => {}} className="p-2 rounded-full hover:bg-gray-200">
                <Settings className="w-6 h-6 text-blue-500" />
            </button>
        </div>
    </div>
  );
};

export default Navbar;

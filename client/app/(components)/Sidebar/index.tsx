"use client";

import React from "react";
import {
  ChevronLeft,
  LayoutDashboard,
  Package,
  Settings,
  Users,
  CircleDollarSign,
  Warehouse,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const isCollapsed = useAppSelector((state) => state.global.isCollapsed);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const setIsCollapsed = (value: boolean) => {
    dispatch(setIsSidebarCollapsed(value));
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Package, label: "Products", path: "/products" },
    { icon: Warehouse, label: "Inventory", path: "/inventory" },
    { icon: Users, label: "Users", path: "/users" },
    { icon: CircleDollarSign, label: "Expenses", path: "/expenses" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-0 md:w-16" : "w-72 md:w-64 "
      } min-h-screen bg-gray-100 transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center p-4 justify-between">
        <h1
          className={`${
            isCollapsed ? "opacity-0 hidden" : "opacity-100"
          } text-xl font-semibold text-blue-500 transition-opacity duration-300`}
        >
          Inventory App
        </h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <ChevronLeft
            className={`hidden md:block w-6 h-6 text-blue-500 transition-transform duration-300 ${
              isCollapsed ? "rotate-180 " : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-2" onClick={() => {}}>
            <Link href={item.path}>
            <div
              className={`flex items-center p-3 rounded-md hover:bg-gray-200 cursor-pointer transition-colors duration-200 ${
                pathname === item.path ? "active" : ""
              }`}
            >
              <item.icon className="w-6 h-6 text-gray-700" />
              <span
                className={`${
                  isCollapsed ? "opacity-0 hidden" : "opacity-100 ml-3"
                } text-gray-700 transition-opacity duration-300`}
              >
                {item.label}
              </span>
            </div>
            </Link>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className={`${
          isCollapsed ? "opacity-0 hidden" : "opacity-100"
        } p-4 border-t border-gray-300 transition-opacity duration-300`}
      >
        <p className="text-sm text-gray-500">Version 1.0.0</p>
      </div>
    </div>
  );
};

export default Sidebar;

"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector, } from "../redux";
import { setIsDarkMode } from "@/state";

const mockSettings: UserSetting[] = [
        {
        name: "Dark Mode",
        value:  "false",
        type: "toggle"
    },
    {
        name: "Language",
        value: "English",
        type: "text"
    },
    {
        name: "Currency",
        value: "USD",
        type: "text"
    },
    // placeholder name and email with values
    {
        name: "Name",
        value: "John Doe",
        type: "text"
    },
    {
        name: "Email",
        value: "John_doe652@gmail.com",
        type: "text"
    }
];
type UserSetting = {
    name: string;
    value: string;
    type: "toggle" | "text" ;
};


const Settings = () => {
    
    const [settings, setSettings] = useState<UserSetting[]>(mockSettings);
    
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setSettings((prev) => {
            return prev.map((setting) => {
                if (setting.name === "Dark Mode") {
                    return {
                        ...setting,
                        value: isDarkMode ? "true" : "false"
                    }
                }
                return setting;
            });
        });
    }, [isDarkMode]);

    
    

    const handleToggle = (index: number) => {
        const newSettings = [...settings];
        dispatch(setIsDarkMode(!isDarkMode));
        newSettings[index].value = newSettings[index].value === "true" ? "false" : "true";
        setSettings(newSettings);

    }

  return (
    <div
    className="bg-white  shadow-lg rounded-lg p-6 h-full overflow-auto"
    >
        <h1 className="text-2xl font-semibold mb-4  ">Settings</h1>
        {settings.map((setting, index) => (
            <div key={index} className="flex justify-between px-4 items-center mb-4 text-gray-900">
                <p>{setting.name}</p>
                {setting.type === "toggle" ? (
                    <button
                        onClick={() => handleToggle(index)}
                        className={`${
                        setting.value === "true"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } text-white px-4 py-2 rounded-md`}
                    >
                        {setting.value === "true" ? "On" : "Off"}
                    </button>
                ) : (
                    <p>{setting.value}</p>
                )}
            </div>
        ))}
    </div>
  )
}

export default Settings
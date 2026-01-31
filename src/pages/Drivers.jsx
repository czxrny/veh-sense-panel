import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDrivers, deleteDriver } from "../api/Driver";

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadDrivers() {
            try {
            const data = await getAllDrivers();
            setDrivers(data);
            } catch (err) {
            console.error(err);
            }
        }
        loadDrivers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this driver?")) return;

        try {
            await deleteDriver(id);
            const data = await getAllDrivers();
            setDrivers(data);
        } catch (err) {
            console.error(err);
            alert("Failed to delete driver");
        }
    };

    return (
    <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Drivers Management</h1>
        <button
            onClick={() => navigate("/drivers/add")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
            Add Driver
        </button>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total KM</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rides</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{driver.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{driver.user_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{driver.total_kilometers}</td>
                <td className="px-6 py-4 whitespace-nowrap">{driver.number_of_rides}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <button
                    onClick={() => handleDelete(driver.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                    Delete
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
    );
};

export default Drivers;

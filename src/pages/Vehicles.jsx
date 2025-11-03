import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVehicles, deleteVehicle } from "../api/Vehicle";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadVehicles() {
            try {
                const data = await getAllVehicles();
                setVehicles(data);
            } catch (err) {
                console.error(err);
            }
        }
    loadVehicles();
    }, []);

    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

        try {
            await deleteVehicle(id);
            const data = await getAllVehicles();
            setVehicles(data);
        } catch (err) {
            console.error(err);
            alert("Failed to delete vehicle");
        }
    }


    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Vehicles Management</h1>
                <button
                    onClick={() => navigate("/vehicles/add")}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                    Add Vehicle
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engine Capacity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engine Power</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plates</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Fuel</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {vehicles.map(vehicle => (
                            <tr key={vehicle.key} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{vehicle.ID ?? vehicle.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{vehicle.brand}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{vehicle.model}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{vehicle.year}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{vehicle.engine_capacity}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{vehicle.engine_power}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{vehicle.plates ?? "-"}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{vehicle.expected_fuel}</td>
                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                    <button
                                        onClick={() => navigate(`/vehicles/edit/${vehicle.ID ?? vehicle.id}`)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(vehicle.ID ?? vehicle.id)}
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

export default Vehicles;

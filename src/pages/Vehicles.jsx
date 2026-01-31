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
        <div className="p-8 min-h-screen" style={{ backgroundColor: "#262622", fontFamily: "Courier New, monospace", color: "#ffffff" }}>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ color: "#aaaba3" }}>Vehicles Management</h1>
                <button
                    onClick={() => navigate("/vehicles/add")}
                    className="px-4 py-2 rounded-md transition"
                    style={{ backgroundColor: "#6c734f", color: "#ffffff", fontWeight: "bold" }}
                >
                    Add Vehicle
                </button>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-2xl border" style={{ borderColor: "#3a3d2b" }}>
                <table className="min-w-full divide-y divide-gray-700 table-auto" style={{ borderCollapse: "separate", borderSpacing: "24px 8px" }}>
                    <thead style={{ backgroundColor: "#262622" }}>
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-12" style={{ color: "#c7cfa7" }}>ID</th>
                            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-32" style={{ color: "#c7cfa7" }}>Brand</th>
                            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-32" style={{ color: "#c7cfa7" }}>Model</th>
                            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-20" style={{ color: "#c7cfa7" }}>Year</th>
                            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-32" style={{ color: "#c7cfa7" }}>Engine Capacity</th>
                            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-28" style={{ color: "#c7cfa7" }}>Engine Power</th>
                            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-24" style={{ color: "#c7cfa7" }}>Plates</th>
                            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-28" style={{ color: "#c7cfa7" }}>Expected Fuel</th>
                            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-40" style={{ color: "#c7cfa7" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {vehicles.map(vehicle => (
                            <tr key={vehicle.key} className="hover:opacity-80 transition" style={{ borderRadius: "8px" }}>
                                <td className="px-4 py-4 whitespace-nowrap w-12">{vehicle.ID ?? vehicle.id}</td>
                                <td className="px-4 py-4 whitespace-nowrap w-32">{vehicle.brand}</td>
                                <td className="px-4 py-4 whitespace-nowrap w-32">{vehicle.model}</td>
                                <td className="px-4 py-4 whitespace-nowrap w-20">{vehicle.year}</td>
                                <td className="px-4 py-4 whitespace-nowrap w-32">{vehicle.engine_capacity}cc</td>
                                <td className="px-4 py-4 whitespace-nowrap w-28">{vehicle.engine_power}HP</td>
                                <td className="px-4 py-4 whitespace-nowrap w-24">{vehicle.plates ?? "-"}</td>
                                <td className="px-4 py-4 whitespace-nowrap w-28">{vehicle.expected_fuel}L</td>
                                <td className="px-4 py-4 whitespace-nowrap space-x-3 w-40">
                                    <button
                                        onClick={() => navigate(`/vehicles/edit/${vehicle.ID ?? vehicle.id}`)}
                                        className="px-4 py-2 rounded-md transition"
                                        style={{ backgroundColor: "#6c734f", color: "#ffffff", fontWeight: "bold" }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(vehicle.ID ?? vehicle.id)}
                                        className="px-4 py-2 rounded-md transition"
                                        style={{ backgroundColor: "#929c6b", color: "#ffffff", fontWeight: "bold" }}
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

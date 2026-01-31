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
<div className="p-8 min-h-screen" style={{ backgroundColor: "#262622", fontFamily: "Courier New, monospace", color: "#ffffff" }}>
    <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#aaaba3" }}>Drivers Management</h1>
        <button
            onClick={() => navigate("/drivers/add")}
            className="px-4 py-2 rounded-md transition"
            style={{ backgroundColor: "#6c734f", color: "#ffffff", fontWeight: "bold" }}
        >
            Add Driver
        </button>
    </div>

    <div className="overflow-x-auto shadow-lg rounded-2xl border" style={{ borderColor: "#3a3d2b" }}>
        <table className="min-w-full divide-y divide-gray-700 table-auto" style={{ borderCollapse: "separate", borderSpacing: "24px 8px" }}>
            <thead style={{ backgroundColor: "#262622" }}>
                <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-12" style={{ color: "#c7cfa7" }}>ID</th>
                    <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-48" style={{ color: "#c7cfa7" }}>Name</th>
                    <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-32" style={{ color: "#c7cfa7" }}>Total KM</th>
                    <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-28" style={{ color: "#c7cfa7" }}>Rides</th>
                    <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-32" style={{ color: "#c7cfa7" }}>Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
                {drivers.map(driver => (
                    <tr key={driver.id} className="hover:opacity-80 transition" style={{ borderRadius: "8px" }}>
                        <td className="px-4 py-4 whitespace-nowrap w-12">{driver.id}</td>
                        <td className="px-4 py-4 whitespace-nowrap w-48">{driver.user_name}</td>
                        <td className="px-4 py-4 whitespace-nowrap w-32">{driver.total_kilometers}</td>
                        <td className="px-4 py-4 whitespace-nowrap w-28">{driver.number_of_rides}</td>
                        <td className="px-4 py-4 whitespace-nowrap space-x-3 w-32">
                            <button
                                onClick={() => handleDelete(driver.id)}
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

export default Drivers;

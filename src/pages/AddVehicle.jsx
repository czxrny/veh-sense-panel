import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddVehicle = () => {
    const navigate = useNavigate();

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState(0);
    const [engine_capacity, setEngineCapacity] = useState(0);
    const [engine_power, setEnginePower] = useState(0);
    const [plates, setPlates] = useState("");
    const [expected_fuel, setExpectedFuel] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            brand,
            model,
            year,
            engine_capacity,
            engine_power,
            plates,
            expected_fuel,
        };

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/vehicles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to add vehicle");

            alert("Vehicle added successfully!");
            navigate("/vehicles");
        } catch (err) {
            console.error(err);
            alert("Failed to add vehicle");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Add New Vehicle
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Brand</label>
                        <input
                            type="text"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Model</label>
                        <input
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Engine Capacity</label>
                        <input
                            type="number"
                            value={engine_capacity}
                            onChange={(e) => setEngineCapacity(Number(e.target.value))}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Engine Power</label>
                        <input
                            type="number"
                            value={engine_power}
                            onChange={(e) => setEnginePower(Number(e.target.value))}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Plates</label>
                        <input
                            type="text"
                            value={plates}
                            onChange={(e) => setPlates(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Expected Fuel</label>
                        <input
                            type="number"
                            value={expected_fuel}
                            onChange={(e) => setExpectedFuel(Number(e.target.value))}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/vehicles")}
                            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
                        >
                            Add Vehicle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVehicle;

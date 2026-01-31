import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addVehicle } from "../api/Vehicle";
import { getAllDrivers } from "../api/Driver";

const AddVehicle = () => {
    const navigate = useNavigate();

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState(0);
    const [engine_capacity, setEngineCapacity] = useState(0);
    const [engine_power, setEnginePower] = useState(0);
    const [plates, setPlates] = useState("");
    const [expected_fuel, setExpectedFuel] = useState(0);
    const [drivers, setDrivers] = useState([]);
    const [ownerId, setOwnerId] = useState("");

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
        owner_id: ownerId === "shared" ? null : Number(ownerId),
    };

    try {
        await addVehicle(payload);
        alert("Vehicle added successfully!");
        navigate("/vehicles");
    } catch (err) {
        console.error(err);
        alert("Failed to add vehicle");
    }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#262622] p-6 font-mono"  style={{ backgroundColor: "#252622", fontFamily: "Courier New, monospace" }}>
            <div className=" shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-[#c7cfa7] text-center">
                    Add New Vehicle
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-bold mb-1 text-[#929c6b]">Brand</label>
                        <input
                            type="text"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                            className="w-full rounded-md px-3 py-2 border border-[#3a3d2b] bg-[#464940] text-white focus:outline-none focus:ring-2 focus:ring-[#6c734f]"
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1 text-[#929c6b]">Model</label>
                        <input
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            required
                            className="w-full rounded-md px-3 py-2 border border-[#3a3d2b] bg-[#464940] text-white focus:outline-none focus:ring-2 focus:ring-[#6c734f]"
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1 text-[#929c6b]">Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            required
                            className="w-full rounded-md px-3 py-2 border border-[#3a3d2b] bg-[#464940] text-white focus:outline-none focus:ring-2 focus:ring-[#6c734f]"
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1 text-[#929c6b]">Engine Capacity</label>
                        <input
                            type="number"
                            value={engine_capacity}
                            onChange={(e) => setEngineCapacity(Number(e.target.value))}
                            required
                            className="w-full rounded-md px-3 py-2 border border-[#3a3d2b] bg-[#464940] text-white focus:outline-none focus:ring-2 focus:ring-[#6c734f]"
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1 text-[#929c6b]">Engine Power</label>
                        <input
                            type="number"
                            value={engine_power}
                            onChange={(e) => setEnginePower(Number(e.target.value))}
                            required
                            className="w-full rounded-md px-3 py-2 border border-[#3a3d2b] bg-[#464940] text-white focus:outline-none focus:ring-2 focus:ring-[#6c734f]"
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1 text-[#929c6b]">Plates</label>
                        <input
                            type="text"
                            value={plates}
                            onChange={(e) => setPlates(e.target.value)}
                            className="w-full rounded-md px-3 py-2 border border-[#3a3d2b] bg-[#464940] text-white focus:outline-none focus:ring-2 focus:ring-[#6c734f]"
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1 text-[#929c6b]">Expected Fuel</label>
                        <input
                            type="number"
                            value={expected_fuel}
                            onChange={(e) => setExpectedFuel(Number(e.target.value))}
                            required
                            className="w-full rounded-md px-3 py-2 border border-[#3a3d2b] bg-[#464940] text-white focus:outline-none focus:ring-2 focus:ring-[#6c734f]"
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1 text-[#929c6b]">Owner</label>
                        <select
                            value={ownerId}
                            onChange={(e) => setOwnerId(e.target.value)}
                            required
                            className="w-full rounded-md px-3 py-2 border border-[#3a3d2b] bg-[#464940] text-white focus:outline-none focus:ring-2 focus:ring-[#6c734f]"
                        >
                            <option value="">Select owner...</option>
                            <option value="shared">Shared</option>
                            {drivers.map((driver) => (
                            <option key={driver.id} value={driver.id}>
                                {driver.user_name || `${driver.first_name} ${driver.last_name}`}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/vehicles")}
                            className="px-4 py-2 rounded-md bg-[#3a3d2b] hover:bg-[#6c734f] transition font-bold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-[#6c734f] text-white hover:bg-[#929c6b] transition font-bold"
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

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVehicleById, editVehicle  } from "../api/Vehicle";

const EditVehicle = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [engine_power, setEnginePower] = useState(0);
    const [plates, setPlates] = useState("");
    const [expected_fuel, setExpectedFuel] = useState(0);

    useEffect(() => {
        async function loadVehicle() {
            try {
                const data = await getVehicleById(id);
                setEnginePower(data.engine_power);
                setPlates(data.plates);
                setExpectedFuel(data.expected_fuel);
            } catch (err) {
                console.error(err);
            }
        }
        loadVehicle();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            engine_power,
            plates,
            expected_fuel,
        };

        try {
            await editVehicle(id, payload);
            alert("Vehicle updated successfully!");
            navigate("/vehicles");
        } catch (err) {
            console.error(err);
            alert("Failed to update vehicle");
        }
    };

    return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 font-mono" style={{fontFamily: "Courier New, monospace" }}>
        <div className="shadow-lg rounded-2xl p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-[#c7cfa7] text-center">
                Edit Vehicle
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
);

};

export default EditVehicle;

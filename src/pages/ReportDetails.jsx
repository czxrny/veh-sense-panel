import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehicleById } from "../api/Vehicle";
import { getReportById, getRideDataById } from "../api/Report";
import ObdCharts  from "../components/ObdChart";

const ReportDetails = () => {
    const { id } = useParams();

    const [report, setReport] = useState();
    const [vehicle, setVehicle] = useState();
    const [rideData, setRideData] = useState();
    const [user, setUserData] = useState();
    useEffect(() => {
        async function fetchReportData() {
            try {
                const reportData = await getReportById(id);
                setReport(reportData)

                const ride = await getRideDataById(id)
                setRideData(ride)

                // const userData = await getUserById(reportData.user_id)
                // setVehicle(vehicleData)

                const vehicleData = await getVehicleById(reportData.vehicle_id)
                setVehicle(vehicleData)
            } catch (err) {
                console.error(err)
            }
        }
        fetchReportData();
    },[])

    return (
    <>
        {!report || !vehicle || !rideData ? (
        <div className="text-center p-10 text-gray-500">Loading data...</div>
        ) : (
        <div className="max-w-3xl mx-auto p-5 font-sans space-y-6">
            <h1 className="text-2xl font-bold">Report #{report.id}</h1>

            <section className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">User Info</h2>
            <p><strong>Name:</strong> Placeholder </p>
            <p><strong>Total kilometers:</strong> Placeholder km</p>
            <p><strong>Number of rides:</strong> Placeholder </p>
            </section>

            <section className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Vehicle</h2>
            <p><strong>Brand:</strong> {vehicle.brand}</p>
            <p><strong>Model:</strong> {vehicle.model}</p>
            <p><strong>Year:</strong> {vehicle.year}</p>
            <p><strong>Engine capacity:</strong> {vehicle.engine_capacity} cm³</p>
            <p><strong>Engine power:</strong> {vehicle.engine_power} HP</p>
            <p><strong>Plates:</strong> {vehicle.plates}</p>
            <p><strong>Expected fuel:</strong> {vehicle.expected_fuel} L/100km</p>
            </section>

            <section className="border border-gray-200 rounded-lg p-4 shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Ride Data</h2>
                <p><strong>Acceleration style:</strong> {report.acceleration_style}</p>
                <p><strong>Braking style:</strong> {report.braking_style}</p>
                <p><strong>Average speed:</strong> {report.average_speed.toFixed(2)} km/h</p>
                <p><strong>Max speed:</strong> {report.max_speed} km/h</p>
                <p><strong>Kilometers travelled:</strong> {report.kilometers_travelled.toFixed(2)} km</p>
                
                {(() => {
                    const startDate = new Date(report.start_time);
                    const stopDate = new Date(report.stop_time);

                    const dateStr = startDate.toLocaleDateString("en-US");
                    const startTimeStr = startDate.toLocaleTimeString("pl-PL");
                    const stopTimeStr = stopDate.toLocaleTimeString("pl-PL");

                    const durationMs = report.stop_time - report.start_time;
                    const hours = Math.floor(durationMs / 3600000);
                    const minutes = Math.floor((durationMs % 3600000) / 60000);
                    const formattedDuration = `${hours}h ${minutes}m`;

                    return (
                    <>
                        <p><strong>Date:</strong> {dateStr}</p>
                        <p><strong>Start time:</strong> {startTimeStr}</p>
                        <p><strong>Stop time:</strong> {stopTimeStr}</p>
                        <p><strong>Duration:</strong> {formattedDuration}</p>
                    </>
                    );
                })()}
            </section>
            <ObdCharts rawData={rideData} />
        </div>
        )}
    </>
    );
}

export default ReportDetails;
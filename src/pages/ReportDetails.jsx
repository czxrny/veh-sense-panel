import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehicleById } from "../api/Vehicle";
import { getReportById, getRideDataById } from "../api/Report";
import { getDriverById } from "../api/Driver";
import ObdCharts  from "../components/ObdChart";

const ReportDetails = () => {
    const { id } = useParams();

    const [report, setReport] = useState();
    const [vehicle, setVehicle] = useState();
    const [rideData, setRideData] = useState();
    const [user, setUser] = useState();
    useEffect(() => {
        async function fetchReportData() {
            try {
                const reportData = await getReportById(id);
                setReport(reportData)

                const ride = await getRideDataById(id)
                setRideData(ride)

                const userData = await getDriverById(reportData.user_id)
                setUser(userData)

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
      <div className="text-center p-10 text-[#929c6b]">Loading data...</div>
    ) : (
      <div
        className="flex flex-col items-center justify-center min-h-screen p-6 font-mono"
        style={{ fontFamily: "Courier New, monospace" }}
      >
        <h1 className="text-2xl font-bold mb-6 text-[#c7cfa7] text-center">
          Report Details
        </h1>

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
          {/* User Info */}
          <section className="flex-1 rounded-2xl p-6  shadow-md">
            <h2 className="text-xl font-bold mb-3 text-[#c7cfa7]">Driver Info</h2>
            <p><strong>Name:</strong> {user.user_name}</p>
            <p><strong>Total number of kilometers:</strong> {user.total_kilometers} km</p>
            <p><strong>Number of rides:</strong> {user.number_of_rides}</p>
          </section>

          {/* Vehicle Info */}
          <section className="flex-1 rounded-2xl p-6  shadow-md">
            <h2 className="text-xl font-bold mb-3 text-[#c7cfa7]">Used Vehicle </h2>
            <p><strong>Brand:</strong> {vehicle.brand}</p>
            <p><strong>Model:</strong> {vehicle.model}</p>
            <p><strong>Year:</strong> {vehicle.year}</p>
            <p><strong>Engine capacity:</strong> {vehicle.engine_capacity} cm³</p>
            <p><strong>Engine power:</strong> {vehicle.engine_power} HP</p>
            <p><strong>Plates:</strong> {vehicle.plates}</p>
            <p><strong>Expected fuel:</strong> {vehicle.expected_fuel} L/100km</p>
          </section>

          {/* Ride Data */}
          <section className="flex-1 rounded-2xl p-6  shadow-md">
            <h2 className="text-xl font-bold mb-3 text-[#c7cfa7]">Raport Data</h2>
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
        <section className="flex-1 rounded-2xl p-6  shadow-md"></section>
        <div className="w-full max-w-6xl mt-6">
          <ObdCharts rawData={rideData} />
        </div>
        </div>
      </div>
    )}
  </>
);


}

export default ReportDetails;
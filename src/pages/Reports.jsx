import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReports } from "../api/Report";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchReports() {
            try {
                const data = await getReports();
                console.log(data)
                setReports(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchReports();
    },[])
    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this report?")) return;

        try {
            await deleteReport(id);
            const data = await getReports();
            setReports(data)
        } catch (err) {
            console.error(err);
            alert("Failed to delete report");
        }
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Driver reports</h1>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acceleration style</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Braking style</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {reports.map((report, i) => {
                            const dateObj = new Date(report.start_time * 1000);

                            const date = dateObj.toLocaleDateString("en-US");
                            const time = dateObj.toLocaleTimeString("en-US");
                            const durationMs = report.stop_time - report.start_time;

                            const hours = Math.floor(durationMs / 3600000);
                            const minutes = Math.floor((durationMs % 3600000) / 60000);

                            const formattedDuration = `${hours}h ${minutes}m`;
                            return (
                                <tr key={report.key} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">{i+1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{report.user_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{time}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formattedDuration}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{report.acceleration_style}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{report.braking_style}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                        <button
                                            onClick={() => navigate(`/report/${report.id}/details`)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(report.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Reports;
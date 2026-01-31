import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { decodeGzipBase64 } from "../utils/ReportDataDecode"

const ObdCharts = ({ rawData }) => {
  const [frames, setFrames] = useState([]);

  useEffect(() => {
    if (!rawData) return;

    try {
      const parsedFrames = decodeGzipBase64(rawData.data);
      setFrames(parsedFrames);
    } catch (err) {
      console.error("Failed to decode OBD frames:", err);
    }
  }, [rawData]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">RPM</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={frames}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
            <YAxis domain={[0, 8000]} />
            <Tooltip labelFormatter={(t) => new Date(t).toLocaleTimeString()} />
            <Line type="monotone" dataKey="rpm" stroke="#3b82f6" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Engine Load</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={frames}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
            <YAxis domain={[0, 100]} />
            <Tooltip labelFormatter={(t) => new Date(t).toLocaleTimeString()} />
            <Line type="monotone" dataKey="engine_load" stroke="#f97316" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Speed</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={frames}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
            <YAxis domain={[0, 200]} />
            <Tooltip labelFormatter={(t) => new Date(t).toLocaleTimeString()} />
            <Line type="monotone" dataKey="vehicle_speed" stroke="#10b981" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ObdCharts;

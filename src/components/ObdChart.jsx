import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceDot } from "recharts";
import { decodeGzipBase64 } from "../utils/ReportDataDecode"

const ObdCharts = ({ rawData }) => {
  const [frames, setFrames] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!rawData) return;

    try {
      const parsedFrames = decodeGzipBase64(rawData.data);
      setFrames(parsedFrames);

      const parsedEvents = decodeGzipBase64(rawData.event_data);
      setEvents(parsedEvents);
    } catch (err) {
      console.error("Failed to decode OBD frames:", err);
    }
  }, [rawData]);
  
  const getEventColor = (type) => {
    switch (type) {
      case "acceleration": return "#33e008"; 
      case "braking": return "#cb0808";  
      case "high_rpm": return "#d90202";    
      case "high_engine_load": return "#f91616"; 
      case "overspeed": return "#fff200"; 
      default: return "#9ca3af";
    }
  };

  return (
    <div className="space-y-8">
      {/* RPM */}
      <div>
        <h3 className="text-lg font-semibold mb-2">RPM</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={frames}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
            <YAxis domain={[0, 8000]} />
            <Tooltip labelFormatter={(t) => new Date(t).toLocaleTimeString()} />
            <Line type="monotone" dataKey="rpm" stroke="#8d5700" dot={false} />

            {events
              .filter(e => e.type === "high_rpm")
              .map((e, idx) => (
                <ReferenceDot
                  key={idx}
                  x={e.timestamp}
                  y={e.value ?? 6500}
                  r={3}
                  fill={getEventColor(e.type)}
                  stroke={getEventColor(e.type)}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Engine Load */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Engine Load</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={frames}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
            <YAxis domain={[0, 100]} />
            <Tooltip labelFormatter={(t) => new Date(t).toLocaleTimeString()} />
            <Line type="monotone" dataKey="engine_load" stroke="#33b62c" dot={false} />

            {events
              .filter(e => e.type === "high_engine_load")
              .map((e, idx) => (
                <ReferenceDot
                  key={idx}
                  x={e.timestamp}
                  y={e.value ?? 100}
                  r={3}
                  fill={getEventColor(e.type)}
                  stroke={getEventColor(e.type)}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Speed */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Speed</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={frames}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
            <YAxis domain={[0, 150]} />
            <Tooltip labelFormatter={(t) => new Date(t).toLocaleTimeString()} />
            <Line type="monotone" dataKey="vehicle_speed" stroke="#1dacff" dot={false} />

            {events
              .filter(e => e.type === "overspeed" || e.type === "acceleration" || e.type === "braking")
              .map((e, idx) => (
                <ReferenceDot
                  key={idx}
                  x={e.timestamp}
                  y={frames.find(f => f.timestamp === e.timestamp)?.vehicle_speed}
                  r={4}
                  fill={getEventColor(e.type)}
                  stroke={getEventColor(e.type)}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ObdCharts;

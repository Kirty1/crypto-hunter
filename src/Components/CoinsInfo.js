import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import { CircularProgress, createTheme, ThemeProvider, Box } from "@mui/material";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState(null);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    if (!coin?.id) return; // safeguard
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricData(data.prices);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days, coin]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#fff" },
    },
  });

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          width: { xs: "100%", md: "75%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
          p: { xs: 2, md: 5 },
        }}
      >
        {!historicData ? (
          <CircularProgress size={250} thickness={1} sx={{ color: "#44BBA4" }} />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) =>
                  days === 1 ? formatTime(coin[0]) : new Date(coin[0]).toLocaleDateString()
                ),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: { point: { radius: 1 } },
              }}
            />

            <Box sx={{ display: "flex", mt: 2, justifyContent: "space-around", width: "100%" }}>
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CoinInfo;

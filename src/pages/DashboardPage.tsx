import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import CountrySpecMap from "../components/CountrySpecMap";


ChartJs.register(LineElement, CategoryScale, LinearScale, PointElement);

type Props = {};

const DashboardPage = (props: Props) => {
  const {
    data: historicData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["historicalData"],
    queryFn: () =>
      axios
        .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
        .then((res) => res.data),
  });

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
 
  // Destructure the data safely
  const { cases = {}, deaths = {}, recovered = {} } = historicData || {};

  const chartData = {
    labels: Object.keys(cases), // Dates as labels
    datasets: [
      {
        label: "Cases",
        data: Object.values(cases),
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
      },
      {
        label: "Deaths",
        data: Object.values(deaths),
        fill: false,
        backgroundColor: "red",
        borderColor: "red",
      },
      {
        label: "Recovered",
        data: Object.values(recovered),
        fill: false,
        backgroundColor: "green",
        borderColor: "green",
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} />
    <CountrySpecMap/>
    </div>
  );
};

export default DashboardPage;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Line, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import CountrySpecMap from "../components/CountrySpecMap";
import spinner from "../images/spinner.svg";

ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  RadialLinearScale,
  ArcElement
);

type Props = {};

const DashboardPage = (props: Props) => {
  //fetch historical data for Line chart----------------------------------------
  const {
    data: historicData,
    isLoading: isLoadingHistoricData,
    isError: errorHistoricData,
  } = useQuery({
    queryKey: ["historicalData"],
    queryFn: () =>
      axios
        .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
        .then((res) => res.data),
  });
  const { cases = {}, deaths = {}, recovered = {} } = historicData || {};

  // fetch worldwide data for Polar Chart --------------------------------------
  const {
    data: currentData,
    isLoading: isLoadingCurrentData,
    error: errorCurrentData,
  } = useQuery({
    queryKey: ["currentData"],
    queryFn: () =>
      axios.get("https://disease.sh/v3/covid-19/all").then((res) => res.data),
  });

  const {
    cases: totalCases,
    deaths: totalDeaths,
    recovered: totalRecovered,
    active: totalActive,
    critical: totalCritical,
  } = currentData || {};

  // Handle loading and error states ----------------------------------------------------
  if (isLoadingHistoricData || isLoadingCurrentData)
    return (
      <div className="flex justify-center items-center h-full">
        <img className="h-30 w-10" src={spinner} alt="Loading..." />
      </div>
    );

  if (errorHistoricData || errorCurrentData)
    return <div>Error fetching data</div>;

  // Line chart data ------------------------------------------------------------------
  const lineChartData = {
    labels: Object.keys(cases), // Dates as labels
    datasets: [
      {
        label: "Cases",
        data: Object.values(cases),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
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

  // Polar chart data --------------------------------------------------------------
  const polarChartData = {
    labels: [
      "Total Cases",
      "Total Deaths",
      "Total Recovered",
      "Total Active",
      "Total Critical",
    ],
    datasets: [
      {
        label: "COVID-19 Data",
        data: [
          totalCases || 0,
          totalDeaths || 0,
          totalRecovered || 0,
          totalActive || 0,
          totalCritical || 0,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="bg-white shadow rounded-lg p-8  md:p-9 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-1/2 h-80 flex flex-col items-center justify-center">
          <Line data={lineChartData} />
          <p className="text-center mt-2 text-sm text-gray-600 font-semibold">
            Line chart displaying the historical COVID-19 cases, deaths, and
            recoveries over time.
          </p>
        </div>
        <div className="w-full md:w-1/2 h-80 flex flex-col items-center justify-center">
          <PolarArea className="p-3" data={polarChartData} />
          <p className="text-center mt-2 text-sm text-gray-600 font-semibold">
            Polar Area chart showing the current global COVID-19 statistics,
            including total cases, deaths, recoveries, active cases, and
            critical cases.
          </p>
        </div>
      </div>
      <div className="w-full h-80 mt-4">
        <CountrySpecMap />
        <p className="text-center mt-2 text-sm text-gray-600 font-semibold">
          Interactive map displaying COVID-19 data by country, allowing you to
          explore the impact of the pandemic worldwide.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;

import { Grid } from "@mui/material";
import React from "react";
import TopEmployeCard from "../components/TopEmployeCard";
import SummaryCard from "../components/SummaryCard";
import ChartJS from "chart.js/auto";
import { Chart } from "react-chartjs-2";

function Dashboard() {
  const employeData = [
    {
      id: 1,
      fullname: "John doe",
      score: "1403",
      extra: 2,
    },
    {
      id: 6,
      fullname: "John doe",
      score: "1403",
      extra: 7,
    },
    {
      id: 57,
      fullname: "John doe",
      score: "1403",
      extra: 9,
    },
  ];
  const summaryData = [
    {
      name: "Highest daily score",
      value: "1403",
      color: "green",
    },
    {
      name: "Lowest daily score",
      value: "350",
      color: "red",
    },
    {
      name: "Average daily score",
      value: "766",
      color: "black",
    },
  ];
  const chartData = {
    labels: ["2018", "2019", "2020", "2021", "2022"],
    datasets: [
      {
        id: 1,
        label: "Your emissions",
        data: [70, 90, 50, 30, 10, 50],
        tension: 0.5,
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };
  return (
    <>
      <Grid container justifyContent="center" sx={{}}>
        <Grid
          item
          xs={5}
          xl={4}
          lg={4}
          margin={3}
          padding={2}
          className="bg-white rounded-lg shadow-md"
        >
          <TopEmployeCard data={employeData} />
        </Grid>
        <Grid
          item
          xs={5}
          margin={3}
          lg={4}
          xl={4}
          padding={2}
          className="bg-white rounded-lg shadow-md"
        >
          <SummaryCard data={summaryData} />
        </Grid>
        <Grid
          item
          xs={10}
          lg={9}
          margin={3}
          xl={9}
          height={300}
          padding={2}
          className="bg-white rounded-lg shadow-md"
        >
          <Chart
            type="line"
            data={chartData}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                x: {
                  ticks: {},
                  axis: {
                    display: false,
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    display: false,
                  },
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;

import React from "react";
import Chart, { Props } from "react-apexcharts";

const options: Props["options"] = {
  chart: {
    type: "donut",
  },
  legend: {
    position: "bottom",
    show: false,
  },
  labels: ['WAITING FOR APPROVAL','APPROVED','REJECTED'],
  colors: ["#006FEE", "#17c964", "#f31260"],
  tooltip: {
    enabled: true, // Disable tooltips
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

export const Steam = ({statusData}:any) => {

  if (!statusData) {
    return null; // Or handle the case when statusData is null or undefined
  }

  const series: Props["series"] = [
    statusData.wait?.value || 0,
    statusData.approve?.value || 0,
    statusData.reject?.value || 0,
  ];

  return (
    <>
      <div className="h-[24.5rem] lg:w-full z-20 pl-0 pt-6 lg:p-6 overflow-hidden">
        <div id="chart">
          <Chart options={options} series={series} type="donut" height={300} />
        </div>
      </div>
    </>
  );
};

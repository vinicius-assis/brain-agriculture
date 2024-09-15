"use client";
import dynamic from "next/dynamic";
import Card from "../Card";
import Typography from "../Typography";
const ChartComponent = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const chartConfig = {
  type: "pie" as const,
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      fontSize: "12px",
      fontFamily: "Montserrat",
      fontWeight: "500",
      labels: {
        colors: "#64646b",
      },
    },
  },
};

interface IChartCardProps {
  labels: Array<string>;
  series: Array<number>;
}

const ChartCard = ({ labels, series }: IChartCardProps) => {
  const updatedConfig = {
    ...chartConfig,
    options: {
      ...chartConfig.options,
      labels,
    },
    series,
  };
  return (
    <Card data-testid="chart-card" className="max-w-96 w-full pl-4 pt-4">
      <Typography
        content="Total Orders"
        className="text-small-spacing font-normal uppercase text-gray-500"
      />
      <ChartComponent width="100%" {...updatedConfig} />
    </Card>
  );
};

export default ChartCard;

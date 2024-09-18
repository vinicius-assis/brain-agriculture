"use client";
import Card from "../Card";
import Typography from "../Typography";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CHART_COLORS } from "./colors";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = (labels: Array<string>, values: Array<string | number>) => ({
  labels,
  datasets: [
    {
      data: values,
      backgroundColor: CHART_COLORS,
      borderWidth: 1,
    },
  ],
});

interface IChartCardProps {
  labels: Array<string>;
  series: Array<number>;
  title?: string;
}

const ChartCard = ({
  title = "Total Orders",
  labels,
  series,
}: IChartCardProps) => {
  return (
    <Card data-testid="chart-card" className="max-w-96 w-full pl-4 pt-4">
      <Typography className="text-small-spacing font-normal uppercase text-gray-500">
        {title}
      </Typography>
      <Pie data={data(labels, series)} />
    </Card>
  );
};

export default ChartCard;

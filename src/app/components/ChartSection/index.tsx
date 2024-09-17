"use client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";
import { getChartData } from "../../../../store/reducers/selectors";
import TotalCard from "../TotalCard";
import ChartCard from "../ChartCard";

const ChartSection = () => {
  const {
    totalFarms,
    totalAreaSum,
    totalCultivableAreaSum,
    crops,
    cultivableAreaByState,
    totalCultivableAndVegetationArea,
    vegetationAreaByState,
  } = useSelector(getChartData) || {};
  return (
    <div className="w-full">
      <div className="w-full flex gap-6 mt-9 overflow-auto pb-2">
        <TotalCard title="Total Farms" value={String(totalFarms)} />
        <TotalCard title="Total Area" value={`${totalAreaSum}`} />
        <TotalCard
          title="Total Cultivable"
          value={`${totalCultivableAreaSum}`}
        />
      </div>
      <div className="flex md:flex-row md:flex-wrap flex-col gap-10 mt-10">
        {crops?.labels && crops?.series && (
          <ChartCard
            title="Total Crops"
            labels={crops?.labels}
            series={crops?.series}
          />
        )}
        {cultivableAreaByState?.labels && cultivableAreaByState?.series && (
          <ChartCard
            title="Total Cultivable Area By State"
            labels={cultivableAreaByState?.labels}
            series={cultivableAreaByState?.series}
          />
        )}
        {vegetationAreaByState?.labels && vegetationAreaByState?.series && (
          <ChartCard
            title="Cultivable And Vegetation Area"
            labels={vegetationAreaByState?.labels}
            series={vegetationAreaByState?.series}
          />
        )}
        {totalCultivableAndVegetationArea?.labels &&
          totalCultivableAndVegetationArea?.series && (
            <ChartCard
              title="Cultivable And Vegetation Area"
              labels={totalCultivableAndVegetationArea?.labels}
              series={totalCultivableAndVegetationArea?.series}
            />
          )}
      </div>
    </div>
  );
};

export default ChartSection;

import React from "react";
import { Card } from "antd";

const DisplaySelectedFilter = ({ selectedFilters }) => {
  const { start_year, end_year, gender, countries, colors } = selectedFilters;
  return (
    <div>
      <Card className="rounded-md min-h-200px mb-4">
        <div className="flex justify-center items-center text-2xl text-black font-medium">
          <span>{start_year}&nbsp;</span>-<span>&nbsp;{end_year}</span>
        </div>
        <div className="flex justify-center items-center text-lg text-black">
          <span className="capitalize mt-3">{gender}</span>
        </div>
        <div className="flex justify-center items-center mt-4 flex-wrap">
          {countries &&
            countries.map((country) => (
              <span
                key={country}
                className="mr-2 mt-2 rounded-lg py-1 px-2"
                style={{ backgroundColor: "#dfdfdf", borderRadius: "40%" }}
              >
                {country}
              </span>
            ))}
        </div>
        <div className="flex justify-center items-center mt-4">
          {colors &&
            colors.map((color) => {
              if (color === "Mauv") {
                return (
                  <span
                    style={{ backgroundColor: "#E0B0FF" }}
                    key={color}
                    className="mr-2 h-6 w-6 rounded-full"
                  ></span>
                );
              } else {
                return (
                  <span
                    key={color}
                    className="mr-2 h-6 w-6 rounded-full"
                    style={{ backgroundColor: color }}
                  ></span>
                );
              }
            })}
        </div>
      </Card>
    </div>
  );
};

export default DisplaySelectedFilter;

import React from "react";
import { Card } from "antd";
import DisplaySelectedFilter from "./DisplaySelectedFilter";
import placeholderImage from "../assets/car-placeholder-300x300.png";
import clsx from "clsx";

const SearchResult = ({ selectedFilters, searchResult }) => {
  return (
    <div>
      <DisplaySelectedFilter selectedFilters={selectedFilters} />
      {searchResult &&
        searchResult.map((result) => (
          <div
            key={result.id}
            className={clsx("mb-2 h-200px rounded-md shadow-sm flex bg-white")}
            style={{ border: "1px solid #e2e8f0" }}
          >
            <div className={clsx("w-4/12 h-full")}>
              <img
                src={placeholderImage}
                alt="car-placeholder"
                className={clsx("object-fill w-full h-full")}
              />
            </div>
            <div className={clsx("w-8/12 h-full px-4 mb-2")}>
              <div
                className={clsx("capitalize pt-1 text-left text-black text-xl")}
              >
                {result.first_name}&nbsp;
                {result.last_name}
              </div>
              <div className="flex justify-start">
                <div className="pr-4">
                  <span className="block">Brand</span>
                  <span className="block text-black">{result.car_model}</span>
                </div>
                <div className=" border-l border-r border-black border-solid px-4">
                  <span className="block">Year</span>
                  <span className="block text-black">
                    {result.car_model_year}
                  </span>
                </div>
                <div className=" pl-4 flex flex-col items-center">
                  <span className="block">Color</span>
                  <span
                    className="block h-15px w-15px rounded-full"
                    style={{ backgroundColor: result.car_color }}
                  ></span>
                </div>
              </div>
              <div>
                <div className="flex justify-start mb-2">
                  <div className="mr-4 text-left">
                    <span className="block text-left">Country</span>
                    <span className="block text-black capitalize text-left">
                      {result.country}
                    </span>
                  </div>
                  <div className="mr-4 text-left">
                    <span className="block text-left">Gender</span>
                    <span className="block text-black capitalize text-left">
                      {result.gender}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="block text-left">Job</span>
                    <span className="block text-black capitalize">
                      {result.job_title}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-2 text-left flex items-center justify-start">
                <span className="mr-4 text-left inline-block">Email</span>
                <span className="text-left inline-block text-black">
                  {result.email}
                </span>
              </div>
              <div className="mb-2 text-left flex items-center justify-start">
                <span className="mr-4 text-left inline-block">Bio</span>
                <span className="text-left inline-block text-black truncate">
                  {result.bio}
                </span>
              </div>
            </div>
          </div>
        ))}
      {(!searchResult ||
        !searchResult.length ||
        searchResult.message ||
        searchResult.statusCode === 400) && (
        <div
          className={clsx(
            "mb-2 h-200px rounded-md shadow-sm flex flex-col justify-center items-center uppercase text-lg font-semibold bg-white",
          )}
          style={{ border: "1px solid #e2e8f0" }}
        >
          <span className="mb-4">No Result Found.</span>
          <span>Change search values and try again.</span>
        </div>
      )}
    </div>
  );
};

export default SearchResult;

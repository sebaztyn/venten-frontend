import React, { useState } from "react";
import { RiFilter3Line } from "react-icons/ri";
import { Popover, Select, Button } from "antd";
import clsx from "clsx";

const { Option } = Select;

const Filter = ({
  selectedFilters,
  setSelectedFilters,
  allFilters,
  children,
  filterHandler,
  dateError,
  setDateError,
  setLoading,
}) => {
  const [visible, setVisible] = useState(false);
  const hide = (visible) => setVisible(false);
  const colorsChildren = [];
  const countriesChildren = [];

  for (let i = 0; i < allFilters.colors.length; i++) {
    colorsChildren.push(
      <Option key={i} value={allFilters.colors[i]} name="colors" label="colors">
        {allFilters.colors[i]}
      </Option>,
    );
  }
  for (let i = 0; i < allFilters.countries.length; i++) {
    countriesChildren.push(
      <Option
        key={i}
        value={allFilters.countries[i]}
        name="countries"
        label="countries"
      >
        {allFilters.countries[i]}
      </Option>,
    );
  }

  const inputHandler = (value, option) => {
    setDateError(false);
    let name = option.name;
    setSelectedFilters({
      ...selectedFilters,
      [name]: value,
    });
  };
  const colorHandler = (value) => {
    setDateError(false);
    setSelectedFilters({
      ...selectedFilters,
      colors: value,
    });
  };
  const countryHandler = (value) => {
    setDateError(false);
    setSelectedFilters({
      ...selectedFilters,
      countries: value,
    });
  };

  const contents = (
    <ul className="w-338px flex flex-col justify-start items-stretch min-h-40vh">
      <div className="text-center p-4 mb-1 uppercase font-bold">
        {" "}
        Select Filters
      </div>
      <Button onClick={hide} className="mb-8 uppercase">
        Close
      </Button>
      <div className="border border-black border-solid rounded-md p-2 mb-4">
        <label htmlFor="start_date" className="block mb-2 text-center">
          Select a date range
        </label>
        <li className="mb-1 flex-1 flex items-center" id="start_date">
          {Object.values(allFilters).map((item, index) => {
            const dataKey = Object.keys(allFilters)[index];
            if (dataKey !== "countries" && dataKey !== "colors") {
              if (dataKey === "start_year" || dataKey === "end_year") {
                return (
                  <Select
                    className={clsx(
                      "h-full flex justify-between items-center flex-1",
                      { ["mr-2"]: dataKey === "start_year" },
                    )}
                    defaultValue=""
                    onChange={inputHandler}
                    key={index}
                    name={dataKey}
                    value={selectedFilters[dataKey]}
                  >
                    <Option value="" disabled name={dataKey}>{`Select a ${
                      Object.keys(allFilters)[index]
                    }`}</Option>
                    {item.map((data, index) => (
                      <Option key={index} value={data} name={dataKey}>
                        {data}
                      </Option>
                    ))}
                  </Select>
                );
              } else {
                return;
              }
            } else {
              return;
            }
          })}
        </li>
      </div>
      {Object.values(allFilters).map((item, index) => {
        const dataKey = Object.keys(allFilters)[index];
        if (dataKey !== "countries" && dataKey !== "colors") {
          if (dataKey === "start_year" || dataKey === "end_year") {
            return;
          } else {
            return (
              <div
                key={index}
                className="border border-black border-solid rounded-md p-2 mb-4"
              >
                <label htmlFor="start_date" className="block mb-2 text-center">
                  Pick a Gender
                </label>
                <li key={index} className="mb-1 flex-1">
                  <Select
                    className="w-full h-full flex justify-between items-center"
                    defaultValue=""
                    onChange={inputHandler}
                    value={selectedFilters[dataKey]}
                    name={dataKey}
                  >
                    <Option value="" disabled name={dataKey}>{`Select a ${
                      Object.keys(allFilters)[index]
                    }`}</Option>
                    {item.map((data, index) => (
                      <Option key={index} value={data} name={dataKey}>
                        {data}
                      </Option>
                    ))}
                  </Select>
                </li>
              </div>
            );
          }
        } else if (dataKey === "countries") {
          return (
            <li key={index} className="mb-1 flex-1">
              <Select
                mode="multiple"
                className="h-full w-full"
                placeholder={`Please select ${dataKey}(s)`}
                size="large"
                onChange={countryHandler}
                name="countries"
                optionLabelProp="countries"
              >
                {countriesChildren}
              </Select>
            </li>
          );
        } else if (dataKey === "colors") {
          return (
            <li key={index} className="mb-1 flex-1">
              <Select
                mode="multiple"
                className="h-full"
                placeholder={`Please select ${dataKey}(s)`}
                style={{ width: "100%" }}
                size="large"
                onChange={colorHandler}
                name={dataKey}
              >
                {colorsChildren}
              </Select>
            </li>
          );
        }
      })}

      {dateError && (
        <div className="text-red-500 italic text-center">
          *Start-year cannot be greater than End-year
        </div>
      )}
      <Button
        className="uppercase mt-8"
        onClick={() => {
          if (selectedFilters.end_year < selectedFilters.start_year) {
            setLoading(false);
            return setDateError(true);
          }
          filterHandler();
          if (!dateError) setVisible(false);
        }}
      >
        Apply Filters
      </Button>
    </ul>
  );
  return (
    <div>
      <div className="flex justify-start items-center text-2xl">
        <Popover trigger="click" content={contents} visible={visible}>
          <button onClick={() => setVisible((state) => !state)}>
            <RiFilter3Line />
          </button>
        </Popover>
        <span className="inline-block ml-10px">Filter</span>
      </div>
      {children}
    </div>
  );
};

export default Filter;

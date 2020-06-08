import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import fetch from "../utils/fetchData.js";
import Loading from "./Loading.js";

const Container = () => {
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    start_year: 1990,
    end_year: 1990,
    gender: "",
    countries: null,
    colors: null,
  });
  const [allFilters, setAllFilters] = useState({
    start_year: [],
    end_year: [],
    gender: [],
    countries: [],
    colors: [],
  });
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    const getFilters = async () => {
      setLoading(true);
      try {
        const data = {
          url: `https://cors-anywhere.herokuapp.com/https://ven10.co/assessment/filter.json`,
          method: "GET",
        };
        const fetchResult = await fetch(data);
        fetchResult.map((data, index) => {
          setAllFilters((prevState) => {
            return {
              start_year: [
                ...new Set([...prevState.start_year, data.start_year]),
              ],
              end_year: [...new Set([...prevState.end_year, data.end_year])],
              gender: [...new Set([...prevState.gender, data.gender])].filter(
                (data) => data.length > 0,
              ),
              countries: [
                ...new Set([...prevState.countries, ...data.countries]),
              ],
              colors: [...new Set([...prevState.colors, ...data.colors])],
            };
          });
          return data;
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error :>> ", error);
      }
    };
    getFilters();
    return () => {};
  }, []);

  const evaluateData = (value) => {
    const checkArray = Array.isArray(value);
    if (checkArray) {
      if (value.length > 0) {
        return value;
      }
      return "";
    }
    const check = !!value;
    if (check) return value;
    return "";
  };
  const filterHandler = async () => {
    try {
      setLoading(true);
      const {
        start_year,
        end_year,
        gender,
        countries,
        colors,
      } = selectedFilters;
      const url = `https://venten-test-app.herokuapp.com/cars?${
        evaluateData(start_year) && `start_year=${start_year}`
      }${evaluateData(end_year) && `&end_year=${end_year}`}${
        evaluateData(gender) &&
        `&gender=${gender.charAt(0).toUpperCase() + gender.slice(1)}`
      }${evaluateData(countries) && `&countries=${countries.join("-")}`}${
        evaluateData(colors) && `&colors=${colors.join("-")}`
      }`;
      const data = {
        url,
        method: "GET",
      };
      const fetchResult = await fetch(data);
      setSearchResult(fetchResult.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="bg-custom-grey p-3 flex flex-col">
      <Filter
        selectedFilters={selectedFilters}
        allFilters={allFilters}
        setSelectedFilters={setSelectedFilters}
        filterHandler={filterHandler}
        dateError={dateError}
        setDateError={setDateError}
        setLoading={setLoading}
      >
        <SearchResult
          selectedFilters={selectedFilters}
          searchResult={searchResult}
        />
      </Filter>
      {loading && <Loading />}
    </div>
  );
};

export default Container;

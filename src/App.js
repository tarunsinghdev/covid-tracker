import React, { useState, useEffect } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from '@material-ui/core';
import axios from 'axios';
import InfoBox from './InfoBox';
import './index.css';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph' ;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const onCountryChange = async (e) => {
    const countryName = e.target.value;
    setCountry(countryName);

    const url =
      countryName === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryName}`;
    const response = await axios.get(url);
    setCountryInfo(response.data);
    // console.log(response.data);
  };

  const fetchCountriesData = async () => {
    const response = await axios.get(
      'https://disease.sh/v3/covid-19/countries'
    );
    setCountries(response.data);
    const sortedData = sortData(response.data);
    setTableData(sortedData);
    const response1 = await axios.get('https://disease.sh/v3/covid-19/all');
    setCountryInfo(response1.data);
  };
  useEffect(() => {
    fetchCountriesData();
  }, []);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.countryInfo.iso2}>
                  {country.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recoveries"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map />
      </div>

      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live Cases By Country </h3>
            <Table countriesData={tableData} />
            <h3>Worldwide new cases </h3>
            <LineGraph />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;

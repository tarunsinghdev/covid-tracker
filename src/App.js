import React, { useState, useEffect } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import InfoBox from './InfoBox';
import './index.css';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';
import cuid from 'cuid';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  // const [mapCountries, setMapCountries] = useState([]);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    console.log('country code is ', countryCode);
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    const response = await axios.get(url);
    console.log(response.data);
    setCountry(countryCode);
    setCountryInfo(response.data);
    if (response.data.countryInfo) {
      setMapCenter([
        response.data.countryInfo.lat,
        response.data.countryInfo.long,
      ]);
      setMapZoom(4);
    } else {
      setMapCenter([34.80746, -40.4796]);
      setMapZoom(2);
    }
  };

  useEffect(() => {
    const fetchCountryInfo = async () => {
      const response1 = await axios.get('https://disease.sh/v3/covid-19/all');
      setCountryInfo(response1.data);
    };
    fetchCountryInfo();
  }, []);

  useEffect(() => {
    const fetchCountriesData = async () => {
      const response = await axios.get(
        'https://disease.sh/v3/covid-19/countries'
      );
      const sortedData = sortData(response.data);
      setCountries(response.data);
      // setMapCountries(response.data);
      setTableData(sortedData);
    };
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
                <MenuItem key={cuid()} value={country.countryInfo.iso2}>
                  {country.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo?.todayCases}
            total={countryInfo?.cases}
          />
          <InfoBox
            title="Recoveries"
            cases={countryInfo?.todayRecovered}
            total={countryInfo?.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo?.todayDeaths}
            total={countryInfo?.deaths}
          />
        </div>
        <Map center={mapCenter} zoom={mapZoom} />
      </div>

      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live Cases By Country </h3>
            <Table countriesData={tableData} key={cuid()} />
            <Typography variant="h5">Worldwide new cases</Typography>
            <LineGraph />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;

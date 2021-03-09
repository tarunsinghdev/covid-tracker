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
import { prettyPrintStat, sortData } from './util';
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
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    const response = await axios.get(url);
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
      setMapCountries(response.data);
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
            isRed
            active={casesType === 'cases'}
            onClick={(e) => setCasesType('cases')}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo?.todayCases)}
            total={prettyPrintStat(countryInfo?.cases)}
          />
          <InfoBox
            active={casesType === 'recovered'}
            onClick={(e) => setCasesType('recovered')}
            title="Recoveries"
            cases={prettyPrintStat(countryInfo?.todayRecovered)}
            total={prettyPrintStat(countryInfo?.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === 'deaths'}
            onClick={(e) => setCasesType('deaths')}
            title="Deaths"
            cases={prettyPrintStat(countryInfo?.todayDeaths)}
            total={prettyPrintStat(countryInfo?.deaths)}
          />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live Cases By Country </h3>
            <Table countriesData={tableData} key={cuid()} />
            <Typography className="app__graphTitle" variant="h5">
              Worldwide new {casesType}
            </Typography>
            <LineGraph className="app__graph" casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;

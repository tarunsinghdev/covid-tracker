import cuid from 'cuid';
import { Circle, Popup } from 'react-leaflet';
import React from 'react';
import numeral from 'numeral';

const caseTypeColors = {
  cases: {
    hex: '#CC1034',
    multiplier: 300,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 500,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 700,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? false : true));
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format('0.0a')}` : '+0';

export const showDataOnMap = (data, casesType = 'cases') =>
  data?.map((country) => (
    <Circle
      key={cuid()}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={{
        color: caseTypeColors[casesType].hex,
        fillColor: caseTypeColors[casesType].hex,
        fillOpacity: 0.4,
      }}
      radius={
        Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format('0.0')}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format('0.0')}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format('0.0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

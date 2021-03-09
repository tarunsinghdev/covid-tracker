import cuid from 'cuid';
import { Circle } from 'leaflet';
import React from 'react';

const caseTypeColors = {
  cases: {
    hex: '#CC1034',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? false : true));
};

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
      {/* <Popup>
          <h1>I'm a Popup</h1>
        </Popup> */}
    </Circle>
  ));

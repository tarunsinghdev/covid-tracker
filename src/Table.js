import cuid from 'cuid';
import numeral from 'numeral';
import React from 'react';
import './Table.css';

const Table = ({ countriesData }) => {
  return (
    <div className="table">
      <table>
        <tbody>
          {countriesData.map(({ country, cases, countryInfo }) => (
            <tr key={cuid()}>
              <td>{country}</td>
              <td>
                <strong>{numeral(cases).format(',')}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

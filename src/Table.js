import cuid from 'cuid';
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
                <strong>{cases}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

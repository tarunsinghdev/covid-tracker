import React from 'react';
import './Table.css';

const Table = ({ countriesData }) => {
  return (
    <div className="table">
      {countriesData.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;

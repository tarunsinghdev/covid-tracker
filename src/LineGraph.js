import axios from 'axios';
import numeral from 'numeral';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: true,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          parser: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};
const LineGraph = ({ casesType = 'cases', ...props }) => {
  console.log('from linegraph', casesType);
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
      );
      let chartData = buildChartData(response.data, casesType);
      setData(chartData);
    };
    fetchData();
  }, [casesType]);
  return (
    <>
      {data?.length > 0 && (
        <Line
          className={props.className}
          options={options}
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: 'rgba(204,16,52,0.5)',
                borderColor: '#CC1034',
              },
            ],
          }}
        />
      )}
    </>
  );
};

export default LineGraph;

import React from 'react';
import { defaults, Line } from 'react-chartjs-2';

defaults.global.animation = false;
defaults.global.defaultFontColor = '#fff';

const LineGraph = ({
  datasets,
  labels,
  yAxesLabel,
  xAxesLabel,
  invertY = false,
  yMin = null,
  yMax = null,
}) => {
  const graphData = {
    labels: labels,
    datasets: datasets.map((data) => ({
      label: data.label,
      fill: true,
      lineTension: 0.1,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBorderWidth: 2,
      pointRadius: 3,
      pointHitRadius: 10,
      data: data.data,
      backgroundColor: data.backgroundColor,
      borderColor: data.color,
      hoverBackgroundColor: data.color,
      pointBorderColor: data.color,
      pointHoverBackgroundColor: data.color,
    })),
  };

  const yTick = {
    reverse: invertY,
  };
  if (yMin !== null) yTick['min'] = yMin;
  if (yMax !== null) yTick['max'] = yMax;

  const graphOptions = {
    animation: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: yAxesLabel,
          },
          ticks: {
            maxTicksLimit: 6,
            ...yTick,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: xAxesLabel,
          },
        },
      ],
    },
  };

  const legendOptions = {
    position: 'bottom',
    fontColor: '#fff',
  };

  return (
    <Line data={graphData} options={graphOptions} legend={legendOptions} />
  );
};

export default LineGraph;

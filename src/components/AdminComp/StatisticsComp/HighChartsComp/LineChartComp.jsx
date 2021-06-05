import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineChartComp = ({ categories, series, titleText }) => {
  const options = {
    chart: {
      type: 'spline',
    },
    title: {
      text: titleText,
    },
    xAxis: {
      categories,
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: '#666666',
          lineWidth: 1,
        },
      },
    },
    series,
    credits: {
      enabled: false,
    },
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

LineChartComp.defaultProps = {
  titleText: 'Statistics',
};

export default LineChartComp;

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StackedChartComp = ({ categories, series, titleText }) => {
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: titleText,
    },
    xAxis: {
      categories,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'values',
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: 'gray',
        },
      },
    },
    tooltip: {
      pointFormat: `<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> 
          ({point.percentage:.0f}%)<br/>`,
      shared: true,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
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

StackedChartComp.defaultProps = {
  titleText: '',
};

export default StackedChartComp;

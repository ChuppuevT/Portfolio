import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


function ColumnStat(props) {
  
  let options = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Статистика по методам'
    },
    xAxis: {
        categories: props.columnName,
        crosshair: true
    },
    yAxis: {
        title: {
            text: 'Значение'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:14px"></span><table>',
        footerFormat: '{point.key}</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'кол-во',
        data: props.columnVal

    }]
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />


    </div>
  );


}

export default ColumnStat;
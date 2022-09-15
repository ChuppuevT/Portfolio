import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

let flag = false;
function GraphicStat(props) {
    let options;
    if (props.zn5.length != 0){
        options = {
            title: {
                text: 'Прогнозирование'
            },
    
            yAxis: {
                title: {
                    text: 'Уровень'
                }
            },
    
            xAxis: {
    
                title: {
                    text: 'Дата'
                },
                categories: props.zn3
            },
    
            series: [{
                name: 'Исходный временной ряд',
                data: props.zn4
            }, {
                name: 'Тестовый прогноз',
                data: props.zn5
            }, {
                name: 'Прогноз',
                data: props.zn6
            }],
    
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        }
    }
    else{
        options = {
            title: {
                text: 'Сглаженный временной ряд'
            },
    
            yAxis: {
                title: {
                    text: 'Уровень'
                }
            },
    
            xAxis: {
    
                title: {
                    text: 'Дата'
                },
                categories: props.zn3
            },
    
            series: [{
                name: 'Исходный временной ряд',
                data: props.zn4
            }, {
                name: 'Сглаженный временной ряд',
                data: props.zn2
            }],
    
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        }
    }
    console.log('options', options);

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );


}

export default GraphicStat;
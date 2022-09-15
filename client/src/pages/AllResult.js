import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AllResult.css';
import DropdownInput from '../components/UI/DropdownInput/DropdownInput';
import GraphicStat from '../components/GraphicStat';
import TextStat from '../components/TextStat';

const AllResult = () => {
    let graphDataTemp = {
        arrTime: [],
        arrValStat: [],
        arrColumnVal: [],
        arrColumnName: [],
        arrMaxVal: [],
        arrMinVal: [],
        arrValTest: [],
        arrValForecast: [],
        arrValTime: [],
        arrMethod: [],
        dateCol: '',
        valueCol: '',
    }

    const [datasetKeys, setDatasetKeys] = useState([]);
    const [datasetName, setDatasetName] = useState('');

    const [timeSeriesKeys, setTimeSeriesKeys] = useState([]);
    const [timeSeriesName, setTimeSeriesName] = useState('');

    const [methodsKeys, setMethodsKeys] = useState([]);
    const [methodName, setMethodName] = useState('');

    const [values, setValues] = useState([]);

    const [graphData, setGraphData] = useState(graphDataTemp);

    const [methodBool, setMethodBool] = useState('');

    useEffect(() => {
        axios.get('http://time-series.athene.tech/api/1.0/get-time-series-sets', {})
            .then((res) => setDatasetKeys(res.data.map((el) => el.key)));
    }, []);

    useEffect(() => {
        setTimeSeriesName('');
        if (datasetName) {
            axios.get(`http://time-series.athene.tech/api/1.0/get-time-series-meta?setKey=${datasetName}`, {})
                .then((res) => setTimeSeriesKeys(res.data.map((el) => el.key)));
        }
    }, [datasetName]);

    useEffect(() => {
        setMethodName('');
        if (timeSeriesName) {
            axios.get(`http://time-series.athene.tech/api/1.0/get-time-series?setKey=${datasetName}&timeSeriesKey=${timeSeriesName}`, {})
                .then((res) => setValues(res.data.values));

            axios.get('http://time-series.athene.tech/api/1.0/availableMethods', {})
                .then((res) => setMethodsKeys(res.data.map((el) => el.key)));
        }
    }, [timeSeriesName]);

    useEffect(() => {
        if (methodName && values) {
            axios.post('http://time-series.athene.tech/api/1.0/getSpecificMethodForecast', {
                "originalTimeSeries": {
                    "values": values,
                    "name": "test",
                    "key": 1,
                    "length": values.length,
                    "empty": false
                },
                "methodClassName": methodName, 
                "countForecast": 4,
            })
                .then((res) => {
                    for (let i = 0; i < values.length; i++) {
                        graphDataTemp.arrTime[i] = values[i].date.substr(0, 10)
                        graphDataTemp.arrValStat[i] = +values[i].value
                        if (i < values.length - 1) {
                            graphDataTemp.arrValForecast[i] = null
                        }

                        if (i < values.length - res.data.testForecast.length) {
                            graphDataTemp.arrValTest[i] = null
                        } else {
                            graphDataTemp.arrValTest[i] = res.data.testForecast.values[i - (values.length - res.data.testForecast.length)].value
                        }

                    }
                    console.log(graphDataTemp)

                    for (let i = values.length; i < values.length + res.data.timeSeries.length; i++) {
                        graphDataTemp.arrValForecast[i - 1] = res.data.timeSeries.values[i - values.length].value
                        if (i < values.length + res.data.timeSeries.length - 1) {
                            graphDataTemp.arrTime[i] = res.data.timeSeries.values[i - values.length + 1].date.substr(0, 10)
                        }
                    }

                    graphDataTemp.arrMethod.name = res.data.timeSeriesMethod.name;
                    graphDataTemp.arrMethod.value = res.data.score.value;

                    //methodBool = 'true'
                    setMethodBool('methodBool')
                    setGraphData(graphDataTemp);
                });
        }
    }, [methodName, values])

    console.log('graphData', graphData);

    return (
        <div className="page-container">
            <div className="content-wrap">
                <h1>Здесь доступны публичные датасеты!</h1>
                {datasetKeys.length > 0 && <DropdownInput name={datasetName || 'Выберите имя датасета'} items={datasetKeys} onClick={setDatasetName} />}
                {timeSeriesKeys.length > 0 && <DropdownInput name={timeSeriesName || 'Выберите имя временного ряда'} items={timeSeriesKeys} onClick={setTimeSeriesName} />}
                {methodsKeys.length > 0 && <DropdownInput name={methodName || 'Выберите метод'} items={methodsKeys} onClick={setMethodName} />}
                
                {methodBool.length > 2 && <GraphicStat
                    zn2={graphData.arrVal}
                    zn3={graphData.arrTime}
                    zn4={graphData.arrValStat}
                    zn5={graphData.arrValTest}
                    zn6={graphData.arrValForecast}
                    zn7={graphData.arrValTime}
                />}
                {methodBool.length > 2 && <TextStat methodRes={graphData.arrMethod}/>}
            </div>
        </div>
    )
};

export default AllResult;

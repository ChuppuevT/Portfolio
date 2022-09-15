import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import InputArea from '../UI/Input/InputArea';
import ButtonStart from '../UI/Button/ButtonStart';
import { createTable } from '../../scripts';
import axios from 'axios';
import DropdownInput from '../UI/DropdownInput/DropdownInput';

//ПРОГНОЗ
const InputForecasting = (props) => {
    let graphData = {
        arrTime: [],
        arrValStat: [],
        arrColumnVal: [],
        arrColumnName: [],
        arrMaxVal: [],
        arrMinVal: [],
        arrValTest: [],
        arrValForecast: [],
        arrMethod: [],
        dateCol: '',
        valueCol: '',
    }

    const activateForecasting = (mas) => axios.post('http://time-series.athene.tech/api/1.0/getForecast', {
        "countForecast": forecast,
        "originalTimeSeries": {
            "values": mas,
            "name": "test",
            "length": mas.length,
            "empty": false
        }
    }).then(function (res) {
        console.log('Ответ сервера успешно получен!');
        //исходные
        for (let i = 0; i < mas.length; i++) {
            graphData.arrTime[i] = mas[i].date.substr(0, 10)
            graphData.arrValStat[i] = +mas[i].value
            if (i < mas.length - 1) {
                graphData.arrValForecast[i] = null
            }

            if (i < mas.length - res.data.testForecast.length) {
                graphData.arrValTest[i] = null
            } else {
                graphData.arrValTest[i] = res.data.testForecast.values[i - (mas.length - res.data.testForecast.length)].value
            }

        }
        console.log(graphData.arrTime)

        for (let i = mas.length; i < mas.length + res.data.timeSeries.length; i++) {
            graphData.arrValForecast[i - 1] = res.data.timeSeries.values[i - mas.length].value
            if (i < mas.length + res.data.timeSeries.length - 1) {
                graphData.arrTime[i] = res.data.timeSeries.values[i - mas.length + 1].date.substr(0, 10)
            }
        }

        graphData.arrMethod.name = res.data.timeSeriesMethod.name;
        graphData.arrMethod.value = res.data.score.value;

        graphData.dateCol = date;
        graphData.valueCol = value;

        let count = +localStorage.getItem(res.data.timeSeriesMethod.key);
        localStorage.setItem(res.data.timeSeriesMethod.key, ++count);

        props.onActivate(graphData);
    }).catch(function (error) {
        console.log(error)
    })

    const [date, setDate] = useState('');
    const [value, setValue] = useState('');
    const [forecast, setForecast] = useState('');

    const onClickHandle = () => {
        const res = createTable(date, value, props.mas);
        activateForecasting(res);
    }

    return (
        <div>
            <DropdownInput disabled={!props.mas.length} items={props.mas[0]} onClick={setDate} name={date || 'Введите имя стобца с датой'} />
            <DropdownInput disabled={!props.mas.length} items={props.mas[0]} onClick={setValue} name={value || 'Введите имя стобца со значениями'} />
            <InputArea value={forecast} onChange={setForecast} disabled={!props.mas.length} name={'Укажите длину прогноза данных'} />
            <ButtonStart disabled={!date || !value || !forecast} onClick={onClickHandle} name={'Готово'} />
        </div>
    )
}

export default InputForecasting;
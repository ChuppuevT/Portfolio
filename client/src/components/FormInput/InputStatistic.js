import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import InputArea from '../UI/Input/InputArea';
import ButtonStart from '../UI/Button/ButtonStart';
import { createTable } from '../../scripts';
import axios from 'axios';
import DropdownInput from '../UI/DropdownInput/DropdownInput';

//СГЛАЖ ВР РЯД
const InputStatistic = (props) => {
    let graphData = {
        arrTime: [],
        arrValStat: [],
        arrVal: [],
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

    const activateStatistic = (mas) => axios.post('http://time-series.athene.tech/api/1.0/getSmoothed', {
        "values": mas,
        "name": "test",
        "key": "1",
        "length": mas.length,
        "empty": false
    }).then(function (res) {
        console.log('Ответ сервера успешно получен!');
        graphData.arrValTest = [];
        graphData.arrValForecast = [];
        graphData.arrValTime = [];

        console.log(res)

        //достаем данные времени и значений для графика моделей
        for (let i = 0; i < res.data.timeSeries.length; i++) {
            graphData.arrVal[i] = res.data.timeSeries.values[i].value //данные сглаженного временного ряда
            graphData.arrTime[i] = res.data.timeSeries.values[i].date.substr(0, 10) //дата
            graphData.arrValStat[i] = +mas[i].value //время
        }
        //ZNACH = res.data.timeSeries.values

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

    const onClickHandle = () => {
        const res = createTable(date, value, props.mas);
        activateStatistic(res);
    }

    return (
        <div>
            <DropdownInput disabled={!props.mas.length} items={props.mas[0]} onClick={setDate} name={date || 'Введите имя стобца с датой'} />
            <DropdownInput disabled={!props.mas.length} items={props.mas[0]} onClick={setValue} name={value || 'Введите имя стобца со значениями'} />
            <ButtonStart disabled={!date || !value} onClick={onClickHandle} name={'Готово'} />
        </div>

    )
}
export default InputStatistic;
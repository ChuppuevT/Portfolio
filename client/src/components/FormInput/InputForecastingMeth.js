import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import InputArea from '../UI/Input/InputArea';
import DropdownForecasting from '../UI/Dropdown/DropdownForecasting';
import ButtonStart from '../UI/Button/ButtonStart';
import axios from 'axios';
import { createTable } from '../../scripts';
import DropdownInput from '../UI/DropdownInput/DropdownInput';

const InputForecastingMeth = (props) => {
    let graphData = {
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

    const [methods, setMethods] = useState();

    useEffect(async () => {
        await axios.get('http://time-series.athene.tech/api/1.0/availableMethods', {
        }).then(function (res) {
            setMethods(res.data);
        }).catch(function (error) {
            console.log('error', error)
        })
    }, []);

    const activateForecastingMeth = (mas) => axios.post('http://time-series.athene.tech/api/1.0/getSpecificMethodForecast', {
        "originalTimeSeries": {
            "values": mas,
            "name": "test",
            "key": 1,
            "length": mas.length,
            "empty": false
        },
        "methodClassName": activeMethod.key, //сюда строку нужно из дропдауна
        "countForecast": forecast,
    }).then(function (res) {
        console.log('Ответ сервера успешно получен!');
        console.log(res);
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

        console.log(res)

        props.onActivate(graphData);

    }).catch(function (error) {
        console.log(error)
    })

    const [date, setDate] = useState('');
    const [value, setValue] = useState('');
    const [forecast, setForecast] = useState('');

    const [activeMethod, setActiveMethod] = useState();

    const onClickHandle = () => {
        const res = createTable(date, value, props.mas);
        activateForecastingMeth(res);
    }

    const onChangeMethod = (value) => {
        setActiveMethod(value);
        console.log(value);
    }

    return (
        <div>
            <DropdownInput disabled={!props.mas.length} items={props.mas[0]} onClick={setDate} name={date || 'Введите имя стобца с датой'} />
            <DropdownInput disabled={!props.mas.length} items={props.mas[0]} onClick={setValue} name={value || 'Введите имя стобца со значениями'} />
            <InputArea value={forecast} onChange={setForecast} disabled={!props.mas.length} name={'Укажите длину прогноза данных'} />
            {methods && <DropdownForecasting onClick={onChangeMethod} name={'Выберите метод прогнозирования'} methods={methods} />}
            <ButtonStart disabled={!date || !value || !forecast || !activeMethod} onClick={onClickHandle} name={'Готово'} />
        </div>
    )
}

export default InputForecastingMeth;
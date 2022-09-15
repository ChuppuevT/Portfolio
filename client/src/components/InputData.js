import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import GraphicStat from './GraphicStat';
import ColumnStat from './ColumnStat';
import TextStat from './TextStat';
import Dropdown from 'react-bootstrap/Dropdown';
import InputStatistic from './FormInput/InputStatistic';
import InputForecasting from './FormInput/InputForecasting';
import InputForecastingMeth from './FormInput/InputForecastingMeth';
import ButtonStart from './UI/Button/ButtonStart';
import { Context } from '..';
import { createTable } from '../scripts';
import CenteredModal from './UI/Modal/Modal';


const DROPDOWN_ITEM = [
    { id: 1, title: "Сглаженный временной ряд", value: "statistic" },
    { id: 2, title: "Прогнозирование", value: "forecasting" },
    { id: 3, title: "Прогнозирование по методу", value: "forecastingMeth" },
];

const InputData = (props) => {
    const [activeItem, setActiveItem] = useState();
    const [graphData, setGraphData] = useState();
    const [modalShow, setModalShow] = useState(false);

    const [availableMethods, setAvailableMethods] = useState([]);

    const { user } = useContext(Context);

    const statData = useMemo(() => 
        availableMethods.map((el) => +localStorage.getItem(el))
    , [availableMethods, graphData]);

    console.log(availableMethods, statData);

    useEffect(async () => {
        await axios.get('http://time-series.athene.tech/api/1.0/availableMethods', {
        }).then(function (res) {
            setAvailableMethods(res.data.map((el) => el.key));
        }).catch(function (error) {
            console.log('error', error)
        })
    }, []);

    const handleStatisticClick = (id) => {
        setActiveItem(DROPDOWN_ITEM.find((f) => f.id === id));
    }
    console.log('graphData', graphData);
    const save = () => {
        axios.post(`http://time-series.athene.tech/api/1.0/add-time-series?setKey=${user.id}`, {
            "values": graphData.arrValStat.map((val, index) => ({ "date": graphData.arrTime[index], "value": val })),
            "name": "test",
            "key": "1",
            "length": graphData.arrValStat.length,
            "empty": false
        });
    }
    console.log(graphData);
    return (
        <div>
            <h3>Шаг 2 - Выберите тип анализа и зполните поля:</h3>

            <Dropdown >
                <Dropdown.Toggle id="dropdown-button-dark-example1" className='inputType' variant="secondary">
                    Выберите тип анализа
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                    {DROPDOWN_ITEM.map((item) => (
                        <Dropdown.Item key={item.id} onClick={() => handleStatisticClick(item.id)}>{item.title}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            {activeItem?.value === 'forecastingMeth' && <InputForecastingMeth onActivate={setGraphData} mas={props.mas} />}
            {activeItem?.value === 'forecasting' && <InputForecasting onActivate={setGraphData} mas={props.mas} />}
            {activeItem?.value === 'statistic' && <InputStatistic onActivate={setGraphData} mas={props.mas} />}

            {graphData &&
                <>
                    <GraphicStat
                        zn2={graphData.arrVal}
                        zn3={graphData.arrTime}
                        zn4={graphData.arrValStat}
                        zn5={graphData.arrValTest}
                        zn6={graphData.arrValForecast}
                        zn7={graphData.arrValTime}
                    />
                    <ColumnStat
                        columnVal={statData}
                        columnName={availableMethods}
                    />
                    <TextStat methodRes={graphData.arrMethod} />
                    
                    {user.isAuth && <ButtonStart onClick={() => setModalShow(true)} name='Публичное сохранение' />}
                </>
            }
            <CenteredModal data={graphData && createTable(graphData.dateCol, graphData.valueCol, props.mas)} show={modalShow} onSave={() => {}} onHide={() => setModalShow(false)} />
        </div>

    )
}


export default InputData;
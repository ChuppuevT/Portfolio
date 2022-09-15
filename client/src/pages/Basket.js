import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DropdownInput from '../components/UI/DropdownInput/DropdownInput';
import ButtonStart from '../components/UI/Button/ButtonStart';
import { Dropdown } from 'react-bootstrap';
const Basket = () => {

    const [datasetKeys, setDatasetKeys] = useState([]);
    const [datasetName, setDatasetName] = useState('');

    const [timeSeriesKeys, setTimeSeriesKeys] = useState([]);
    const [timeSeriesName, setTimeSeriesName] = useState('');

    const [methodsKeys, setMethodsKeys] = useState([]);
    const [methodName, setMethodName] = useState('');

    const [values, setValues] = useState([]);
    const [activeItem, setActiveItem] = useState();
    const DROPDOWN_ITEM = [
        { id: 1, title: "Удалить датасет", value: "deleteAll" },
        { id: 2, title: "Удалить временной ряд у датасета", value: "deleteSome" },
    ];



    useEffect(() => {
        setDatasetName('');
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


        }
    }, [timeSeriesName]);


    const delAll = () => {
        axios.delete(`http://time-series.athene.tech/api/1.0/delete-time-series-set?setKey=${datasetName}`, {})
            .then((res) => {
                console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
                setDatasetName('');
                
                axios.get('http://time-series.athene.tech/api/1.0/get-time-series-sets', {})
                    .then((res) => setDatasetKeys(res.data.map((el) => el.key)));
                alert('успешно удалено')
            });
    }

    const delSome = () => {
        axios.delete(`http://time-series.athene.tech/api/1.0/delete-time-series?setKey=${datasetName}&timeSeriesKey=${timeSeriesName}`, {})
            .then((res) => {
                console.log('iiiiiiiiiiiiiiiiiiiiii');
                setTimeSeriesName('');
                
                axios.get(`http://time-series.athene.tech/api/1.0/get-time-series-meta?setKey=${datasetName}`, {})
                    .then((res) => setTimeSeriesKeys(res.data.map((el) => el.key)));
                alert('успешно удалено')
            });
    }

    const handleStatisticClick = (id) => {
        setActiveItem(DROPDOWN_ITEM.find((f) => f.id === id));
    }


    return (
        <div className="page-container">
            <div className="content-wrap">
                <h1>Здесь можно удалять данные!</h1>
                <Dropdown >
                    <Dropdown.Toggle id="dropdown-button-dark-example1" className='inputType' variant="secondary">
                        Выберите что нужно удалить
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                        {DROPDOWN_ITEM.map((item) => (
                            <Dropdown.Item key={item.id} onClick={() => handleStatisticClick(item.id)}>{item.title}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                {activeItem?.value === 'deleteAll' &&
                    <>
                        <DropdownInput name={datasetName || 'Выберите имя датасета'} items={datasetKeys} onClick={setDatasetName} />
                        {datasetName.length > 0 && <ButtonStart className='del' onClick={delAll} types='danger' name='Удалить датасет' />}
                    </>
                }



                {activeItem?.value === 'deleteSome' &&
                    <>

                        <DropdownInput name={datasetName || 'Выберите имя датасета'} items={datasetKeys} onClick={setDatasetName} />
                        {timeSeriesKeys.length > 0 && <DropdownInput name={timeSeriesName || 'Выберите имя временного ряда'} items={timeSeriesKeys} onClick={setTimeSeriesName} />}
                        {timeSeriesName.length > 0 && <ButtonStart className='del' onClick={delSome} types='danger' name='Удалить временной ряд' />}
                    </>
                }


            </div>
        </div>
    )
};

export default Basket;


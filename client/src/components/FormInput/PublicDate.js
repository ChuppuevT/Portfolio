import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import InputArea from '../UI/Input/InputArea';
import DropdownForecasting from '../UI/Dropdown/DropdownForecasting';
import ButtonStart from '../UI/Button/ButtonStart';
import axios from 'axios';
import { createTable } from '../../scripts';

const PublicDate = (props) => {
    

    const [methods, setMethods] = useState();

    useEffect(async () => {
        await axios.get('http://time-series.athene.tech/api/1.0/get-time-series-sets', {
        }).then(function (res) {
            setMethods(res.data);
        }).catch(function (error) {
            console.log('error', error)
        })
    }, []);

    
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
            
            {methods && <DropdownForecasting onClick={onChangeMethod} name={'Набор временных рядов'} methods={methods} />}
            
        </div>
    )
}

export default InputForecastingMeth;
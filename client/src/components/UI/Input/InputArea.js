import React from 'react';
import Form from 'react-bootstrap/Form'
import './InputArea.css';

const InputArea = (props) => {
    return (
        <div>
            <Form.Label>{props.name}</Form.Label>
            <Form.Control
                value={props.value}
                onChange={(v) => props.onChange(v.target.value)}
                className='inputData'
                placeholder={props.disabled ? "Сначала загрузите файл" : ""}
                disabled={props.disabled}
            />
        </div>

    )
}
export default InputArea;
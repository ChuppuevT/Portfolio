
import React from 'react';
import Button from 'react-bootstrap/Button'
import './ButtonStart.css'

const ButtonStart = (props) =>{
    return (
        <div className='btnGo'>
            <Button onClick={props.onClick} disabled={props.disabled} variant={props.types || "secondary"}>{props.name}</Button>
        </div>
    )
}
export default ButtonStart;
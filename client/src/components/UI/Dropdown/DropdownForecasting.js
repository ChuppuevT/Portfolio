import React from 'react';
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown';
import './DropdownForecasting.css'; 

//{props.methods.map(m => <Dropdown.Item>{m}</Dropdown.Item> )}
const DropdownForecasting = (props) =>{
    return (
        <div>
            <Dropdown >
                <Dropdown.Toggle disabled={props.disabled} id="dropdown-button-dark-example1" className='inputType' variant="secondary">
                    {props.name}
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                    {props.methods.map(m => <Dropdown.Item key={m.key} onClick={() => props.onClick(m)}>{m.name}</Dropdown.Item> )}
                </Dropdown.Menu>
            </Dropdown>
        </div>  
    )
}

export default DropdownForecasting;
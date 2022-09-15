import React from 'react';
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown';
import './DropdownInput.css'; 

//{props.methods.map(m => <Dropdown.Item>{m}</Dropdown.Item> )}
const DropdownInput = (props) =>{
    return (
        <div>
            <Dropdown >
                <Dropdown.Toggle disabled={props.disabled} id="dropdown-button-dark-example1" className='inputType' variant="secondary">
                    {props.name}
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                    {props.items && props.items.map(m => <Dropdown.Item key={m} onClick={() => props.onClick(m)}>{m}</Dropdown.Item> )}
                </Dropdown.Menu>
            </Dropdown>
        </div>  
    )
}

export default DropdownInput;
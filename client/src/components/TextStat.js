import React from 'react';


const TextStat = (props) => {
    return (
        <div>
            <h3>Метод: {props.methodRes.name}</h3>
            <h4>Оценка: {props.methodRes.value}</h4>
        </div>
        
    )
}
export default TextStat;
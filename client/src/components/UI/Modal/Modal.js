import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InputArea from '../Input/InputArea';
import './Modal.css';
import axios from 'axios';

const CenteredModal = (props) => {
    const [datasetName, setDatasetName] = useState('');
    const [timeSeriesName, setTimeSeriesName] = useState('');

    const handleSave = async () => {
        await axios.post(`http://time-series.athene.tech/api/1.0/add-time-series?setKey=${datasetName}`, {
            "values": props.data,
            "name": timeSeriesName,
            "key": "1",
            "length": props.data.length,
            "empty": false
        });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="backdrop"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Сохранить
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputArea value={datasetName} onChange={setDatasetName} name="Укажите имя датасета" />
                <InputArea value={timeSeriesName} onChange={setTimeSeriesName} name="Придумайте имя временного ряда" />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSave}>Сохранить</Button>
                <Button onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CenteredModal;
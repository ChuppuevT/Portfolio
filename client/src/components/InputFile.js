import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form'
import InputData from './InputData';
import InputForecastingMeth from './FormInput/InputForecastingMeth';

const InputFile = (props) => {

    const handleFileUpload = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            props.processData(data);
        };
        reader.readAsBinaryString(file);
    }

    return ( //обрабатывает и возвращ таблицу
        <div>
            <h3>Шаг 1 - Загрузите файл с исходными данными:</h3>
            <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
            />
            <DataTable
                pagination
                highlightOnHover
                columns={props.columns}
                data={props.data}
            />
        </div>
    );
}

export default InputFile;
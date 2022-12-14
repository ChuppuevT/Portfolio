import React, { useState } from 'react';
import InputFile from '../components/InputFile';
import InputData from '../components/InputData';
import './Content.css';
import PhotoContent from '../components/PhotoContent';

const Content = () => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    const [mas, setMas] = useState([]);

    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            if (headers && row.length == headers.length) {
                const obj = {};
                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] == '"')
                            d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] == '"')
                            d = d.substring(d.length - 2, 1);
                    }
                    if (headers[j]) {
                        obj[headers[j]] = d;
                    }
                }


                if (Object.values(obj).filter(x => x).length > 0) {
                    list.push(obj);
                }
            }
        }

        let temp = [];
        for (let i = 0; i < dataStringLines.length; i++) {
            temp[i] = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        }
        setMas(temp);

        const columns = headers.map(c => ({
            name: c,
            selector: c,
        }));

        setData(list);
        setColumns(columns);


    }
    console.log('contentdata-------',mas);
    return (
        
        
        <div className="page-container">
            <div className="content-wrap">
                <PhotoContent/>
                <InputFile columns={columns} data={data} processData={processData} />
                <InputData mas={mas} />
          
            </div>
        </div>
        
    );
}

export default Content;

import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { observer } from "mobx-react-lite";
import "./Info.css";

const Info = observer(() => {


    return (
    <div className="page-container">
      <div className="content-wrap">
        <h1>лучший сервис в мире!</h1>
        
      </div>
    </div>
    );
});

export default Info;

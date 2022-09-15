import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          <p className="col-sm">
              <a className='foot' href="https://ulstu.ru/">ulstu.ru</a>  |  <a className='foot' href="http://time-series.athene.tech/swagger-ui/index.html">API for developers</a>   |  <a className='foot' href="#">Ulyanovsk State Technical University {new Date().getFullYear()}</a>  
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
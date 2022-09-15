import React, { useContext } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, INFO, PublicStatistic } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';
import './NavBar.css';
//import jwt_decode from 'jwt-decode'

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <img className='icon' src="https://www.pngmart.com/files/7/Graph-PNG-Transparent-Image.png" />
            <Container fluid>
                <NavLink className="d-flex row align-items-center" style={{ fontFamily: 'monospace', color: 'white', textDecoration: 'none', fontSize: '25px' }} to={SHOP_ROUTE}>Сглаживание 2.0</NavLink>
                <NavLink className="lk d-flex row align-items-center" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }} to={PublicStatistic}>Публичные данные</NavLink>
                <NavLink className="lk d-flex row align-items-center" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }} to={INFO}>О временных рядах</NavLink>

                {user.isAuth ?

                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        {user.isAdmin ?
                            <Button
                                variant={"outline-light"}
                                className="mr-2"
                                onClick={() => history.push(BASKET_ROUTE)}
                            >
                                Админ панель
                            </Button>
                            :
                            <div></div>
                        }


                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;

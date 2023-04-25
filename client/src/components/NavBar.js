import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";


//чтобы mobx мог отслеживать изменения в реальном времени компонент надо сделать обозреваемым

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Online Shop</NavLink>
            {user.isAuth ? 
                <Nav className="ml-auto" style={{color: 'white'}}>
                    <Button 
                        variant={'outline-light'} 
                        onClick={() => navigate(ADMIN_ROUTE)}
                    >
                        Админ панель
                    </Button>
                    <Button
                        variant={'outline-light'}
                        onClick={() => navigate(BASKET_ROUTE)}
                        className='ms-4'
                    >
                        Корзина
                    </Button>
                    <Button 
                        variant={'outline-light'} 
                        onClick={() => logOut()}
                        className='ms-4'
                    >
                        Выйти
                    </Button>
                </Nav>
                :
                <Nav className="ml-auto" style={{color: 'white'}}>
                    <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
            }
            </Container>
        </Navbar>
    );
})

export default NavBar;
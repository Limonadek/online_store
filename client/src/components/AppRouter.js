import React, { useContext, useEffect } from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import { Context } from "../index";
import { authRoutes } from "../routes";
import { publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";

// Routes заменяет switch
// атрибут component тега Route заменился на element
// exact нужен для того чтобы путь точно совпадал

const AppRouter = () => {

    // const user = useContext(Context);;

    const {user} = useContext(Context);

    console.log(user);

    return (
        // <>
        <Routes> 
            {user.isAuth === true && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />}  exact ></Route>
            )}
            <Route path='*' element={<Navigate to={SHOP_ROUTE} />} />

        </Routes>
        // <Navigate to={SHOP_ROUTE} />
        /* </> */
    );
};

export default AppRouter;
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {BrowserRouter} from 'react-router-dom';
import { Context } from "./index.js";
import { check } from "./http/userApi.js";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Spinner from "react-bootstrap/esm/Spinner";

const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      user.setUser(data);
      user.setIsAuth(true);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;

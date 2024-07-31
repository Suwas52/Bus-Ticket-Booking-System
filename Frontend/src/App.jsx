import React, { useContext } from "react";
import LandingPage from "./pages/User/LandingPage";
import "./styles/main.scss";
import SignUp from "./pages/Authentication/SignUp";
import Login from "./pages/Authentication/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Admin/home/Home'
import List from './pages/Admin/list/List'
import Single from './pages/Admin/single/Single'
import New from './pages/Admin/new/New'
import { productInputs, userInputs } from './Formsource'
import "./styles/dark.scss"
import { DarkModeContext } from './pages/Admin/context/DarkModeContext'
import AboutPage from './pages/User/AboutPage';

const App = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<LandingPage />} />
            <Route path='login' element={<Login/>} />
            <Route path='users'>
              <Route index element={<List/>} />
              <Route path=':userId' element={<Single/>} />
              <Route path='new' element={<New  inputs={userInputs} title="Add New User"/>} />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path='about' element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import GalleryHome from './pages/GalleryHome';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error'

const Routes = () => (<Switch>
    <Route exact path='/'>
        <GalleryHome />
    </Route>
    <Route path='/login'>
        <Login />
    </Route>
    <Route path='/register'>
        <Register />
    </Route>
    <Route path='/'>
        <Error />
    </Route>
</Switch>)

export default Routes
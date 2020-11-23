import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import PrivateRoute from "./PrivateRouter";
import App from "./components/pages/App";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import ClassDetail from "./components/pages/ClassDetail";

const Router = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={App}/>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/signup" component={SignUp}/>
                <PrivateRoute exact path="/detail/:id" component={ClassDetail}/>
        </Switch>
     );
}

export default Router;
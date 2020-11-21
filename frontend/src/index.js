import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/pages/App';
import reportWebVitals from './reportWebVitals';
import 'fontsource-roboto';
import SignUp from "./components/authentication/SignUp";
import SignIn from "./components/authentication/SignIn";
import {Route, BrowserRouter as Router} from "react-router-dom";
import ClassDetail from "./components/pages/ClassDetail";
import {Spinner} from "./components/loading/Spinner";
import JoinClass from "./components/classroom/misc/CreateJoin/JoinClass";
import CreateClass from "./components/classroom/misc/CreateJoin/CreateClass";

const routing = (
    <React.Fragment>
        <Router>
            <div>
                <Route exact path="/" component={App}/>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/detail/:id" component={ClassDetail}/>
                <Route exact path="/join" component={JoinClass}/>
                <Route exact path={"/create"} component={CreateClass}/>
            </div>
            <Spinner/>
        </Router>
    </React.Fragment>

)

ReactDOM.render(routing,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import { Router, Route, hashHistory } from "react-router"

import Login from "./Login";
import App from "./App";

class AppRoutes extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Login}/>
                <Route path="/page1" component={App} />
            </Router>
        );
    }
}
export default AppRoutes;
import React from "react";
import {FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import {Link, Redirect,history} from "react-router"
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: "",
            password: "",
            nevigateTo:false
        }
    }
    render() {
        return (
            <div>
                <h1 className="text-center">Login Page</h1>
                <div className="login-page">

                    <FormGroup>
                        <ControlLabel>Email Id</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.emailId}
                            placeholder="Enter Email Id "
                            onChange={this.updateEmailId.bind(this)}
                        />
                        <ControlLabel className="margin-top-10">Password</ControlLabel>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            placeholder="Enter Password "
                            onChange={this.updatePassword.bind(this)}
                        />
                    </FormGroup>

                </div>
                <div className="logint-btn text-center">
                    <Link to={this.state.nevigateTo ?"/page1":""}>
                    <Button className="text-center" bsStyle="primary" bsSize="small" onClick={this.handleLogin.bind(this)}>
                        Login
            </Button>
            </Link>
                </div>
            </div>
        );
    }

    updateEmailId(e) {
        this.setState({ emailId: e.target.value });
    }

    updatePassword(e) {
        this.setState({ password: e.target.value })
    }
    
    handleLogin(){
        if(this.state.emailId==="user@gmail.com" && this.state.password==="a@asd"){
           this.setState({nevigateTo:true});
        }else{
            alert("Wrong Credentials.")
        }
    }
}

export default Login;
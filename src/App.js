import React, { Component } from 'react';
import { Row, Col, FormControl, Table, Button } from "react-bootstrap";
import { Link } from "react-router"
import logo from './logo.svg';
import './App.css';
import axios from "axios"


class App extends Component {
  constructor() {
    super();
    this.state = {
      id:"",
      name: "",
      phone: "",
      city: "",
      country: "",
      userData: [
        {
          name: "Saurabh",
          phone: "1234567890",
          city: "Nagar",
          country: "India"
        },
        {
          name: "Sagar",
          phone: "12345678",
          city: "Jalgaon",
          country: "India"
        },
        {
          name: "Nagesh",
          phone: "1234590",
          city: "Nanded",
          country: "India"
        }

      ]
    }
  }
  render() {
    return (
      <div className="App">
        <h1>User Basic <i>CRUD</i> Operations</h1>
        <Row>
          <Col md={4}>
            <select onChange={this.handleSelectChange.bind(this)}>
            <option>Select Id</option>
             {this.state.userData.map((user)=>{
               return(
                 <option>{user.id}</option>
               );
             })}
            </select>
            <FormControl placeholder="Enter Name" type="text" value={this.state.name} onChange={this.updateData.bind(this, "name")} />
            <FormControl className="margin-top-30" placeholder="Enter Phone" type="text" value={this.state.phone} onChange={this.updateData.bind(this, "phone")} />
            <FormControl className="margin-top-30" placeholder="Enter City" type="text" value={this.state.city} onChange={this.updateData.bind(this, "city")} />
            <FormControl className="margin-top-30" placeholder="Enter Country" type="text" value={this.state.country} onChange={this.updateData.bind(this, "country")} />
            <Button onClick={this.handleSaveClick.bind(this)} className="margin-top-30" bsStyle="primary">SAVE</Button>
            <Button onClick={this.handleDeleteClick.bind(this)} className="margin-top-30" bsStyle="primary">DELETE</Button>
          </Col>
          <Col md={6} className="table-style">
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>UID</th>
                  <th>TITLE</th>
                  <th>BODY</th>
                </tr>
              </thead>
              <tbody>
                {this.state.userData.map((user, i) => {
                  return (<tr>
                    <td>{user.userId}</td>
                    <td>{user.id}</td>
                    <td>{user.title}</td>
                    <td>{user.body}</td>
                  </tr>)
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
  componentDidMount() {
    this.getUserData();
  }
  handleSelectChange(e){
    this.setState({id:e.target.value});
  }
  handleSaveClick() {
    let config = {
      method: 'post',
      url: "https://jsonplaceholder.typicode.com/posts",
      data: {
        id: this.state.name,
        userId: this.state.phone,
        title: this.state.city,
        body: this.state.country
      }
    }
    if(this.state.id){
      config.method='put'
    }
    axios(config).then((response) => {
      this.setState({
        name:"",phone:"",city:"",country:""
      })
      this.getUserData();
    });
  }
  handleDeleteClick(){
    debugger;
    let id=parseInt(this.state.id);
    let config={
      method:'delete',
      url: "https://jsonplaceholder.typicode.com/posts/"+id
    }
    axios(config).then(()=>{
      this.getUserData();
    })
  }
  getUserData() {
    let config={
      method: 'get',
      url: "https://jsonplaceholder.typicode.com/posts"

    }
    axios(config)
      .then((response) => {
        this.setState({ userData: response.data })
      });
  }
  updateData(filedName, e) {
    switch (filedName) {
      case "name": this.setState({ name: e.target.value });
        break;
      case "phone": this.setState({ phone: e.target.value });
        break;
      case "city": this.setState({ city: e.target.value });
        break;
      case "country": this.setState({ country: e.target.value });
        break;

    }
  }
}

export default App;

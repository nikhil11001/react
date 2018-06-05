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
      uid: "",
      title: "",
      body: "",
      selectedId:"",
      userData: []
    }
  }
  render() {
    return (
      <div className="App">
        <h1 className="margin-bottom-20">User Basic <i>CRUD</i> Operations</h1>
        <Row>
          <Col md={4} className="margin-left-35">
           
            <FormControl placeholder="Enter Id" type="text" value={this.state.id} onChange={this.updateData.bind(this, "id")} />
            <FormControl className="margin-top-30" placeholder="Enter Uid" type="text" value={this.state.uid} onChange={this.updateData.bind(this, "uid")} />
            <FormControl className="margin-top-30" placeholder="Enter Title" type="text" value={this.state.title} onChange={this.updateData.bind(this, "title")} />
            <FormControl className="margin-top-30" placeholder="Enter Body" type="text" value={this.state.body} onChange={this.updateData.bind(this, "body")} />
            <select className="form-control margin-top-30" 
            value={this.state.selectedId} onChange={this.handleSelectChange.bind(this)}>
            <option>Select Id To Delete or Update Record</option>
             {this.state.userData.map((user,i)=>{
               return(
                 <option key={i} value={user.id}>{user.id}</option>
               );
             })}
            </select>
            <Button onClick={this.handleSaveClick.bind(this)} className="margin-top-30" bsStyle="primary">SAVE / UPDATE</Button>
            <Button onClick={this.handleDeleteClick.bind(this)} className="margin-top-30 margin-left-10" bsStyle="danger">DELETE</Button>

           
          </Col>
          <Col md={6} className="table-style ">
           <div className="tableSize">
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
                  return (<tr key={i}>
                    <td>{user.userId}</td>
                    <td>{user.id}</td>
                    <td>{user.title}</td>
                    <td>{user.body}</td>
                  </tr>)
                })}
              </tbody>
            </Table>
            
                 </div>
          </Col>
        </Row>
      </div>
    );
  }
  componentDidMount() {
    this.getUserData();
  }
  handleSelectChange(e){
    this.setState({selectedId:e.target.value});
    this.getUserDataById(e.target.value);
  }
  handleSaveClick() {
    let config = {
      method: 'post',
      url: "https://jsonplaceholder.typicode.com/posts",
      data: {
        id: this.state.id,
        userId: this.state.uid,
        title: this.state.title,
        body: this.state.body
      }
    }
    if(this.state.selectedId){
      config.method='put'
      config.url= "https://jsonplaceholder.typicode.com/posts/"+this.state.selectedId;
    }
    axios(config).then((response) => {
      this.setState({
        id:"",uid:"",title:"",body:"",selectedId:""
      })
      alert("Data Saved");
      this.getUserData();
    });
  }
  handleDeleteClick(){
    let id=parseInt(this.state.id);
    let config={
      method:'delete',
      url: "https://jsonplaceholder.typicode.com/posts/"+id
    }
    axios(config).then(()=>{
      
      this.setState({
        id:"",uid:"",title:"",body:"",selectedId:""
      })
      this.getUserData();
      alert("Data Deleted");
    })
  }
  getUserData() {
    let config={
      method: 'get',
      url: "https://jsonplaceholder.typicode.com/posts  "

    }
    axios(config)
      .then((response) => {
        this.setState({ userData: response.data })
      });
  }

  getUserDataById(id) {
    let config={
      method: 'get',
      url: "https://jsonplaceholder.typicode.com/posts/"+id

    }
    axios(config)
      .then((response) => {
        console.log(response.data);
        this.setState({ 
        id:response.data.id,
        uid:response.data.userId,
        title:response.data.title,
        body:response.data.body
      })
      });
  }
  updateData(filedName, e) {
    switch (filedName) {
      case "id": this.setState({ id: e.target.value });
        break;
      case "uid": this.setState({ uid: e.target.value });
        break;
      case "title": this.setState({ title: e.target.value });
        break;
      case "body": this.setState({ body: e.target.value });
        break;

    }
  }
}

export default App;

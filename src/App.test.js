import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import AddUser from "../src/addUser.jsx";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddUser/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

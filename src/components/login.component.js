import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import axios from "axios";
const baseURL = "http://ec2-54-89-237-204.compute-1.amazonaws.com/api/v1/auth/authentication/login/access-token";


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mail: '', pass:'', show: false
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.setShow = this.setShow.bind(this);
  }

  setShow(){
    this.setState({show: !this.state.show})
  }

  handleChange(event) {
    this.setState({mail: event.target.value});
  }

  handleSubmit(event) {

    var bodyFormData = new FormData();
    bodyFormData.append('username', this.state.mail);
    bodyFormData.append('password', this.state.pass); 

    console.log(this.state)
    event.preventDefault();
    this.setShow()
    axios({
      method: "post",
      url: baseURL,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      console.log("This is the response")
      console.log(response)
    });
    // window.location.href='home' 

  }


  handleChangePass(event) {
    this.setState({pass: event.target.value});
  }



 render()


  {
    return (
      <form>

<Alert show={this.state.show} variant="success">
        <Alert.Heading>Error de verificacion!</Alert.Heading>
        <p>
          Ingresa la contraseña correcta!
        </p>
        <hr />
        <div className="d-flex justify-content-end">
        <Button onClick={this.setShow} variant="outline-success">
           Cerrar
          </Button>
        </div>
      </Alert>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email addresss</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={this.state.mail}
            onChange={this.handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={this.state.pass}
            onChange={this.handleChangePass}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
          </div>
        </div>

        <div className="d-grid">
          <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
    
      </form>
    )
  }
}


export default Login
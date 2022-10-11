import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
const baseURL = "https://4oz4uozwhl.execute-api.us-east-1.amazonaws.com/api/v1/auth/authentication/login/access-token";
const baseURL2 = "https://4oz4uozwhl.execute-api.us-east-1.amazonaws.com/api/v1/auth/authentication/login/access-token2";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mail: '', pass:'', show: false, showM:false, factor: "", warn:""
  };
    this.handleChangefactor = this.handleChangefactor.bind(this);
    this.handleSubmitDouble = this.handleSubmitDouble.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.setShow = this.setShow.bind(this);
    this.handleClose= this.handleClose.bind(this);
  }



  handleClose(){
    this.setState({showM: !this.state.showM})
  }

  setShow(){
    this.setState({show: !this.state.show})
  }

  handleChange(event) {
    this.setState({mail: event.target.value});
  }
  handleChangefactor(event) {
    this.setState({factor: event.target.value});
  }


  handleSubmitDouble(){
    if(this.state.factor==258546){
      this.setState({warn: "Factor correcto!"});
    
      var bodyFormData = new FormData();
      bodyFormData.append('username', this.state.mail);
      bodyFormData.append('password', this.state.pass); 

      axios({
        method: "post",
        url: baseURL2,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        console.log("This is the response")
        console.log(response)
        if (response.status== 200){
          window.location.href='home' 
        } 
      }) .catch(error => {
        console.log("Hubo un error")
        console.log(error);
      });;

    }
    else{
      this.setState({warn: "Factor incorrecto!"});

    }
  }

  handleSubmit(event) {

    var bodyFormData = new FormData();
    bodyFormData.append('username', this.state.mail);
    bodyFormData.append('password', this.state.pass); 

    console.log(this.state)
    event.preventDefault();
 
    axios({
      method: "post",
      url: baseURL,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      console.log("This is the response")
      console.log(response)
      if (response.status== 200){
          window.location.href='home' 
      }
    }) .catch(error => {
      console.log("Hubo un error")
      console.log(error.response.status);
      if(error.response.status==401){
        this.handleClose()
      }
      else{  this.setShow()}
    
    
    });;
    
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

      <Modal id="modalito" show={this.state.showM} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log in desde una ubicación desconocida. </Modal.Title>
        </Modal.Header>
        <Modal.Body>Inserte su codigo de doble Factor enviado al +573013382345

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Double factor validation factor"
            value={this.state.factor}
            onChange={this.handleChangefactor}
          />
        </div>
        <div className="d-grid">
          <button onClick={this.handleSubmitDouble} type="submit" className="btn btn-primary">
            Verificar
          </button>
        </div>
        {this.state.warn}

        </Modal.Body>
        <Modal.Footer>
      
        </Modal.Footer>
      </Modal>
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
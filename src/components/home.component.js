import Table from 'react-bootstrap/Table';
import React, { Component } from 'react';
import axios from "axios";
const baseURL = "https://t3opkf5qxee76xnnojxiwmkwom0unnov.lambda-url.us-east-1.on.aws/";




class Home  extends React.Component {

  constructor(props) {
    super(props);
    this.state = {tabla: ''
  };
    
 
  }


  
  componentDidMount() {
    
    axios({
      method: "get",
      url: baseURL,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      this.setState({tabla:      response.data.map((item) => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nom_producto}</td>
            <td>{item.marca}</td>
            <td>{item.precio}</td>
            <td>{item.iva}</td>
            <td>{item.categoria}</td>
           
        </tr>
    ))})
 


    }) .catch(error => {
    
      console.log("Hubo un error")
      console.log(error);
    });;



  }

  render(){

  

    return (
    <div>
    <Table striped bordered hover>
      <thead>
        <tr>
         
          <th>id</th>
          <th>Producto</th>
          <th>Marca</th>
          <th>Precio</th>
          <th>Iva</th>
          <th>Categoria</th>
        </tr>
      </thead>
      <tbody>
       {this.state.tabla}
      </tbody>
    </Table>
       <div className="d-grid">
       <a href="/" type="submit" className="btn btn-primary">
         Log out
       </a>
     </div>
     </div>
  );
  };}

export default Home
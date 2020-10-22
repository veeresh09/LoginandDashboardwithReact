import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {useHistory } from "react-router-dom";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
function Signup(){
    const history = useHistory();
    const [email,setemail] = React.useState("redhair@gmail.com");
    const [firstname,setfirstname] = React.useState("akagami");
    const [lastname,setlastname] = React.useState("shanks");
    const [password,setpassword] = React.useState("yonko");
    const handleClick = (e) => {
        e.preventDefault();
        const body = {
            "email":email,
            "first_name":firstname,
            "last_name":lastname,
            "password":password
        };
        console.log(body);
        const config = {
            headers: {
              "Content-Type": "application/json"
            }
          };
        axios.post("http://localhost:8080/api/persons/register",body,config).then(Response=>{
           // console.log(Response);
            console.log(Response.status);
            if(Response.status==201){
              localStorage.setItem("token",Response.data.token);
              history.push('/dashboard');
              //console.log("wtf");
            }
        })
    }
    return(
        <div>
           <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Sign Up</Navbar.Brand>
    <Nav className="mr-auto">
      {/* <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link> */}
    </Nav>
      <Button variant="outline-light" onClick ={e=>history.push('/')}>Login</Button>
  </Navbar>
<Form>
  <Form.Group controlId="formBasicFirstName">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" placeholder="Enter email" value = {firstname} onChange = {e=>setfirstname(e.target.value)} />
  </Form.Group>
  <Form.Group controlId="formBasicLastName">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" placeholder="Enter email" value = {lastname} onChange = {e=>setlastname(e.target.value)}  />
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email"  value = {email} onChange = {e=>setemail(e.target.value)} />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password"  value = {password} onChange = {e=>setpassword(e.target.value)} />
  </Form.Group>
  <Button variant="primary" type="submit" onClick={e =>handleClick(e)}>
    Signup
  </Button>
</Form>
</div>
);
}

export default Signup;
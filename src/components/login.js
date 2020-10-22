import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import axios from "axios";

function Login(){
    const [email,setemail] = React.useState("redhair@gmail.com");
    const [password,setpassword] = React.useState("yonko");
    const handleClick = (e) => {
        e.preventDefault();
        const body = {
            "email":email,
            "password":password
        };
        console.log(body);
        const config = {
            headers: {
              "Content-Type": "application/json"
            }
          };
          try{
          axios.post("http://localhost:8080/api/persons/login",body,config).then(Response=>{
            console.log(Response.status);
            console.log(Response);
            if(Response.status==200){
              localStorage.setItem("token",Response.data.token);
              history.push("/dashboard");
            }
          });}
          catch(e){
            console.log(e);
          }
    }
    const history = useHistory();
    return(
        <div>
<Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Login</Navbar.Brand>
    <Nav className="mr-auto">
      {/* <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link> */}
    </Nav>
      <Button variant="outline-light" onClick ={e=>history.push('/signup')}>Sign Up</Button>
  </Navbar>
<Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value = {email} onChange = {e=>setemail(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password"  value = {password} onChange = {e=>setpassword(e.target.value)}/>
  </Form.Group>
  <Button variant="primary" type="submit" onClick={(e) => {handleClick(e)}}>
    Login
  </Button>
</Form>
</div>
);
}

export default Login;
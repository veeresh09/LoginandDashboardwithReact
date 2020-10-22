import React,{useEffect} from 'react';
import Card from "react-bootstrap/Card";
import { Route, useHistory } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
function Dashboard(){
    const history = useHistory();
    const token = localStorage.getItem("token");
    const [ulist,setulist] = React.useState();
    const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization':" Bearer " + token
        }
      };
      //const [userlist,setuserlist] = React.useState("k"); 
      let userlist = "You are not Authenticated";
      const headers = `Authorization: Bearer ${token}`;
      const OnChangeHandler1 = (e,index) =>{
        let items = [...ulist];
        let item = {...items[index]};
        item.first_name = e.target.value;
        items[index] = item;
        setulist(items);
      }
      const OnChangeHandler2 = (e,index) =>{
        let items = [...ulist];
        let item = {...items[index]};
        item.last_name = e.target.value;
        items[index] = item;
        setulist(items);
      }
      const updateUser= (e,index)=>{
        e.preventDefault();
        const body = ulist[index];
        console.log(body);
        axios.put("http://localhost:8080/api/persons/restricted/"+ulist[index].id,body,config).then(resp=>{
          console.log(resp);
          alert("Request Status"+resp.status);
        })
      }
      const deleteUser = (e,index)=>{
        e.preventDefault();
        const body ={};
        try{
        axios.delete("http://localhost:8080/api/persons/restricted/"+ulist[index].id,config).then(resp=>{
          console.log(resp);
          setulist(ulist=>{
            ulist:ulist.filter(item=>item.id!=index);
          });
        })}
        catch(err){
          console.log(err);
        }
      }
      const logOut = (e)=>{
        e.preventDefault();
        localStorage.removeItem("token");
        history.push('/');
      }
      console.log(ulist);
      if(ulist==undefined){
        axios.get("http://localhost:8080/api/persons/restricted/getall",config).then(async (Response)=>{
            setulist(Response.data.Persons);
        });}
      if(ulist!= null){
      //  console.log(ulist[0].first_name);
        userlist = (ulist.map((p,index,)=>(
        <Row key = {p.id
        }>
          <Col>
          <Row>
        <Col>
        <Form.Control type = "text" id = "first_name" onChange = {(e)=>OnChangeHandler1(e,index)} value ={ulist[index].first_name}></Form.Control></Col>
          </Row>
          </Col>

          <Col>
          <Row>
        <Col><Form.Control type = "text" id = "last_name" 
        onChange = {(e)=>OnChangeHandler2(e,index)} value ={p.last_name}></Form.Control></Col>
          </Row>
          </Col>
          <Col>
          <Row>
        <Col><Form.Control type = "text" id = "email"  value ={p.email} readOnly></Form.Control></Col>
          </Row>
          </Col>
          <Row>
        <Col><Button onClick = {e=>updateUser(e,index)}>Update</Button></Col>
          </Row>
          <Row>
        <Col><Button variant = "danger" onClick = {(e) => deleteUser(e,index)}>Delete</Button></Col>
          </Row>
          
        </Row>
        )))}
 //   console.log(token);
    return(
        <div>
            <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
    <Nav className="mr-auto">
      {/* <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link> */}
    </Nav>
      <Button variant="outline-light" onClick ={e=>logOut(e)}>Logout</Button>
  </Navbar>

    <Card><Card.Body><Form>{userlist}</Form></Card.Body></Card>
        </div>
);
}

export default Dashboard;
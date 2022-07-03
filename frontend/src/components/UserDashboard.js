import React, { useEffect, useState } from 'react'
import "../style.css"
import { Link, Navigate, useNavigate } from 'react-router-dom'
//import AdminNav from './AdminNav'

export default function UserDashboard(props) {

  const navigate = useNavigate();
  const [user,setUser] = useState("")

  const getUser = async () =>{
    const response = await fetch(`http://localhost:3030/api/auth/getUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              //"adminAuth-token": localStorage.getItem('Admintoken')
               "auth-token": localStorage.getItem('token')
            },
          });
          //console.log(response)
        const json = await response.json(); // parses JSON response into native JavaScript objects
        //console.log(json)
        await setUser(json);
        console.log(user)
    console.log("hello")
  }

  

  useEffect(async ()=>{
    if(localStorage.getItem('token')){
      await getUser();
    }
    // else{

    // }
  },[])

  return (
    <>
        {localStorage.getItem('token')?<div>
        <props.header/>
        <div className="container admin">
          <h1>Welcome to Your Dashboard</h1>
          <br />
          <table border="1px" style={{"width":"100%"}}>
          <thead style={{"border":"1px solid black"}}>
            <tr style={{"backgroundColor": "lightgray"}}>
              <td colSpan="2"><h2>User Information</h2></td>
            </tr>
          </thead>
          <tbody style={{"border":"1px solid black"}}>
            <tr style={{"backgroundColor": "#f4f0f0" ,"border":"1px solid lighygray"}}>
              <td>Name: </td>
              <td style={{padding:"10px"}}>{user.name}</td>
             </tr>
            <tr style={{"backgroundColor": "#f4f0f0" ,"border":"1px solid lighygray"}}>
              <td>Email: </td>
              <td style={{padding:"10px"}}>{user.email}</td>
            </tr>
            <tr style={{"backgroundColor": "#ede8e8" ,"border":"1px solid lighygray"}}>
              <td colSpan="2" style={{padding:"10px"}}>User</td>
            </tr>
            <tr style={{"backgroundColor": "rgb(24 141 236)" ,"border":"1px solid lighygray"}}>
              <td colSpan="2" style={{padding:"10px"}}><Link className="nav-link" to="/myOrders">My Orders</Link></td>
            </tr>
          </tbody>
        </table>
        </div>

        </div>:<div className='container'>
        <props.header/>
        
          <h1>Please Login to Continue</h1>
          </div>}
        
    </>
  )
}

import React, { useEffect, useState } from 'react'
import "../../style.css"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AdminNav from './AdminNav'

export default function Admin(props) {

  const navigate = useNavigate();
  const [admin,setAdmin] = useState("")

  const getAdmin = async () =>{
    const response = await fetch(`http://localhost:3030/api/auth/getAdmin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "adminAuth-token": localStorage.getItem('Admintoken')
            //   "auth-token": localStorage.getItem('token')
            },
          });
          //console.log(response)
        const json = await response.json(); // parses JSON response into native JavaScript objects
        //console.log(json)
        await setAdmin(json);
        console.log(admin)
    console.log("hello")
  }

  

  useEffect(async ()=>{
    if(localStorage.getItem('Admintoken')){
      await getAdmin();
    }
    // else{

    // }
  },[])

  return (
    <>
        {localStorage.getItem('Admintoken')?<div>
        <props.header/>
        <aside className='AdminAside'>
            <ul className='adminNav'>
                <li className='adminNavItem'><Link className='adNavItem' to='/orders'>Orders</Link></li>
                <li className='adminNavItem'><Link className='adNavItem' to='/showAllProduct'>All Products</Link></li>
                <li className='adminNavItem'><Link className='adNavItem' to='/addNewProduct'>Add New Product</Link></li>
            </ul>
        </aside>
        <div className="container admin">
          <h1>Welcome to ShopNow Admin Dashboard</h1>
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
              <td style={{padding:"10px"}}>{admin.name}</td>
             </tr>
            <tr style={{"backgroundColor": "#f4f0f0" ,"border":"1px solid lighygray"}}>
              <td>Email: </td>
              <td style={{padding:"10px"}}>{admin.email}</td>
            </tr>
            <tr style={{"backgroundColor": "#ede8e8" ,"border":"1px solid lighygray"}}>
              <td colSpan="2" style={{padding:"10px"}}>Admin</td>
            </tr>
          </tbody>
        </table>
        </div>

        </div>:<div className='container'>
        <props.header/>
        
          <h1>Please Login to Continue to Admin Dashboard</h1>
          </div>}
        
    </>
  )
}

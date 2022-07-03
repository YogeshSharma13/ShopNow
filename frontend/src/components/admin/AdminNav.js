import React, { Component, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import productContext from '../../context/products/productContext'
import '../../style.css';

const Navbar = ()=> {

    const context = useContext(productContext);
    const {cart,setAllproducts,setSearchText,searchText,getSearchProducts,setCart} = context;
    const [userName,setUserName] = useState("");
    
    const navigate = useNavigate();


    const handleLogout = () =>{
        localStorage.removeItem('Admintoken');
        navigate('/adminLogin');
    }

const handleSearch = async (e) =>{
    e.preventDefault();
    // console.log(typeof(searchText))
    getSearchProducts(searchText);
    console.log("Text" + searchText);

    //getSearchProducts(searchText)
    navigate("/search");
    // if(json.success){
    //   //save the authtoken and redirect
    //   localStorage.setItem('token',json.authToken);
    //   alert("You are Successfull")
    //   navigate("/search")

    // }
    // else{
    //   alert("Invalid credentials")
    // }
}

const onChange = (e) =>{
    console.log(e.target.value);
    //console.log(searchText + e.target.value);
    //console.log(searchText.concat(e.target.value));
    // console.log(...searchText, e.target.value);
    setSearchText(e.target.value)
}

const GetUserName = async () =>{
    const response = await fetch(`http://localhost:3030/api/auth/getUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            //   "auth-token": localStorage.getItem('token')
            },
          });
          //console.log(response)
        const json = await response.json(); // parses JSON response into native JavaScript objects
        //console.log(json)
        await setUserName(json.name);
        console.log(userName)
    console.log("hello")
}

useEffect(async ()=>{

    // const response = await fetch(`http://localhost:3030/api/cart/`, {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           "auth-token": localStorage.getItem('token')
    //         //   "auth-token": localStorage.getItem('token')
    //         },
    //       });
    //       //console.log(response)
    //     const json = await response.json(); // parses JSON response into native JavaScript objects
    //     console.log(json)
    //     await setCart(json.cart);
    //     console.log(cart)
    // console.log("hello")

    await GetUserName();
    
},[])


    return (
      <div>
      <header className="section-header">
      {/* <nav className="navbar navbar-dark navbar-expand p-0 bg-dark">
          <div className="container-fluid">
              <ul className="navbar-nav d-none d-md-flex mr-auto">
                  <li className="nav-item"><a className="nav-link" href="/" data-abc="true">Cash On Delivery</a></li>
                  <li className="nav-item"><a className="nav-link" href="/" data-abc="true">Free Delivery</a></li>
                  <li className="nav-item"><a className="nav-link" href="/" data-abc="true">Cash Backs</a></li>
              </ul>
              <ul className="navbar-nav d-flex align-items-center">
                  <li className="nav-item">
                      <div className="d-flex flex-row"> <img src="https://i.imgur.com/EYFtR83.jpg" className="rounded-circle" width="30"/> </div>
                  </li>
                  <li className="nav-item"><div style={{"marginRight":"20px"}}>
                          <p style={{"color":"white"}}><strong>{userName}</strong></p>
                      </div></li>
                  {!localStorage.getItem('token')?<li className="nav-item"> <Link to="/login" className="nav-link d-flex align-items-center" data-abc="true"><button>Login</button></Link> </li>:<button className='btn btn-primary' onClick={handleLogout}>Logout</button>}              </ul> 
          </div>
          
      </nav>  */}
      <section className="header-main border-bottom bg-white">
          <div className="container-fluid">
              <div className="row p-2 pt-3 pb-3 d-flex align-items-center">
                  <div className="col-md-10"> <Link className='MainLogo' to='/admin'><strong>SHOP NOW</strong> Admin </Link></div>
                  {/* <div className="col-md-8">
                      <div className="d-flex form-inputs"> <input className="form-control" type="text" onChange={onChange} placeholder="Search any product..."/> <button onClick={handleSearch} className="btn btn-primary mx-1">Search</button></div>
                  </div> */}
                  <div className="col-md-2">
                      
                      <div className="d-flex d-none d-md-flex flex-row align-items-center CartNav" > 
                      {!localStorage.getItem('Admintoken')?<Link to="/adminLogin" className="nav-link d-flex align-items-center" data-abc="true"><button>Login</button></Link>:<div><p>Yogesh</p><button className='btn btn-primary' onClick={handleLogout}>Logout</button></div>}
                      </div>
                  </div>
                  </div>
          </div>
      </section>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid"> <a className="navbar-brand d-md-none d-md-flex" href="/">Categories</a> <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                      <li className="nav-item"> <Link className="nav-link active" aria-current="page" to="/electronics">Electronics</Link> </li>
                      <li className="nav-item"> <Link className="nav-link" to="/men">Men's Fashion</Link> </li>
                      <li className="nav-item"> <Link className="nav-link" to="/women">Women's Fashion</Link> </li>
                      <li className="nav-item"> <Link className="nav-link" to="/jewelery">Jewelery</Link> </li>
                      <li className="nav-item"> <Link className="nav-link" to="/all">All Products</Link> </li>
                      /
                  </ul>
              </div>
          </div>
      </nav> */}
  </header>
      </div>
    )
}

export default Navbar

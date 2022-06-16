import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
//import Products from './components/Products';
//import Banner from './components/Banner';
import Home from './components/Home';
import AllProducts from './components/AllProducts';
import LoadingBar from 'react-top-loading-bar';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/admin/Admin';
import ShowAllProduct from './components/admin/ShowAllProduct';
import AddNewProduct from './components/admin/AddNewProduct';
import ProductState from './context/products/ProductState';
import SearchedItems from './components/SearchedItems';
import Cart from './components/Cart'
import ShipAddress from './components/ShipAddress';
import PaymentDetail from './components/PaymentDetail';
import AdminNav from "./components/admin/AdminNav"
import {
  BrowserRouter as Router,
  //Switch,
  Routes,
  Route,
  //Link
} from "react-router-dom";
import ResetPass from './components/ResetPass';
import Orders from './components/admin/Orders';
import AdminLogin from './components/admin/AdminLogin';
import AdminSignup from './components/admin/AdminSignup';
import ChangePass from './components/ChangePass';



export default class App extends Component {
  state = {
    progress: 0,
    productId: 1
  }
  setProgress = (progress)=>{
    this.setState({progress: progress})
  }

  setProductId = (id)=>{
    this.setState({productId: id})
    console.log(this.state.productId);
  }

  render() {
    return (
      <>
      <ProductState>
      <Router>
        {/* <Navbar /> */}
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <div className="container">
          
        
        <Routes>
          <Route exact path="/electronics" element={<AllProducts header={Navbar} setProductId={this.setProductId} setProgress={this.setProgress} key="electronics" category={"electronics"}/>}/>
          <Route exact path="/women" element={<AllProducts header={Navbar} setProductId={this.setProductId} setProgress={this.setProgress} key="women's clothing" category={"women's clothing"}/>}/>
          <Route exact path="/men" element={<AllProducts header={Navbar} setProductId={this.setProductId} setProgress={this.setProgress} key="men's clothing" category={"men's clothing"}/>}/>
          <Route exact path="/jewelery" element={<AllProducts header={Navbar} setProductId={this.setProductId} setProgress={this.setProgress} key="jewelery" category={"jewelery"}/>}/>
          <Route exact path="/Smartphone" element={<AllProducts header={Navbar} setProductId={this.setProductId} setProgress={this.setProgress} key="Smartphone" category={"Smartphone"}/>}/>
          <Route exact path="/all" element={<AllProducts header={Navbar} setProductId={this.setProductId} setProgress={this.setProgress}/>} />
          <Route exact path="/" element={<Home header={Navbar} setProductId={this.setProductId} setProgress={this.setProgress}/>} />
          <Route exact path="/detail" element={<ProductDetail header={Navbar} userId={this.state.productId}/>} />
          <Route exact path="/electronics/detail" element={<ProductDetail header={Navbar} userId={this.state.productId}/>} />
          <Route exact path="/jewelery/detail" element={<ProductDetail header={Navbar} userId={this.state.productId}/>} />
          <Route exact path="/men/detail" element={<ProductDetail header={Navbar} userId={this.state.productId}/>} />
          <Route exact path="/women/detail" element={<ProductDetail header={Navbar} userId={this.state.productId}/>} />
          <Route exact path="/all/detail" element={<ProductDetail header={Navbar} userId={this.state.productId}/>} />
          <Route exact path="/cart/detail" element={<ProductDetail header={Navbar} userId={this.state.productId}/>} />
          <Route exact path="/login" element={<Login header={Navbar}/>} />
          <Route exact path="/register" element={<Register header={Navbar}/>} />
          <Route exact path="/admin" element={<Admin header={AdminNav}/>} />
          <Route exact path="/showAllProduct" element={<ShowAllProduct header={AdminNav}/>} />
          <Route exact path="/addNewProduct" element={<AddNewProduct header={AdminNav}/>} />
          <Route exact path="/search" element={<SearchedItems header={Navbar}/>} />
          <Route exact path="/cart" element={<Cart header={Navbar}/>} />
          <Route exact path="/shipaddress" element={<ShipAddress header={Navbar}/>} />
          <Route exact path="/paymentDetails" element={<PaymentDetail header={Navbar}/>} />
          <Route exact path="/resetPass" element={<ResetPass header={Navbar}/>} />
          <Route exact path="/orders" element={<Orders header={AdminNav}/>} />
          <Route exact path="/adminLogin" element={<AdminLogin header={AdminNav}/>} />
          <Route exact path="/adminSignup" element={<AdminSignup header={AdminNav}/>} />
          <Route exact path="/changePass" element={<ChangePass header={Navbar}/>} />


        
        </Routes>
        </div>
        </Router>
        </ProductState>

        
      </>
    )
  }
}



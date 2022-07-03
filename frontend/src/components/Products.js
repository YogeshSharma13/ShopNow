import React, { useState, useEffect, useContext } from 'react';
import Product from "./Product"
import '../style.css';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import productContext from '../context/products/productContext'
const Products = (props) => {
  const style={"width": "18rem", "height": "370px"}

  const [myproducts, setProducts] = useState([]);
  //const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // document.title = "SHOP NOW - " + (props.category).toUpperCase();

  const updateProducts = async () =>{
    //props.setProgress(10);
    // let url = `https://fakestoreapi.com/products/category/${props.category}`;
    // setLoading(true);
    // let data = await fetch(url);
    // //props.setProgress(30);
    // let parsedData = await data.json();
    // //props.setProgress(70);
    // console.log(parsedData);
    // setProducts(parsedData);
    // setLoading(false);
    //props.setProgress(100);
    const response = await fetch(`http://localhost:3030/api/products/category/${props.category}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
       // "auth-token": localStorage.getItem('token);
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    setProducts(json);
  }
  
  useEffect(()=>{
    updateProducts();
  },[])

    return (
      <div className="my-3  productContainer">
      {loading && <Spinner/>}
      <div className="container">
      <h3 className='compHeading'>{props.category.toUpperCase()}</h3>
      {/* <p className='dealTime'>00:28:52</p> */}
      <Link to={props.link} >
      <button className="btn-primary viewBtn">view more</button>
      </Link>
        </div>
        <div className="row show">
          
        {myproducts.map((e)=>{
          return <div className="col-md-3 singleProduct" key={e.id}>
          <Product style={style} title={e.title} price={e.price} description={e.description} category={e.category} image = {e.image} id = {e._id}/>
          </div>
          })}
        </div>
        {/* <div className="container">
        <button type="button" class="btn btn-dark"onClick={handlePrevious}>Previous</button>
        <button type="button" class="btn btn-dark"onClick={handleNext}>Next</button>
        </div> */}
      </div>
    )
}

export default Products

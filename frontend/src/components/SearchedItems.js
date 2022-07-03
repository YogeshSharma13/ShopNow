import React, { useState, useEffect, useContext } from 'react';
import Product from './Product';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useNavigate } from 'react-router-dom'
import productContext from '../context/products/productContext'


function SearchedItems(props) {
    const context = useContext(productContext);
    
    const {allproducts,getSearchProducts, searchText} = context;

    // useEffect(()=>{
    //     getSearchProducts(searchText)
    
    //     console.log("mounted" + allproducts);
    // },[])
  return (
    <>
    <div className="container my-3">
        <h1>Your Search Result</h1>
        <div className="row my-2">
        
        {allproducts.length >= 1 ? allproducts.map((e)=>{
          return <div className="col-md-3 allProd" key={e.id}>
          <Product title={e.title} price={e.price} description={e.description} category={e.category} image = {e.image} id = "TODO"/>
          </div>
          }):<h6 style={{margin: "auto"}}>No Products to show Here</h6>}
          
        </div>
        {/* <div className="container">
        <button type="button" class="btn btn-dark"onClick={handlePrevious}>Previous</button>
        <button type="button" class="btn btn-dark"onClick={handleNext}>Next</button>
        </div> */}
      </div>
      </>
  )
}

export default SearchedItems

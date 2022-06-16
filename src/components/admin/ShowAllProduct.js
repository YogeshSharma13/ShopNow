import React, { useState, useEffect, useContext } from 'react';
import Product from '../Product';
import Spinner from '../Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom'
import productContext from '../../context/products/productContext'

const ShowAllProduct = (props) => {
  const context = useContext(productContext);
  const {allproducts, deleteProduct, getProducts,getSellerProducts} = context;
  //const [myproducts, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  // const updateProducts = async () =>{
  //   // props.setProgress(10);
  //   let url = `https://fakestoreapi.com/products`;
  //   //let url = 'localhost:3030/api/products/';
  //   setLoading(true);
  //   let data = await fetch(url);
  //   // props.setProgress(30);
  //   let parsedData = await data.json();
  //   // props.setProgress(70);
  //   console.log(parsedData);
  //   setProducts(parsedData);
  //   setLoading(false);
  //   // props.setProgress(100);
  // }
  
  useEffect(()=>{
    //updateProducts();
    getSellerProducts();
    
  },[])

        // const fetchMoreData = async () => {
        //     let url = `https://fakestoreapi.com/products/category/${props.category}`;
        //     setLoading(true);
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log(parsedData);
        //     setProducts(myproducts.concat(parsedData));
        //     setLoading(false);
        //   };

  return (
    <>
    <props.header/>
    <div>
      <aside className='AdminAside'>
            <ul className='adminNav'>
                <li className='adminNavItem'><Link to='/orders'>Orders</Link></li>
                <li className='adminNavItem'><Link style={{"color":"black"}} to='/showAllProduct'>All Products</Link></li>
                <li className='adminNavItem'><Link to='/addNewProduct'>Add New Product</Link></li>
            </ul>
        </aside>
      <div className="container my-3 showAdminProducts">
          <h1>Your Products</h1>
        <div className="row">
        {/* <InfiniteScroll
          dataLength={allproducts.length}
          next={fetchMoreData}
          hasMore={false}
          loader={<Spinner/>}
        > */}
        {allproducts.map((e)=>{
          return <div className="col-md-3 allAdminProd" key={e.id}>
              <div className='adminProdImage'>
                  <img src={e.image} alt="" />
              </div>
              <div className='adminProdDetail'>
                  <h3>
                      {e.title}
                  </h3>
                  <p>{e.description}</p>
                  <h5>Rs. {e.price}</h5>
                  <p >Edit Product Details</p>
              </div>
              <div className="deleteProduct" onClick={()=>{
                deleteProduct(e._id);
                getProducts();
                }}>Delete</div>
          {/* <Product setProductId={set} title={e.title} price={e.price} description={e.description} category={e.category} image = {e.image} id = "TODO"/> */}
          </div>
          })}
          {/* </InfiniteScroll> */}
        </div>
        {/* <div className="container">
        <button type="button" class="btn btn-dark"onClick={handlePrevious}>Previous</button>
        <button type="button" class="btn btn-dark"onClick={handleNext}>Next</button>
        </div> */}
      </div>
    </div>
    </>
  )
}

export default ShowAllProduct;

import React, { useState, useEffect, useContext } from 'react';
import Product from "./Product"
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar';
import "../style.css"
import productContext from '../context/products/productContext'
import { Link } from 'react-router-dom';
import AmountTotal from './AmountTotal';


const Cart = (props) => {

    const context = useContext(productContext);
    const {cart,setCart,cartTotal, setCartTotal} = context;
    let total = 0;

  const [myproducts, setProducts] = useState([]);
  
  const [loading, setLoading] = useState(false);

  const set = (id) =>{
    props.setProductId(id);
  }

  const updateProducts = async () =>{
    const response = await fetch(`http://localhost:3030/api/cart/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      //   "auth-token": localStorage.getItem('token')
      },
    });
    //console.log(response)
  const json = await response.json(); // parses JSON response into native JavaScript objects
  console.log(json)
  await setCart(json.cart);
  //console.log(cart)
  
  for(let x in json.cart){
    console.log(x);
    total = total + parseInt(json.cart[x].price) ;
  }
  console.log(total);
  await setCartTotal(total);
  console.log(cartTotal);
    
  }

  const handleRemoveCart = async (id) => {
    const response = await fetch(`http://localhost:3030/api/cart/removeFromCart/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          //   "auth-token": localStorage.getItem('token')
          },
        });
        //console.log(response)
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json)
      await setCart(json.cart);
      console.log(cart)
  }

  
  useEffect(()=>{
    
    updateProducts();
    console.log(cart);
  },[])

        const fetchMoreData = async () => {
            let url = `https://fakestoreapi.com/products/category/${props.category}`;
            setLoading(true);
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            setProducts(myproducts.concat(parsedData));
            setLoading(false);
          };
          
    return (
      <>
      <props.header/>
      <div className="container my-3">
        <div className='container' style={{"backgroundColor": "#ffe8ec", "height": "100px"}}><h1>Shopping Cart &#40; {cart.length} Items &#41;</h1>
        <div>
          <h5 style={{"display":"inline-block"}}>Cart Total: </h5>
          <h5 style={{"display":"inline-block"}}>Rs. {cartTotal}</h5>
        </div>
        </div>
        {localStorage.getItem('token')?<div className="row">
        {/* <InfiniteScroll
          dataLength={myproducts.length}
          next={fetchMoreData}
          hasMore={false}
          loader={<Spinner/>}
        > */}
        {cart.length!=0?<div>{cart.map((e)=>{
          return <div className="col-md-3 my-4 allProd" key={e._id}>
          <Product setProductId={set} title={e.title} price={e.price} description={e.description} category={e.category} image = {e.image} id = {e._id}/>
          <div onClick={handleRemoveCart(e._id)} style={{"border":"1px solid black",width: "18rem"}}>
        Remove From Cart
      </div>
          </div>
          })}<div className='my-2'><Link className='btn btn-primary' to='/shipaddress'>Continue</Link></div></div>:<div className='container'> <h1>No Items in Cart</h1>
          <h2>Start Shopping Now</h2>
          <Link className='btn btn-primary' to='/'>Shop Now</Link>
           </div>}
          {/* </InfiniteScroll> */}
        </div>:<div>
          <h1>Please Login to Continue</h1>
          <Link className='btn btn-primary' to='/login'>Login</Link>
          </div>}
        {/* <div className="container">
        <button type="button" class="btn btn-dark"onClick={handlePrevious}>Previous</button>
        <button type="button" class="btn btn-dark"onClick={handleNext}>Next</button>
        </div> */}
      </div>
      
      </>
    )
}

export default Cart


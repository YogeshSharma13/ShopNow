import React, { useState, useEffect, useContext } from 'react';
import Product from "./Product"
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar';
import "../style.css"
import Filter from './Filter';
import productContext from '../context/products/productContext';



const AllProducts = (props) => {

  //const [myproducts, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const context = useContext(productContext);
  const {allproducts, setAllproducts} = context

  const set = (id) =>{
    props.setProductId(id);
  }

  const updateProducts = async () =>{
    //props.setProgress(10);
    let url;
    if(props.category){
      url = `http://localhost:3030/api/products/category/${props.category}`;
    }
    else{
      url = `http://localhost:3030/api/products/`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
       // "auth-token": localStorage.getItem('token);
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    await setAllproducts(json);
    // setLoading(true);
    // //let data = await fetch(url);
    // props.setProgress(30);
    // let parsedData = await data.json();
    // props.setProgress(70);
    // console.log(parsedData);
    // setProducts(parsedData);
    // setLoading(false);
    // props.setProgress(100);
  }
  
  useEffect(()=>{
    updateProducts();
  },[])

        const fetchMoreData = async () => {
            let url = `https://localhost:3030/api/products/category/${props.category}`;
            setLoading(true);
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            setAllproducts(allproducts.concat(parsedData));
            setLoading(false);
          };
          
    return (
      <>
      <props.header/>
      <div className="container my-3">
      <Filter category={props.category} set={setAllproducts}/>
        <div className="row allProducts">
        <InfiniteScroll
          dataLength={allproducts.length}
          next={fetchMoreData}
          hasMore={false}
          loader={<Spinner/>}
        >
        {allproducts.map((e)=>{
          return <div className="col-md-3 my-3 allProd" key={e.id}>
          <Product setProductId={set} title={e.title} price={e.price} description={e.description} category={e.category} image = {e.image} id = {e._id}/>
          </div>
          })}
          </InfiniteScroll>
        </div>
        {/* <div className="container">
        <button type="button" class="btn btn-dark"onClick={handlePrevious}>Previous</button>
        <button type="button" class="btn btn-dark"onClick={handleNext}>Next</button>
        </div> */}
      </div>
    </>
    )
}

export default AllProducts


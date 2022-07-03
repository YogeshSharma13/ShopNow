import React, { useState, useEffect, useContext } from 'react';
import Product from "./Product"
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import "../style.css"
import Filter from './Filter';
import productContext from '../context/products/productContext';



const AllProducts = (props) => {
  const style={"width": "18rem", "height": "370px"}


  const [loading, setLoading] = useState(false);
  const context = useContext(productContext);
  const {allproducts, setAllproducts} = context

  const set = (id) =>{
    props.setProductId(id);
  }

  const updateProducts = async () =>{
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
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    await setAllproducts(json);
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
          <Product style={style} setProductId={set} title={e.title} price={e.price} description={e.description} category={e.category} image = {e.image} id = {e._id}/>
          </div>
          })}
          </InfiniteScroll>
        </div>
      </div>
    </>
    )
}

export default AllProducts


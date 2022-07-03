import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import productContext from "../context/products/productContext";
import '../style.css';


function UserOrders(props) {
    const context = useContext(productContext);
    const {order,setOrder, allproducts} = context;

    const getOrders = async () =>{
        const response = await fetch(`http://localhost:3030/api/auth/getUserOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        //   "auth-token": localStorage.getItem('token')
      },
    });
    //console.log(response)
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    await setOrder(json);
    console.log(order);
    }

    useEffect(()=>{
        console.log("getting orders");
        getOrders();
    },[])
  return (
    <>
    <props.header/>
    <div>
      <div className="searchOrder">
        <div className="sss d-flex form-inputs">
          {" "}
          <input
            className="form-control"
            type="text"
            placeholder="Search by Order Id"
          />{" "}
          <button className="btn btn-primary mx-1">
            Search
          </button>
        </div>
      </div>
      
      <div style={{"borderLeft":"2px solid black","padding":"10px"}} className="filterOrder">
        <span>Filter Your Orders by Delivery Status</span>
        <select name="deliveryStatus" id="deliveryStatus">
            <option value="">All</option>
            <option value="delivered">Delivered</option>
            <option value="pending">Undelivered</option>
        </select>
      </div>
      <div>
      <div className="row">
        {/* <InfiniteScroll
          dataLength={allproducts.length}
          next={fetchMoreData}
          hasMore={false}
          loader={<Spinner/>}
        > */}
        <h1>Your Orders</h1>

        <hr />

        <table style={{"width":"90%","margin":"auto"}}>

        
        {order.map((e)=>{
          return <tr className="tablestyle" style={{"margin":"10px"}}>
            <td className="tablestyle tds">
              <div className='adminProdImage'>
                  <img src={e.product.image} alt="" />
              </div>
              </td>
              <td className="tablestyle tds">
              <div className='adminProdDetail'>
                  <h6>
                      {e.product.title}
                  </h6>
                  
              </div>
              </td>
              <td className="tablestyle tds">
                <span>{e.orderId}</span>
              </td>
              <td className="tablestyle tds">
              <h5>Rs. {e.product.price}</h5>
              </td>
              <td className="tablestyle tds">
                <span>{e.status}</span>
              </td>
           </tr>
          })}
          </table>
        </div>
      </div>
      </div>
    </>
  );
}

export default UserOrders;

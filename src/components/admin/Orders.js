import React, { useContext, useEffect, useState } from "react";
import "../../style.css";
import { Link, useNavigate } from "react-router-dom";
import productContext from "../../context/products/productContext";
//const length = 0;

function Orders(props) {
  const context = useContext(productContext);
  const { order, setOrder,pending,delivered,setPending,setDelivered } = context;
  const [search, setSearch] = useState("");

  //const [length, setLength] = useState(0);
  //const navigate = useNavigate();

  const getPending = async () => {
    const response = await fetch(`http://localhost:3030/api/order/pending`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        //   "auth-token": localStorage.getItem('token')
      },
    });
    //console.log(response)
    const json = await response.json(); // parses JSON response into native JavaScript objects
    //console.log(json);
    await setPending(json);
    console.log(pending);
  };

  const getDelivered = async () => {
    const response = await fetch(`http://localhost:3030/api/order/delivered`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        //   "auth-token": localStorage.getItem('token')
      },
    });
    //console.log(response)
    const json = await response.json(); // parses JSON response into native JavaScript objects
    //console.log(json);
    await setDelivered(json);
    console.log(delivered);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") {
      updateOrders();
    } else {
      const response = await fetch(
        `http://localhost:3030/api/order/search/${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);
      await setOrder(json);
    }
  };

  const onChange = (e) => {
    console.log(e.target.value);
    //console.log(searchText + e.target.value);
    //console.log(searchText.concat(e.target.value));
    // console.log(...searchText, e.target.value);
    setSearch(e.target.value);
  };

  const updateOrders = async () => {
    const response = await fetch(`http://localhost:3030/api/order/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "adminAuth-token": localStorage.getItem("Admintoken"),
        //   "auth-token": localStorage.getItem('token')
      },
    });
    //console.log(response)
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    await setOrder(json);
    console.log(order);
  };
  useEffect(() => {
    updateOrders();
    //length = order.length;
    getPending();
    getDelivered();
  }, []);
  return (
    <>
    <props.header/>
      <aside className="AdminAside">
        <ul className="adminNav">
          <li className="adminNavItem"><Link style={{"color":"black"}} to='/orders'>Orders</Link></li>
          <li className="adminNavItem">
            <Link to="/showAllProduct">All Products</Link>
          </li>
          <li className="adminNavItem">
            <Link to="/addNewProduct">Add New Product</Link>
          </li>
        </ul>
      </aside>
      {/* heading and search bar for orders */}
      <div className="ordersContent">
        <div className="orderHeader my-3">
          <div className="ordersHeading">
            <h1>Orders 😍</h1>
          </div>
          <div className="orderSearch mb-3">
            <input
              onChange={onChange}
              type="text"
              name="search"
              placeholder="Search By name or ID"
              id="searchOrder"
            />
            <div
              className="input-group-append"
              style={{ display: "inline-block" }}
            >
              <button className="btn " onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
        <hr />
        {/* divs to show no of pending and delivered orders */}
        <div className="orderNumber">
          <div className="totalOrders mx-2" style={{ backgroundColor: "grey" }}>
            <span>All Orders</span>
            <h3>{order.length}</h3>
          </div>
          <div
            className="pendingOrders mx-2"
            style={{ backgroundColor: "lightcyan" }}
          >
            <span>Pending Orders</span>
            <h3>{pending.length}</h3>
          </div>
          <div
            className="deliveredOrders mx-2"
            style={{ backgroundColor: "lightpink" }}
          >
            <span>Delivered Orders</span>
            <h3>{delivered.length}</h3>
          </div>
        </div>
        <hr />
        {/* all orders */}
        <div className="orderNav">
          <div className="orderNavItem">
            <h5>All Orders</h5>
          </div>
          <div className="orderNavItem">
            <h5>Pending Orders</h5>
          </div>
          <div className="orderNavItem">
            <h5>Delivered Orders</h5>
          </div>
          <div className="orderNavItem">
            <h5>Booked Orders</h5>
          </div>
          <div className="orderNavItem">
            <h5>Cancelled Orders</h5>
          </div>
        </div>
        <hr />
        <div className="orderDetail">
          <table style={{ "border-bottom": "1px solid black", width: "100%" }}>
            <thead style={{ "border-bottom": "1px solid black" }}>
              <th style={{ padding: "10px" }}>Order Id</th>
              <th style={{ padding: "10px" }}>Order Date</th>
              <th style={{ padding: "10px" }}>Product Name</th>
              <th style={{ padding: "10px" }}>Product Price</th>
              <th style={{ padding: "10px" }}>Status</th>
            </thead>
            <tbody style={{ "border-bottom": "1px solid black" }}>
              {order.map((OrderI) => {
                return (
                  <tr
                    style={{ padding: "10px", borderBottom: "1px solid black" }}
                  >
                    <td style={{ padding: "10px" }}>{OrderI.orderId}</td>
                    <td style={{ padding: "10px" }}>{OrderI.date}</td>
                    <td style={{ padding: "10px" }}>{OrderI.product.title}</td>
                    <td style={{ padding: "10px" }}>{OrderI.product.price}</td>
                    <td style={{ padding: "10px" }}>{OrderI.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Orders;

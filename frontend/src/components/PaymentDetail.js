import React, { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import productContext from '../context/products/productContext';
let mystyle = {
    'border': "1px solid black",
    'padding': '5px'
}


const PaymentDetail = (props) => {
    const location = useLocation();
    const context = useContext(productContext);
    const {cart,address,setCart} = context;

    const getCart = async () =>{
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
          console.log(cart)
    }

    const orderFunc = async () => {
      await fetch(`http://localhost:3030/api/order/addOrder/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body:JSON.stringify({
          products: location.state.products,
          address:location.state.address,
          paymentId: location.state.paymentId,
          orderId: location.state.orderId,
          signature: location.state.signature,
          status: "pending"
        })
      }).then(()=>{
        console.log("Order placed");
      }).catch((err)=>{
        console.log(err)
      });
    }

    useEffect(async ()=>{
       console.log("into payment")
       await getCart();
       orderFunc();
    },[])
  return (
    <>
    <props.header/>
      <div>
          <h1>Payment Status</h1>
      </div>
      <div>
          <table style={{"margin":"auto"}}>
              <tbody style={mystyle}>
                  <tr style={mystyle}>
                      <td style={mystyle} colSpan='2'><h2> Payment Details</h2></td>
                  </tr>
                  <tr style={mystyle}>
                      <td style={mystyle}>Payment Status</td>
                      <td style={{
                          'border': "1px solid black",
                          'padding': '5px',
                          'color': 'green'
                      }}>Successfull</td>
                  </tr>
                  
                  <tr style={mystyle}>
                      <td style={mystyle}>Payment Id</td>
                      <td style={mystyle}>{location.state.paymentId}</td>
                  </tr>

                  <tr style={mystyle}>
                      <td style={mystyle}>Order Id</td>
                      <td style={mystyle}>{location.state.orderId}</td>
                  </tr>
              </tbody>
          </table>
      </div>
    </>
  )
}

export default PaymentDetail

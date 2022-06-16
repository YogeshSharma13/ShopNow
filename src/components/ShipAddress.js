import React, {useState,useEffect, useContext} from "react";
import '../style.css'
import AmountTotal from './AmountTotal'
import productContext from '../context/products/productContext'
import { useNavigate } from "react-router-dom";

function ShipAddress(props) {

  const [payment,setPayment] = useState(false);
  const [orderId,setorderId] = useState('');
  const [paymentId,setPaymentId] = useState('');
  const [signature,setSignature] = useState('');
  const context = useContext(productContext);
  const navigate = useNavigate();

  const {cart,setCart,address,setAddress} = context;
  const [price,setPrice] = useState(0);

  // const func = async () =>{
  //   const response = await fetch(`http://localhost:3030/api/order/addOrder/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "auth-token": localStorage.getItem('token')
  //     },
  //     body:JSON.stringify({
  //       cart: cart,
  //       address:address
  //     })
  //   });
  // }


  useEffect(()=>{
    //setPrice(0);
    let total = 0;
    console.log('start');
    console.log(cart);
    cart.map((e)=>{
        total = total + parseInt(e.price);
        console.log(e);
    })
    setPrice(total);
    console.log(price)
},[])

  //const [address, setAddress] = useState({name: "",email:"", phone: 0,altphone:0,locality: "",pincode:0,city:"",state:"",landmark:""});


  const handleChange = (e) =>{
    setAddress({...address, [e.target.name]: e.target.value});
  }

  const buyNow = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3030/api/order/buyCart/${price+50}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body:JSON.stringify({
        cart: cart,
        address:address
      })
    });

    let json = await response.json();
    console.log(json);

    if(response.status!==200){
      return;
    }

    const options = {
      "key": "rzp_test_McFUuk69vU92sC", // Enter the Key ID generated from the Dashboard
      "amount": json.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Shop Now",
      "description": json.notes.desc,
      //"image": "https://example.com/your_logo",
      "order_id": json.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
          setorderId(response.razorpay_order_id);
          setPaymentId(response.razorpay_payment_id);
          setSignature(response.razorpay_signature);
          setPayment(true)
          console.log(typeof(response.razorpay_payment_id))
          navigate('/paymentDetails',{
            state: {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              products: cart,
              address: address
            }
          })
          //func();
      },
      "prefill": {
          "name": "Yogesh Sharma",
          "email": "yogesha@gmail.com",
          "contact": "8396069030"
      },
      // "notes": {
      //     "address": "Razorpay Corporate Office"
      // },
      // "theme": {
      //     "color": "#3399cc"
      // }
  };
  var rzp1 = new window.Razorpay(options);

  rzp1.open();



  rzp1.on('payment.failed', function (response){
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
  });
  }

  return (
    <>
    <props.header/>
      <div className='shippingDetails'>
          <h2>Add your Delivery Address</h2>
          <form>
            <label htmlFor="name">Name: </label>
            <input type="text" onChange={handleChange} name="name" id="name" />
            <br />
            <br />
            <label htmlFor="locality">Locality: </label>
            <input type="text" onChange={handleChange} name="locality" id="locality" />
            <br />
            <br />
            <label htmlFor="pin">Pincode: </label>
            <input type="number" onChange={handleChange} name="pin" id="pin" />
            <br />
            <br />
            <label htmlFor="city">City: </label>
            <input type="text" onChange={handleChange} name="city" id="city" />
            <br />
            <br />
            <label htmlFor="state">State: </label>
            <input type="text" onChange={handleChange} name="state" id="state" />
            <br />
            <br />
            <label htmlFor="landmark">Landmark: </label>
            <input type="text" onChange={handleChange} name="landmark" id="landmark" />
            <br />
            <br />
            <label htmlFor="email">Email: </label>
            <input type="email" onChange={handleChange} name="email" id="email" />
            <br />
            <br />
            <label htmlFor="phone">Phone No. : </label>
            <input type="tel" onChange={handleChange} name="phone" id="phone" />
            <br />
            <br />
            <label htmlFor="altphone">Alternate Phone No. : </label>
            <input type="tel" onChange={handleChange} name="altphone" id="altphone" />
            <br />
            <br />
            <button disabled={address.name.length<5 || address.email.length<3 || address.phone.length<1 || address.locality.length<10} onClick={buyNow} type="submit">Continue</button>
          </form>
      </div>
      <AmountTotal payment={payment} paymentId={paymentId} orderId={orderId}/>
    </>
  )
}

export default ShipAddress

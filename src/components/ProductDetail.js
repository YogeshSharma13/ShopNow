import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "../style.css";
import productContext from '../context/products/productContext'

const ProductDetail = (props) => {

  const location2 = useLocation();
  let cartText = "Add to Cart"
  const [loading, setLoading] = useState(false);
  const [payment,setPayment] = useState(false);
  const [orderId,setorderId] = useState('');
  const [paymentId,setPaymentId] = useState('');
  const [signature,setSignature] = useState('');
  const context = useContext(productContext);
  //const [detailproduct, setdetailproduct] = useState({});
  const [delivery,setdelivery] = useState({
    date: "5",
    charges: 0
  });
  const {detailproduct, setdetailproduct} = context;


  const checkPin = async (e) =>{
    e.preventDefault();
    let pin = document.getElementById('pincode').value;
    console.log(pin)
    if(pin==='131001'){
      setdelivery({
        date: "2",
        charges: 50
      });
    }
    else {
      setdelivery({
        date: "4",
        charges: 100
      });
    }
    // const response = await fetch(`http://postalpincode.in/api/pincode/${pin}`,{
    //   method: "GET",
    // });
    // let json = await response.json();
    // setdelivery(json.)
  }


  const buyNow = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3030/api/order/${detailproduct._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
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
      "image": "https://example.com/your_logo",
      "order_id": json.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
          setorderId(response.razorpay_order_id);
          setPaymentId(response.razorpay_payment_id);
          setSignature(response.razorpay_signature);
          setPayment(true)
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

  const handleOnCart = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3030/api/cart/addToCart/${detailproduct._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    alert("Added to Cart")
  }


const updateProducts = async () =>{
  console.log("func in");
  console.log("id - 2 - " + location2.state.id);
      const response = await fetch(`http://localhost:3030/api/products/${location2.state.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      const json = await response.json();  // parses JSON response into native JavaScript objects
      console.log("fetched");
      console.log(json);
      console.log(typeof(json))
      console.log(json)
      await setdetailproduct(json[0]);
      setLoading(true);
      console.log(detailproduct)
}

useLayoutEffect(()=>{
   updateProducts();
},[])


    return (
      <>
      <props.header/>
      {loading && <div>
        <aside className='detailImg'>
            <img className='imge' src={detailproduct.image} alt="product Image" />
            <button onClick={handleOnCart} className="btn-primary addToCart">{cartText}</button>
            <button className="btn-primary buyBtn" onClick={buyNow}>Buy Now</button>
        </aside>

        <div className='productDetail'>
            <div className='Detail'>
                <h3>{detailproduct.title}</h3>
                <h3><b>₹ {detailproduct.price}</b></h3>
                <p>{detailproduct.description}</p>
            </div>
            <div>
                <h5>Deliver to</h5>
                <form>
                    <input type="text" name="pincode" id="pincode" />
                    <button onClick={checkPin} className='pinBtn'>Check</button>
                </form>
                <br />
                <p><b>Usually delivered in {delivery.date} days</b></p>
                <p>Enter pincode for exact delivery dates/charges</p>
            </div>
            <div>
              {payment && (<div>
                <p>Payment Id: {paymentId}</p>
                <p>Order Id: {orderId}</p>
                <p>Signature: {signature}</p>
                </div>
                )}
            </div>
        </div>

      </div>}
      </>
    )
}

export default ProductDetail

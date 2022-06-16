import React, {useContext,useEffect, useState} from 'react'
import productContext from '../context/products/productContext'
import '../style.css'

function AmountTotal(props) {
    const context = useContext(productContext);
    const {cart,setCart} = context;
    const [price,setPrice] = useState(0);

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
  return (
    <>
      <aside className='amountTotal'>
          <h2>Price Details</h2>
          <div>
              <div>
                <div>Price</div>
                <span>{price}</span>
              </div>
              <div>
                <div>Delivery Charges</div>
                <span>50</span>
              </div>
              <div>
                <div>Total Payble</div>
                <span>{price+50}</span>
              </div>
          </div>
          {props.payment && 
          <div>
            <table>
              <tbody>
                <tr>
                  <td colSpan='2'><h2>Payment Details</h2></td>
                </tr>
                <tr>
                  <td>Payment Status</td>
                  <td>Successfull</td>
                </tr>
                <tr>
                  <td>Payment Id</td>
                  <td>{props.paymentId}</td>
                </tr>
                <tr>
                  <td>Order Id</td>
                  <td>{props.orderId}</td>
                </tr>
              </tbody>
            </table>
            </div>}
      </aside>
    </>
  )
}

export default AmountTotal

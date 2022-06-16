import React, {useHistory, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import productContext from '../context/products/productContext'
import { useNavigate } from 'react-router-dom';

const Product = (props)=> {
  // let history = useHistory();
  // const handleClick = () =>{
  //   props.setProductId(props.id);
  //   console.log('clicked');
  //   // this.history.push('/detail')
  // }
  const navigate = useNavigate();
  const context = useContext(productContext);
  const {detailproduct,productDetail,cart,setCart} = context;
  let mystyle = {
    textDecoration: 'none',
    color: 'black'
  }
  
      let {title, description, category, image, id, price} = props;

      const handleClick = async (e) =>{
        e.preventDefault();
        console.log("id = " + id);
        navigate('detail',{
          state: {
            id: id
          }
        })
      }

      

      useEffect(()=>{
        //console.log(props)
      },[])
    return (
      <>
      <div className='detailProduct' onClick={handleClick}>
      {/* <Link style={mystyle} to='/detail'> */}
      <div className="card" style={{width: "18rem", height: "370px"}}>
      <img src= {image} className="card-img-top product-img" alt="Product Image"/>
      <div className="card-body">
        <h5 className="card-title">{title?title.slice(0,54):title}</h5>
        <p className="card-text">{description?description.slice(0,50):description}...</p>
      </div>
      <ul className="list-group list-group-flush">
      <li className="list-group-item">Price: ₹ {price}</li>

        <li className="list-group-item">category: {category}</li>
      </ul>
      {/*<div className="card-body">
        <a href="#" className="card-link">Card link</a>
        <a href="#" className="card-link">Another link</a>
    </div>*/}
    </div>
    {/* </Link> */}
      </div>
      
      </>
      
    )
}

export default Product

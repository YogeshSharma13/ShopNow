import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import productContext from '../../context/products/productContext'
import "../../style.css"


function AddNewProduct(props) {
  
  const context = useContext(productContext);
  const {addProduct} = context;
  const [product, setProduct] = useState({title: "", price: "", category: "", description: "",image:""});

  //const {title,price,category,description,image} = product;

  const onChange =  e =>{
    
    console.log(e.target.value)
    setProduct({...product, [e.target.name]: e.target.value});
  }

  const handleClick = async(e) =>{
    e.preventDefault();
    //main code
  
    console.log(product.title,product.price,product.category,product.description,product.image);
    addProduct(product.title,product.price,product.category,product.description,product.image);
    //await axios.post(`http://localhost:3030/api/products/addProduct`,formData,{headers}).then(response => console.log(response)).catch(err => console.log(err)); //addProduct(formData);
    alert("Added Successfully");
    setProduct({title: "", price: "", category: "", description: "", image:""});
    //console.log(product)
  }

  // const imageUpload = (e) =>{
  //   console.log(e.target.files[0])
  //   setProduct({...product, image: e.target.files[0]});
  // }

  return (
    <>
    <props.header/>
    <aside className='AdminAside'>
            <ul className='adminNav'>
                <li className='adminNavItem'><Link to='/orders'>Orders</Link></li>
                <li className='adminNavItem'><Link to='/showAllProduct'>All Products</Link></li>
                <li className='adminNavItem'><Link style={{"color":"black"}} to='/addNewProduct'>Add New Product</Link></li>
            </ul>
        </aside>
        <div className="container AddnewContainer">
         <div className="addProduct">
            
            <form onSubmit={handleClick} encType='multipart/form-data'>
              <table>
                <tbody>
                  <tr>
                    <td className='addProdtd' colSpan="2"><h1>Add a New Product</h1></td>
                  </tr>
                <tr>
                  <td className='addProdtd'>
                      <label htmlFor="title">Product Name: </label>
                  </td>
                  <td className='addProdtd'>
                  <input type="text" placeholder='Enter Product Name' value={product.title} name="title" onChange={onChange} id="title" required />
                  </td>
                </tr>
                <tr>
                  <td className='addProdtd'>
                  <label htmlFor="price">Product Price: </label>
                  </td>
                  <td className='addProdtd'>
                  <input type="number" placeholder='Enter Price' value={product.price} name="price" onChange={onChange} id="price" required/>

                  </td>
                </tr>
                
                <tr>
                  <td className='addProdtd'>
                  <label htmlFor="category">Category: </label>           
                  </td>
                  <td className='addProdtd'>
                  <input type="text" placeholder='Enter Product Category' value={product.category} name="category" onChange={onChange} id="category" required/>
                  </td>
                </tr>
                <tr>
                  <td className='addProdtd'>
                  <label htmlFor="description">Description: </label>
                  </td>
                  <td className='addProdtd'>
                  <input type="text" placeholder='Enter Description' value={product.description} name="description" onChange={onChange} id="description" required/>
                  </td>
                </tr>
                <tr>
                  <td className='addProdtd'>
                  <label htmlFor="image">Attach Product Image: </label>
                  </td>
                  <td className='addProdtd'>
                  <input type="text" placeholder='Add Product Image Link' name="image" onChange={onChange} id="image" required/>
                   </td>
                </tr> 
                <tr>
                  <td className='addProdtd' colSpan="2">
                  <button disabled={product.title.length<5 || product.category.length<3 || product.price.length<1 || product.description.length<10} type='submit' className='btn btn-primary'>Save</button>
                  </td>
                </tr>
              </tbody>
              </table>
                
                {/* <br />
                <br />
                
                <br />
                <br />
                
                <br />
                <br />
                
                <br />
                <br />
                
                <br /> */}
                <br />
                
            </form>
        </div>
        </div>
    </>
  )
}

export default AddNewProduct

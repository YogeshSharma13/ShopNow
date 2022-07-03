import { useState } from "react";
import ProductContext from "./productContext";
const host = 'http://localhost:3030';

const ProductState = (props) =>{

    const InitialProducts = [];
    const initialDetail = {};
    const initialCart = [];
    const [allproducts, setAllproducts] = useState(InitialProducts);
    const [detailproduct, setdetailproduct] = useState(initialDetail)
    const [searchText, setSearchText] = useState("");
    const [cart,setCart] = useState(initialCart);
    const [address, setAddress] = useState({name: "",email:"", phone: 0,altphone:0,locality: "",pincode:0,city:"",state:"",landmark:""});
    //const [buyProduct,setBuyProduct] = useState([]);
    const [order, setOrder] = useState([]);
    const [pending, setPending] = useState([]);
    const [delivered, setDelivered] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    //const [myproducts, setProducts] = useState([])
    //const [detailproduct, setdetailproduct] = useState({});

    // Get all products

    const getProducts = async () =>{
        const response = await fetch(`${host}/api/products/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
             // "auth-token": localStorage.getItem('token);
            },
          });
          const json = await response.json(); // parses JSON response into native JavaScript objects
          console.log(json)
          setAllproducts(json);
    }

    // Get category wise products

    const getProductsCategory = async (category) =>{
      const response = await fetch(`${host}/api/products/category/${category}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
           // "auth-token": localStorage.getItem('token);
          },
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json)
        setAllproducts(json);
  }

    //Get searched products

    const getSearchProducts = async (search) =>{
      setAllproducts(InitialProducts);
      const response = await fetch(`${host}/api/products/search/${search}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json)
        setAllproducts(json);
  }

    
    //add a product

        const addProduct = async (title,price,category,description,image) =>{
          
          //console.log('==' + image + '===' + image.name)
          
          console.log("ps" + JSON.stringify({title,price,category,description,image}));
            const response = await fetch(`${host}/api/products/addProduct`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  "adminAuth-token": localStorage.getItem('Admintoken')
                },
                body: JSON.stringify({title,price,category,description,image}), // body data type must match "Content-Type" header
                
              });
            //   //console.log(JSON.stringify(formData));
            //   console.log(response);
            //   //console.log(await response.json());
              const product = await response.json();
              
            //   console.log(product)
            //   //const json = response.json(); // parses JSON response into native JavaScript objects
              setAllproducts(allproducts.concat(product))
            //axios.post(`${host}/api/products/addProduct`,formData,{headers}).then(response => console.log(response));
            //console.log(response);
        }

    //delete a product

    const deleteProduct = async (id) =>{
            console.log('deleted' + id)
            const response = await fetch(`${host}/api/products/deleteproduct/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  "adminAuth-token": localStorage.getItem('Admintoken')
                },
                //body: JSON.stringify({title,price,category,description}) // body data type must match "Content-Type" header
              });
              const js = await response.json();
              const newallproducts = allproducts.filter((product)=>{return product._id !==id})
              setAllproducts(newallproducts);

    }

    //Product Detail

    const productDetail = async (id) =>{
      console.log("func in");
      const response = await fetch(`${host}/api/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();  // parses JSON response into native JavaScript objects
      console.log("fetched");
      console.log(typeof(json))
      console.log(json)
      await setdetailproduct(json);
      console.log(detailproduct)
    }

    // Get all products

    const getSellerProducts = async () =>{
      const response = await fetch(`${host}/api/products/getsellerProducts/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
           "adminAuth-token": localStorage.getItem('Admintoken')
          },
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json)
        setAllproducts(json);
  }

    return (
        
        <ProductContext.Provider value={{cartTotal, setCartTotal,setAllproducts,getSellerProducts, setdetailproduct,order,setOrder,setAddress,address,cart,setCart,detailproduct,getProductsCategory,productDetail,allproducts,deleteProduct, addProduct, getProducts,getSearchProducts,searchText,setSearchText,pending,delivered,setPending,setDelivered}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState;
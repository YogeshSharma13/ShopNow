import React from 'react'
//import productContext from '../context/products/productContext';
import FilterPopup from './FilterPopup';


const Filter = () => {
    // const context = useContext(productContext);
    // const {allproducts,setAllproducts} = context

    // const sortFunc = async () =>{
    //     let f = document.getElementById('sort').selectedIndex;
    //     let o = document.getElementById('sort').options;
    //     console.log(o[f].index + ' - ' + o[f].value);
        
    //         const response = await fetch(`http://localhost:3030/api/products/sort`,{
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({products:allproducts,key:o[f].value})
    //       });
    //     const json = await response.json();
    //     // let a = [];
    //     // if(o[f].value==="asc"){
    //     //   a = allproducts.sort((a,b)=>a.price-b.price);
    //     // }
    //     // else{
    //     //   a = allproducts.sort((a,b)=>b.price-a.price);
    //     // }
        
    //     console.log("changed")
    //     await setAllproducts(json);
    //     console.log(allproducts)
    // }
    

    // const filterFunc = async () =>{
    //     let f = document.getElementById('filter').selectedIndex;
    //     let o = document.getElementById('filter').options;
    //     if(o[f].index===0){
    //         console.log('all')
    //     }
    //     console.log(o[f].index + ' - ' + o[f].value)
    //     const response = await fetch(`http://localhost:3030/api/products/filter/${o[f].value}`,{
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       });
    //     const json = await response.json();
    //     await setAllproducts(json);
    // }

  return (
    <>
    <FilterPopup/>
    {/* <div style={{"display":"inline-block"}} className='col-md-10'>
    <label>Filter</label>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg>
    </div> */}
    {/* <div style={{"display":"inline-block"}} className='col-md-2'>
        <label htmlFor="sort">Sort By Price</label>
        <select onChange={sortFunc} name="sort" id="sort"> 
            <option value="none">Select</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
        </select>
    </div> */}
      
    </>
  )
}

export default Filter



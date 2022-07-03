import React, {useState} from "react";
import { useContext } from "react";
import productContext from '../context/products/productContext';

const FilterPopup = () => {
  const [filter, setFilter] = useState({ min:0,max:0 });
  const context = useContext(productContext);
  const {allproducts, setAllproducts} = context;


  const RadioChange = (value) => {
    
    setFilter(value);
    console.log(filter);

  };

  const handleFilter = async (e) =>{
    e.preventDefault();
    const response = await fetch(`http://localhost:3030/api/products/sort`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //"auth-token": localStorage.getItem('token')
      },body: JSON.stringify({products:allproducts,key:"des"})
    });
    //console.log(response)
  const json = await response.json(); // parses JSON response into native JavaScript objects
  console.log(json);
  await setAllproducts(json);

    console.log(allproducts)
    
  }

  const handleCatLeft = () => {
    let list = document.getElementById("categoryItems");
    let Darrow = document.getElementById("CdownArrow");
    let Larrow = document.getElementById("CleftArrow");

    list.style.display = "block";
    Darrow.style.display = "inline-block";
    Larrow.style.display = "none";
  };

  const handleCatDown = () => {
    let list = document.getElementById("categoryItems");
    let Darrow = document.getElementById("CdownArrow");
    let Larrow = document.getElementById("CleftArrow");

    list.style.display = "none";
    Darrow.style.display = "none";
    Larrow.style.display = "inline-block";
  };

  const handlePriceLeft = () => {
    let list = document.getElementById("PriceRange");
    let Darrow = document.getElementById("PdownArrow");
    let Larrow = document.getElementById("PleftArrow");

    list.style.display = "block";
    Darrow.style.display = "inline-block";
    Larrow.style.display = "none";
  };

  const handlePriceDown = () => {
    let list = document.getElementById("PriceRange");
    let Darrow = document.getElementById("PdownArrow");
    let Larrow = document.getElementById("PleftArrow");

    list.style.display = "none";
    Darrow.style.display = "none";
    Larrow.style.display = "inline-block";
  };

  return (
    <>
      <div className="filterOptions">
        <h3>Filters</h3>
        
        <div
          className="filterDiv"
          style={{ width: "90%", border: "1px solid grey", padding: "5px" }}
        >
          <svg
            id="CleftArrow"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-left"
            viewBox="0 0 16 16"
            onClick={handleCatLeft}
          >
            <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
          </svg>
          <svg
            id="CdownArrow"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-down"
            viewBox="0 0 16 16"
            onClick={handleCatDown}
          >
            <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
          </svg>
          <span>
            <b>Category</b>
          </span>
          {/* <select name="sort" id="sort">
            <option value="none">Select</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="jewelery">Women</option>
            <option value="electronics">Women</option>
        </select>  */}
          <div>
            <ul id="categoryItems">
              <li>Men</li>
              <li>Women</li>
              <li>Jewelery</li>
              <li>Electronics</li>
            </ul>
          </div>
        </div>
        <div
          className="filterDiv"
          style={{ width: "90%", border: "1px solid grey", padding: "5px" }}
        >
          <svg
            id="PleftArrow"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-left"
            viewBox="0 0 16 16"
            onClick={handlePriceLeft}
          >
            <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
          </svg>
          <svg
            id="PdownArrow"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-down"
            viewBox="0 0 16 16"
            onClick={handlePriceDown}
          >
            <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
          </svg>
          <span>
            <b>Price(Rs) </b>
          </span>
          
          <div>
            <ul id="PriceRange">
              <li>
                <input
                  onClick={() => {
                    RadioChange({ min: 0, max: 1000 });
                  }}
                  // style={{ appearance: "none" }}
                  type="radio"
                  name="priceRange"
                  value={{ min: 0, max: 1000 }}
                  id="priceRange1"
                />
                <label htmlFor="priceRange1">0 - 1000</label>
              </li>
              <li>
                <input
                  onClick={() => {
                    RadioChange({ min: 1000, max: 5000 });
                  }}
                  // style={{ appearance: "none" }}
                  type="radio"
                  name="priceRange"
                  value={{ min: 1000, max: 5000 }}
                  id="priceRange2"
                />
                <label htmlFor="priceRange2">1000 - 5000</label>
              </li>
              <li>
                <input
                  onClick={() => {
                    RadioChange({ min: 5000, max: 10000 });
                  }}
                  // style={{ appearance: "none" }}
                  type="radio"
                  name="priceRange"
                  value={{ min: 5000, max: 10000 }}
                  id="priceRange3"
                />
                <label htmlFor="priceRange3">5000 - 10000</label>
              </li>
              <li>
                <input
                  onClick={() => {
                    RadioChange({ min: 10000 });
                  }}
                  // style={{ appearance: "none" }}
                  type="radio"
                  name="priceRange"
                  value={{ min: 10000 }}
                  id="priceRange4"
                />
                <label htmlFor="priceRange4">10000+</label>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <button onClick={handleFilter} className="btn">Filter</button>
        </div>
      </div>
    </>
  );
};

export default FilterPopup;

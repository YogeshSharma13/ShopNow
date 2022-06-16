import React from 'react'
import img1 from "../Addd.jpeg"
import '../style.css';

const Add = ()=> {
    return (
      <>
        <div className='add col-md-4'>
          <a href='/'><img className='adImg' src={img1}/></a>
        </div>
      </>
    )
}

export default Add
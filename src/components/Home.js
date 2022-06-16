import React, { Component } from 'react'
import Add from './Add';
import Products from './Products'
import Banner from './Banner';
import '../style.css'

const Home = (props) => {
  
    return (
      <>
      <props.header/>
      <Banner />
        <Products category = {'electronics'} link = {'/electronics'}/>
        <Products category = {'jewelery'} link={'/jewelery'}/>
        <Products category = {"men's clothing"} link={'/men'}/>
        <div className='row showAds'>
        <Add/>
        <Add/>
        <Add/>
        </div>
        <Products category = {"women's clothing"} link={'/women'}/>

      </>
    )
}

export default Home


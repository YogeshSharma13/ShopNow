import React from "react";


function About(props) {
  return (
    <>
    <props.header/>
      <div style={{"textAlign":"center","padding":"75px","height":"400px","backgroundColor":"aliceblue","display":"inline-block"}} className="container">
        <h1>ABOUT US</h1>
        <p style={{"margin":"30px"}}>
          This is an E-Commerce Website made by <b>YOGESH</b>. After this Covid
          crisis, there is a slight increase in customers in online shopping.
          This website helps sellers to sell their products online and helps
          customers to order their desired product online.
        </p>
      </div>
    </>
  );
}

export default About;

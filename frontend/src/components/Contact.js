import React from 'react'

function Contact(props) {
  return (
    <>
    <props.header/>
      <div style={{"textAlign":"center","padding":"75px","height":"400px","backgroundColor":"aliceblue","display":"inline-block"}} className="container">
        <h1>CONTACT US</h1>
        <span>
        <h6>Phone: </h6>
        <p>8396069030</p>
        <h6>Email: </h6>
        <p>yogesha159@gmail.com</p>
        </span>
      </div>
    </>
  )
}

export default Contact

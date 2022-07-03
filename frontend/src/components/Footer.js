import React from 'react';
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div style={{"backgroundColor":"white"}}>
      <div>
        <ul style={{"listStyle":"none"}}>
            <li style={{"display":"inline-block","padding":"10px"}}>
            <Link className="nav-link" to="/about">About Us</Link>
            </li>
            <li style={{"display":"inline-block","padding":"10px"}}>
            <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
        </ul>
      </div>
      <h5>Follow Us</h5>
      <div>
      <ul style={{"listStyle":"none"}}>
            <li style={{"display":"inline-block","padding":"10px"}}>
            <a className="nav-link" href="/about">Facebook</a>
            </li>
            <li style={{"display":"inline-block","padding":"10px"}}>
            <a className="nav-link" href="/contact">Instagram</a>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer

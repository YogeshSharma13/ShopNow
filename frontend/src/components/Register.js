import React, {useState} from "react";
import "../style.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register(props) {
  const tdStyle = {
    "padding": "15px"
  }

  const [userData, setUserData] = useState({name: "",email:"", password: "",cpassword:""});
  let navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:3030/api/auth/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: userData.name,email:userData.email,password: userData.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //save the authtoken and redirect
      //localStorage.setItem('token',json.authToken);
      alert('signup successfull')
      navigate("/")
 }
    else{
      alert("User Already exist")
    }
  }

  const onChange = (e) =>{
    setUserData({...userData, [e.target.name]: e.target.value});
  }

  return (
    <>
    <props.header/>
      <div className="container LoginContainer">
        <div className="loginDisplay">
          <h1 style={{"textDecoration":"underline"}}>USER</h1>
          <h2>Please Register to Continue</h2>
        </div>
        <div className="LoginForm">
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td style={tdStyle}><label style={{"marginRight": "10px"}} htmlFor="name"><strong>Name: </strong></label></td>
                  <td style={tdStyle}><input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={userData.name}
              onChange={onChange}
              id="name"
            /></td>
                </tr>
                <tr>
                  <td style={tdStyle}><label style={{"marginRight": "10px"}} htmlFor="email"><strong>Email: </strong></label></td>
                  <td style={tdStyle}><input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={userData.email}
              onChange={onChange}
              id="email"
            /></td>
                </tr>
                <tr>
                  <td style={tdStyle}><label style={{"marginRight": "10px"}} htmlFor="password"><strong>Password: </strong></label></td>
                  <td style={tdStyle}><input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={userData.password}
              onChange={onChange}
              id="password"
            /></td>
                </tr>
                <tr>
                  <td style={tdStyle}><label style={{"marginRight": "10px"}} htmlFor="cpassword"><strong>Confirm Password: </strong></label></td>
                  <td style={tdStyle}><input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              value={userData.cpassword}
              onChange={onChange}
              id="cpassword"
            /></td>
                </tr>
              </tbody>
            </table>
          
            
            {/* <br />
            <br />
            
            
            <br />
            <br />
            
            
            <br />
            <br /> */}
            
            
            <br />
            <p>
              By continuing, you agree to our Terms of Use and Privacy Policy.
            </p>
            <br />
            <button className="btn-primary">Register</button>
            <br />
            <Link to="/login">Already Registered? Login</Link>
          </form>
        </div>
      </div>
    </>
  );
}

import React, {useState} from "react";
import "../../style.css";
import { Link, useNavigate } from "react-router-dom";

export default function AdminSignup(props) {
  const tdStyle = {
    "padding": "15px"
  }

  const [adminData, setAdminData] = useState({name: "",email:"", password: "",cpassword:""});
  let navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:3030/api/admin/createAdmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: adminData.name,email:adminData.email,password: adminData.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //save the authtoken and redirect
      localStorage.setItem('Admintoken',json.adminAuthToken);
      alert('signup successfull')
      navigate("/admin")
 }
    else{
      alert("User Already exist")
    }
  }

  const onChange = (e) =>{
    setAdminData({...adminData, [e.target.name]: e.target.value});
  }

  return (
    <>
    <props.header/>
      <div className="container LoginContainer">
        <div className="loginDisplay">
          <h1>Please Register to Continue</h1>
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
              value={adminData.name}
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
              value={adminData.email}
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
              value={adminData.password}
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
              value={adminData.cpassword}
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
            <Link to="/adminLogin">Already Registered? Login</Link>
          </form>
        </div>
      </div>
    </>
  );
}

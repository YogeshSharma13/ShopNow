import React, {useState} from 'react'
import '../style.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(props) {

  const [userCred, setUserCred] = useState({email:"", password: ""});
  let navigate = useNavigate();


  const onChange = (e) =>{
    setUserCred({...userCred, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:3030/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:userCred.email,password: userCred.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //save the authtoken and redirect
      localStorage.setItem('token',json.authToken);
      alert("You logged in Successfully")
      navigate("/")

    }
    else{
      alert("Invalid credentials");
    }
  }

  return (
    <>
    <props.header/>
      <div className="container LoginContainer">
          <div className='loginDisplay'>
            <h1>Please Login to Continue</h1>
          </div>
          <div className='LoginForm'>
                <form onSubmit={handleSubmit}>
                  <label style={{"marginRight": "10px"}} htmlFor="userEmail"><strong>Email: </strong></label>
                  <input type="email" name="email" value={userCred.email} placeholder='Enter Email' onChange={onChange} id="userEmail" />
                  <br />
                  <br />
                  <label style={{"marginRight": "10px"}} htmlFor="userPassword"><strong>Password: </strong></label>
                  <input type="password" name="password" value={userCred.password} placeholder='Enter Password' onChange={onChange} id="userPassword" />
                  <br />
                  <br />
                  <p>By continuing, you agree to our Terms of Use and Privacy Policy.</p>
                  <br />
                  <button type='submit' className="btn-primary">Login</button>
                  <br />
                  <Link to='/resetPass'>Forgot Password?</Link>
                  <br />
                  <br />
                  <Link to='/register'>New Here? Create an Account</Link>
                </form>
          </div>
      </div>
    </>
  )
}

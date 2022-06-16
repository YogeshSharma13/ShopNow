import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../style.css'

const ResetPass = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [eOtp,seteOtp] = useState("")
  const onChange = (e) =>{
    console.log(e.target.value);
    setEmail(e.target.value);
  }

  const changeOtp = (e) =>{
    seteOtp(e.target.value);
  }
  const getOtp = async(e) =>{
    //console.log('deleted' + id)
    e.preventDefault();
    console.log(email);
            const response = await fetch(`http://localhost:3030/api/auth/sendEmail`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  //"adminAuth-token": localStorage.getItem('Admintoken')
                },
                body: JSON.stringify({email}) // body data type must match "Content-Type" header
              });

              let otpdiv = document.getElementById('enterOtp');
              otpdiv.style.display = "block";


              //navigate('/');

              // const js = await response.json();
              // const newallproducts = allproducts.filter((product)=>{return product._id !==id})
              // setAllproducts(newallproducts);
  }

  const validateOtp = async (e) =>{
    e.preventDefault();
    const response = await fetch(`http://localhost:3030/api/auth/validateOtp`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  //"adminAuth-token": localStorage.getItem('Admintoken')
                },
                body: JSON.stringify({email,eOtp}) // body data type must match "Content-Type" header
              });

              const js = await response.json();
              console.log(js);
              if(js.success){
                navigate('/changePass',{
                  state: {
                    email: email
                  }
                })
              }
              document.getElementById('otpErrMsg').innerHTML = js.message;
  }

  return (
    <>
      <div className='container ResetPassword'>
          <div className='reset'>
          <h2>Reset Password</h2>
          <form className='resetForm'>
              <label htmlFor="Reset-email">Email</label>
              <br />
              <input onChange={onChange} type="email" name="Reset-email" id="Reset-email" />
              <br />
              <br />
              <button disabled={!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))} onClick={getOtp}>Get Otp</button>
              <button onClick={()=>{
                navigate('/login')
              }} className='mx-3'>Back</button>
              <br />
              <br />
              <div id='enterOtp' style={{"display":"none"}}>
              <input onChange={changeOtp} type="text" placeholder='Enter Otp' name="otp" id="otp" />
              <br />
              <p id='otpErrMsg'></p>
              <br />
              <button onClick={validateOtp} type="submit">Submit</button>
              </div>
              
          </form>
          </div>
      </div>
    </>
  )
}

export default ResetPass

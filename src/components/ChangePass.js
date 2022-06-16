import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


function ChangePass() {

    const navigate = useNavigate();
    const location3 = useLocation();
    const [pass,setPass] =useState("");
    const [cpass,setCPass] =useState("");

    const onChange = (e) =>{
        setPass(e.target.value);
      }
      const onCchange =(e) =>{
        setCPass(e.target.value);
      }

    const changePassword = async (e) =>{
        e.preventDefault();
        console.log(location3.state)
        const response = await fetch('http://localhost:3030/api/auth/changePass',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              //"adminAuth-token": localStorage.getItem('Admintoken')
            },
            body: JSON.stringify({email:location3.state.email,password:pass}) // body data type must match "Content-Type" header
          })
          const js = await response.json();
          console.log(js);
    }

  return (
    <>
      <div className='container ResetPassword'>
          <div className='reset'>
          <h2>Change Password</h2>
          <form className='resetForm'>
              <label htmlFor="newPass">Enter New Password</label>
              <br />
              <input onChange={onChange} type="password" name="password" id="newPass" />
              <br />
              <br />
              <label htmlFor="cnewPass">Confirm Password</label>
              <br />
              <input onChange={onCchange} type="password" name="cpassword" id="cnewPass" />
              <br />
              <br />
              <button onClick={changePassword}>Change Password</button>
              <button onClick={()=>{
                navigate('/login')
              }} className='mx-3'>Back</button>
              <br />
              <br />
              
          </form>
          </div>
      </div>
    </>
  )
}

export default ChangePass

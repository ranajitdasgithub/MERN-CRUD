import React from 'react'
import { useState } from 'react'
// import axios from "axios"

const Register = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [name,setName]=useState("")

  const handleSubmit=()=>{
    const payload={
      email,
      password,
      name
    }
   fetch("https://frozen-lowlands-38414.herokuapp.com/user/signup",{
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body : JSON.stringify(payload)
        })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
  }

  return (
    <div>
      <h2>Signup Page</h2>
      <input type="text" placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} />
      <br/>
      <input type="text" placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} />
      <br/>
      <input type="text" placeholder='Enter name' onChange={(e)=>setName(e.target.value)} />
      <br/>
      <button onClick={handleSubmit}>Register here</button>
    </div>
  )
}

export default Register
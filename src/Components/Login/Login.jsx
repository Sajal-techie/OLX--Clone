import React, { useEffect, useRef, useState,useContext } from 'react';
import { FirebaseContext } from '../../store/Context'; 
import Logo from '../../assets/olx-logo.png';
import './Login.css';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import {useNavigate} from 'react-router-dom' 

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const inputRef = useRef(null)
  const {db} = useContext(FirebaseContext)
  const auth = getAuth();
  const navigate = useNavigate()
  function handleSubmit(e){
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => { 
    console.log('logged');
    const user = userCredential.user;
    navigate('/')

  })
  .catch((error) => {
    console.log(error);
  });
  }

  useEffect(()=>{
    inputRef.current.focus()
  },[])
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            name="email"
            ref={inputRef}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
import React, { useEffect, useRef, useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Logo from '../../assets/olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import {doc, setDoc, addDoc, collection} from "firebase/firestore"


export default function Signup() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [number,setNumber] = useState('')
    const [password,setPassword] = useState('')
    const inputRef = useRef(null)
    const {db} = useContext(FirebaseContext)
    const auth = getAuth()
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
      e.preventDefault()
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
        const user = userCredential.user;
        user.displayName = name     
        console.log(user.uid,user.displayName) 

      } ).then(()=>{
        addDoc(collection(db,'users'),{
          id: auth.currentUser.uid,
          username:name,
          number:number
        })

      }).then(()=>{
        navigate('/login')
        console.log('hhhh')

      }).catch((err)=>{
        console.log(err);
      })
    } 

    useEffect(()=>{
       inputRef.current.focus();
    },[])
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            ref = {inputRef}
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            name="phone"
            value={number}
            onChange={(e)=>setNumber(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
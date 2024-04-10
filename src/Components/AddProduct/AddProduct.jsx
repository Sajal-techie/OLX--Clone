import React, { useContext, useState } from 'react'
import './AddProduct.css'
import '../NavBar/NavBar'
import { AuthContext,FirebaseContext } from '../../store/Context'
import { storage } from '../../firebase/config'
import {getDownloadURL, ref,uploadBytes} from 'firebase/storage'
import { collection,addDoc } from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

const AddProduct = () => {
  const {user} = useContext(AuthContext)
  const {db} = useContext(FirebaseContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)
  const [imgUrl,setImgurl] = useState(null)
  const navigate = useNavigate()
  const dates = new Date(Date.now())
  const handleSubmit = (e)=>{
    e.preventDefault();
    if (image) {
      const storageRef = ref(storage,`/images/${image.name}`)
      uploadBytes(storageRef, image).then((url) => {
        getDownloadURL(storageRef).then((url)=>{
          addDoc(collection(db,'products' ),{
          name,
          category,
          price,
          url,
          userId: user.uid ,
          createdAt: dates.toISOString().split('T')[0], 
        })
        })
        navigate('/')
      }).catch(err=>console.log(err))
    }
    else{
      console.log('fill every fields');
    }
  }
  return (
    <>
      <card>
        <div className="centerDiv">
           
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            /> 
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              name="category"
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number"  name="Price"
            value={price} 
            onChange={(e)=>{setPrice(e.target.value)}}
            />
            <br />
         
          <br />
          <img alt="Product Image" width="200px" height="200px" src={image ? URL.createObjectURL(image):'' } ></img>
          
            <br />
            <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
         
        </div>
      </card>
    </>
  )
}

export default AddProduct

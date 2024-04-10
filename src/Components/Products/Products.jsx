import React, { useEffect,useContext, useState } from 'react'
import './Products.css'
import Heart from '../../assets/Heart';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../store/ProductContext';
import {useNavigate} from 'react-router-dom'

const Products = () => {
  const {db} = useContext(FirebaseContext)
  const [products,setProduct] = useState([])
  const {setProductDetails} = useContext(ProductContext)
  const navigate = useNavigate()
  useEffect( () =>{ 
    const collectionRef  = collection(db,'products') 
      getDocs(collectionRef).then((snapshot)=>{
      const allProducts =  snapshot.docs.map((obj)=>{
        return {
          ...obj.data(),
          id:obj.id
        }
      }) 
      setProduct(allProducts)
    })
  },[db])
  const handleClick = (product)=>{
            console.log(product,'product');
            setProductDetails(product);
            navigate('/viewproduct')
  }
  console.log(products ,'ssss');
  return (
    <div className="postParentDiv">
    <div className="moreView">
      <div className="heading">
        <span>Quick Menu</span>
        <span>View more</span>
      </div>
      <div className="cards">
        {
            products.map((product)=>(
        <div
          className="card"
          onClick={()=>handleClick(product)}
        >
          <div className="favorite">
            <Heart></Heart>
          </div>
          <div className="image">
            <img src={product.url} alt="dsfas" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; {product.price}</p>
            <span className="kilometer">{product.category}</span>
            <p className="name"> {product.name} </p>
          </div>
          <div className="date">
            <span>{product.createdAt}</span>
          </div>
        </div>
            ))
        }
      </div>
    </div>
    <div className="recommendations">
      <div className="heading">
        <span>Fresh recommendations</span>
      </div>
      <div className="cards">
        <div className="card">
          <div className="favorite">
            <Heart></Heart>
          </div>
          <div className="image">
            <img src="../../../Images/R15V3.jpg" alt="" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; 250000</p>
            <span className="kilometer">Two Wheeler</span>
            <p className="name"> YAMAHA R15V3</p>
          </div>
          <div className="date">
            <span>10/5/2021</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Products

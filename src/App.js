import './App.css';
import Home from './Containers/Home';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import SignupPage from './Containers/SignupPage';
import LoginPage from './Containers/LoginPage';
import { AuthContext } from './store/Context';
import { useContext, useEffect } from 'react';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import AddProductPage from './Containers/AddProductPage';

function App() {
  const {setUser} = useContext(AuthContext)
  const auth = getAuth()
    useEffect(() => {
      let unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user); 
          console.log(user.displayName,user,'apphai') 
        }else{
          setUser(null)
          console.log('app,debug');
        }
    });

    return () => {if (unsubscribe) unsubscribe();}
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<SignupPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/add' element={<AddProductPage/>}/>
        </Routes>
      </Router>  
     
    </div>
  );
}

export default App;

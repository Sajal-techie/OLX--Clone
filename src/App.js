import './App.css';
import Home from './Containers/Home';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import SignupPage from './Containers/SignupPage';
import LoginPage from './Containers/LoginPage';
import { AuthContext } from './store/Context';
import { useContext, useEffect } from 'react';
import { getAuth,onAuthStateChanged } from 'firebase/auth';

function App() {
  const {user,setUser} = useContext(AuthContext)
  const auth = getAuth()
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); 
    });

    return () => unsubscribe();
  }, [auth]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<SignupPage/>} />
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
      </Router>  
     
    </div>
  );
}

export default App;

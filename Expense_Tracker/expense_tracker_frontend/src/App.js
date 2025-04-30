//import logo from './logo.svg';
import './App.css';
//import {BrowserRouter, Route } from 'react-router-dom';
import Records from './component/Records';
import Login from './component/login';
import SignUpUser from './component/signup';
import {BrowserRouter, Route ,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">

     <BrowserRouter>
     <Routes>
      <Route  exact path='/'  element={<Login/>}/>
      
      <Route  path='/sign-up'  element={<SignUpUser/>}/>
     
       <Route  path='/expense-dashboard'  element={<Records/>}/> 
       </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;

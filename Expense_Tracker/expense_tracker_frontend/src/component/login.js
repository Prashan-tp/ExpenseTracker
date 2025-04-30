import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {login_user}  from "../action/Useraction";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {Authorized} from "../action/Recordsaction";



const LoginUser = () => {
   
 const [email,loginEmail]=useState('');
 const [password,loginPassword]=useState('');
const dispatch = useDispatch();
const navigate = useNavigate();
const authenticate = useSelector((state)=>state.user.login);
console.log(authenticate);

useEffect(()=>{
  console.log(authenticate);
  if(authenticate==="SUCCESFULL"){
       setTimeout(() => {
        dispatch(Authorized())
        navigate("/expense-dashboard");
        },10);
}
else if (authenticate==="Not-SUCCESFULL" ) {
  setTimeout(() => {
    window.alert('Please Sign Again')
    },11);
  
}
  },[authenticate]);


const handelEmail=(e)=>{
    loginEmail(e.target.value)
}
const handelPassword=(e)=>{
    loginPassword(e.target.value)
}

const handelSubmit=(e)=>{
  e.preventDefault();
  if (!email ||!password ||  !email.trim() || !password.trim()) {

    window.alert('Fill Input Fields')
    
}else{
   
    const data ={
        email:email,
        password:password
      }
      dispatch(login_user(data));
    }
    loginEmail('');
    loginPassword('')
}

 const hadelSignup=(e)=>{
  
  e.preventDefault();
  
  navigate("/sign-up",{ replace: true });
  //use location
}

 
    return ( <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
      
    }}>
         
                <Box
                component="form"
                sx={{
                    display: 'flex',              
                    flexDirection: 'column',       
                    justifyContent: 'center',      
                    alignItems: 'center',          
                    border: '1px solid #ddd',      
                             
                    padding: '16px',              
                    width: '300px',                
                    height: '300px',               
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                  }}
                noValidate
                autoComplete="off"
                onSubmit={handelSubmit}
              >
                <div>
                <TextField id="email"  label="E-mail" variant="standard" value={email} onChange={handelEmail}sx={{ m: 1, width: '25ch' }} />
                </div>
                <div>
                <TextField id="password" type="password" label="Password" variant="standard" value={password} onChange={handelPassword} sx={{ m: 1, width: '25ch' }}/>
                </div>
                
                <div>
                <Button type="submit" variant="outlined" sx={{ m: 1, width: '25ch' }} >Login </Button>
                </div>
                <div>
                <Button  variant="outlined" sx={{ m: 1, width: '25ch' }} onClick={hadelSignup}> SignUp </Button>
                </div>
              </Box>
            
        
    </div> );
}
 
export default LoginUser;
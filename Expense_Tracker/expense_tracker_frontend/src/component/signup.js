
import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {signUp_user,signedUp_Success}  from "../action/Useraction";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
const SignUpUser = () => {

    
 const [email,signUpEmail]=useState('');
 const [password,signUpPassword]=useState('');
 const [confirmpassword,signUpconfirmpassword]=useState('');
const dispatch = useDispatch();
const navigate = useNavigate();


const signup = useSelector((state)=>state.user.signUp);
useEffect(()=>{
        
  if(signup==="SUCCESFULL"){
       setTimeout(() => {
        navigate("/");
        dispatch(signedUp_Success())
        },10);
}
else if (signup==="Not-SUCCESFULL") {
  window.alert('User Not added Succefully')
}
  },[signup]);

const handelEmail=(e)=>{
    signUpEmail(e.target.value)
}
const handelPassword=(e)=>{
    signUpPassword(e.target.value)
}
const handelConfirmPassword= (e)=>{
  console.log(e.target.value);
    signUpconfirmpassword(e.target.value);
}

const handelSubmit=(e)=>{
  e.preventDefault();
   
  if (!email ||!password ||  !email.trim() || !password.trim()) {
  
    window.alert('Fill Input Fields')
    
} 

else{
 
    const data ={
        email:email,
        password:password,
        confirmpassword:confirmpassword
 }

 dispatch(signUp_user(data));
}
signUpEmail('');
signUpPassword('');
signUpconfirmpassword('');
 }


    return ( <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
      
    }} >
         
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
                <TextField id="email" label="E-mail" variant="standard" value={email}  onChange={handelEmail}sx={{ m: 1, width: '25ch' }} />
                </div>
                <div>
                <TextField id="password" label="Password" type="password" variant="standard" value={password}  onChange={handelPassword} sx={{ m: 1, width: '25ch' }}/>
                </div>
                <div>
                <TextField id="confirmpassword" label="ConfirmPassword" type="password" value={confirmpassword} variant="standard"  onChange={handelConfirmPassword} sx={{ m: 1, width: '25ch' }}/>
                </div>
               
                <div>
                <Button type="submit" variant="outlined" sx={{ m: 1, width: '25ch' }} >SignUp </Button>
                </div>
              </Box>
            
        
    </div> );
}
 
export default SignUpUser;
import axios from 'axios' ;
export const signedUp=()=>{
    return{
        type:"Account_Created_User",
        data:"SUCCESFULL"
    }
}
export const signedUp_Error=()=>{
    return{
        type:"Account _Not_Created_User",
        data:"Not-SUCCESFULL"
    }
}
export const signedUp_Success=()=>{
    return{
        type:"Account _Success_Created_User",
        data:"Successful"
    }
}
export const logedIn=()=>{
    return{
        type:"Loged_In_User",
        data:"SUCCESFULL"
    }
}
export const logedInError=()=>{
    if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
      }
    return{
        type:"Loged_In_Error",
        data:"Not-SUCCESFULL"
    }
}
export const logedOut=()=>{
    if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
      }
    return{
        type:"Loged_Out",
        data:"SUCCESFULL-Logout"
    }
}

export const signUp_user =(data)=>{
return async function(dispatch){
    try{
  const res = await axios.post('http://localhost:7000/sign-up-user',data)
  if(res.status==200){
      dispatch(signedUp());
  }else{
    dispatch(signedUp_Error());
  }

}catch(e){
    dispatch(signedUp_Error());
}
}
}
export const login_user=(data)=>{
    console.log(data);
    return async function(dispatch){
        try{
      const res = await  axios.post('http://localhost:7000/login-user',data) ;
      console.log(res);
      if(res.status==200){
       // console.log()
        localStorage.setItem("user",res.data.data)
        
        dispatch(logedIn())
        }
        else{
            console.log(res);
            dispatch(logedInError())
        }
    }
    catch(e){
        console.log(e)
        dispatch(logedInError())
    }    
        
    }
}



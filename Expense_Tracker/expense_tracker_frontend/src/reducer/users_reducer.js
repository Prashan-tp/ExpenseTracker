const initState = {

    signUp: "" ,
    login: "" 
    
}
const User_Reducer = (state= initState , action ) =>{
    if(action.type ==="Account_Created_User"){
      console.log(action.data)
        return {
            signUp:action.data
        }
    }
    if(action.type ==="Account _Not_Created_User"){
        console.log(action.data)
          return {
              signUp:action.data
          }
      }
    if(action.type==="Loged_In_User"){
        console.log(action.data )
        console.log(state) 
        return{
            login:action.data
        }
    }

    if(action.type==="Loged_In_Error"){
        
        return{
            login:action.data
        }
    }
    if(action.type==="Loged_Out"){
        
        return{
            login:action.data
        }
    }
    
    if(action.type ==="Account _Success_Created_User"){
        console.log(action.data)
          return {
              signUp:action.data
          }
      }
  
   
    
    return state;
   
}
export default User_Reducer ;
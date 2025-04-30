const initState = {

   
    expenses:[],
    authorized:true,
   
    
}
const Record_Reducer = (state= initState , action ) =>{
    
   

    if(action.type ==="Show_Data"){
       
       return {
       
        expenses:action.data,
         authorized:true
       }
   }
   
   if(action.type ==="Authorized"){
   
    return {
     
     expenses:[],
     authorized:true
    }
    }

   if(action.type ==="UnAuthorized"){
   
   return {
    
    expenses:[],
    authorized:false
   }
   }

  
    
    return state;
   
}
export default Record_Reducer ;
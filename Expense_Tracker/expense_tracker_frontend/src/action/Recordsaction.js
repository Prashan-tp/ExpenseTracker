import axios from 'axios' ;


export const showData=(data)=>{
  
    return {
        type:"Show_Data",
        data:data
    }
}

export const UnAuthorized=()=>{
    
    return {
        type:"UnAuthorized",
        data:null
    }
}

export const Authorized=()=>{
    
    return {
        type:"Authorized",
        data:null
    }
}




export const expenseRecords = ()=>{
    return function (dispatch){
       
        axios.get('http://localhost:7000/expenses',{
            headers:{
     
                'Authorization' : 'Bearer'+' '+localStorage.getItem('user')
               }
        }
         
        ).then((res)=>{
          
            dispatch(showData(res.data.data))
        }).catch ((err) =>{
            console.log(err);
            console.log(err.response);
            if(err.response && err.response.status !== 404){
            dispatch(UnAuthorized())
            }
        });
    }
}

export const update_Expense=(data)=>{
    return function(dispatch){
        
   axios.post('http://localhost:7000/update-expense',data,{
       headers:{
        'Content_type':'multipart/form-data',
        'Authorization' : 'Bearer'+' '+localStorage.getItem('user')
       }
   }).then((res)=>{
   
    
   }).catch ((err) =>{
    if(err.response && err.response.status !== 404){
    dispatch(UnAuthorized())
    }
});
    }
}


export const del_Expense=(id)=>{
    return function(dispatch){
      
   axios.delete(`http://localhost:7000/del-expense/${id}`,{
    headers:{
     
     'Authorization' : 'Bearer'+' '+localStorage.getItem('user')
    }}
       ).then((res)=>{
        
    
   }).catch ((err) =>{
    if(err.response && err.response.status !== 404){
    dispatch(UnAuthorized())
    }
});
    }
}
export const add_Expense=(data)=>{
    return function(dispatch){
        console.log(data);
   axios.post('http://localhost:7000/add-expense',data,{
       headers:{
        'Content_type':'multipart/form-data',
        'Authorization' : 'Bearer'+' '+localStorage.getItem('user')
       }
   }).then((res)=>{
   
   
   }).catch ((err) =>{
    if(err.response && err.response.status !== 404){
    dispatch(UnAuthorized())
    }
});
    }
}
import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {add_Expense ,update_Expense } from '../action/Recordsaction';

const AddRecords = ({ idup,amountup, categoryup, descriptionup,onRefresh ,closeDialog}) => {
    
 const [amount,addAmount]=useState('');
 const [category,addCategory]=useState('');
 const [description,addDescription]=useState('');

 useEffect(() => {
    if (idup) {
      addAmount(amountup || '');
      addCategory(categoryup || '');
      addDescription(descriptionup || '');
    }
  }, [idup, amountup, categoryup, descriptionup]);


const dispatch = useDispatch();


const handelAmount=(e)=>{
    console.log(e.target.value);
    addAmount(e.target.value)
}
const handelCategory=(e)=>{
    console.log(e.target.value);
    addCategory(e.target.value)
}
const handelDescription=(e)=>{
    console.log(e.target.value);
    addDescription(e.target.value)
}

const handelSubmit=(e)=>{
  e.preventDefault();
    if (!amount ||!category || !description ||!amount.trim() || !category.trim() || !description.trim()) {

        window.alert('Fill Input Fields')
        
    }
    else{
  
    

 if(!idup ){

    const data ={
        amount:amount,
        category:category,
        description:description
 }
 console.log(data);
 dispatch(add_Expense(data));
   
 }
 else{
    const data ={
        id:idup,
        amount:amount,
        category:category,
        description:description
 }
 
    dispatch(update_Expense(data));  
 }

 addAmount('');
 addCategory('');
 addDescription('');
 
 if(onRefresh && closeDialog){
  
  onRefresh();
  closeDialog();
 }
 //window.location.reload(false);
}

}
    return ( 
        <div >
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
        <TextField id="amount" label="Amount" variant="standard" value={amount} onChange={handelAmount} sx={{ m: 1, width: '25ch' }}/>
        </div>
        <div>
        <TextField id="category" label="Category" variant="standard" value={category}  onChange={handelCategory} sx={{ m: 1, width: '25ch' }}/>
        </div>
        <div>
        <TextField id="description" label="Description" variant="standard" value={description} onChange={handelDescription}sx={{ m: 1, width: '25ch' }} />
        </div>
        <div>
        <Button type="submit" variant="outlined" sx={{ m: 1, width: '25ch' }} >{idup ? "Update-Expense" : "Add-Expense"} </Button>
        </div>
      </Box>
    
        
    </div> );
}
 
export default AddRecords;
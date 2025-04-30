import * as React from 'react';
import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle ,Box } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import CloseIcon from '@mui/icons-material/Close';


import AddRecords from "./addRecord";
import {expenseRecords,del_Expense} from '../action/Recordsaction';
import {useNavigate} from 'react-router-dom';

import {logedInError,logedOut}  from "../action/Useraction";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//...
const GetRecords =() => {
   

    const [showForm, setShowForm] = useState(false); 

    const [id,addId]=useState('');
    const [amount,addAmount]=useState('');
    const [category,addCategory]=useState('');
    const [description,addDescription]=useState('');
   
    

    const dispatch = useDispatch();
   
    const navigate = useNavigate();

    const expenses = useSelector((state) => state.record.expenses);
    const authenticate = useSelector((state) => state.record.authorized);
    console.log(expenses)
    
    const handleRefreshRecords = () => {
      
      dispatch(expenseRecords());
    };
  

    useEffect(() => {
     if(authenticate){
      dispatch(expenseRecords());
     }else{
      dispatch (logedInError())
      setTimeout(() => {
        navigate("/");
        },10);
     }
    }, [authenticate]); 
    
    const handleClose = () => {
      setShowForm(false); // Close the dialog
    };

    const dateformat=(datavalue)=>{
      var d = new Date(datavalue);
      var formattedDate = (d.getMonth() + 1).toString().padStart(2, '0') + '/' +
      d.getDate().toString().padStart(2, '0') + '/' +
      d.getFullYear();

return formattedDate;
    }
    // setExpenses (useSelector((state)=>state.record.expense))
  const handleClick = () => {
    addAmount('');
    addCategory('');
    addDescription('');
    addId('');
    setShowForm(!showForm); 
  };
const handleEdit = (row)=>{
  addAmount(row.amount);
  addCategory(row.category);
  addDescription(row.description);
  addId(row._id);
  setShowForm(true);
  console.log(row);
}
const handlelogout =()=>{
  dispatch (logedOut())
  setTimeout(() => {
    navigate("/");
    },10);
}
const handleDelete = (id)=>{

  dispatch(del_Expense(id));
  handleRefreshRecords();
  handleClose();
}
    
    const rows = expenses;
  return (<div>


<Button variant="contained" onClick={handleClick}>
        Add-Expense
</Button>
<Button variant="contained" onClick={handlelogout}>
        logedOut
</Button>

<Dialog open={showForm} onClose={handleClose} >
        <DialogTitle>Add Expense <CloseIcon onClick={handleClose} sx={{
      position: 'absolute',
      right: 8,
      top: 8,
      cursor: 'pointer',
      color: (theme) => theme.palette.grey[500],
    }} /></DialogTitle>
        <DialogContent>
          
          <AddRecords idup={id} amountup={amount} categoryup={category} descriptionup={description} onRefresh={handleRefreshRecords} closeDialog={handleClose}/>
        </DialogContent>
      
      </Dialog>

      <Box  display="flex" 
      flexDirection="row" 
      justifyContent="space-between" 
      alignItems="center">
      
    <TableContainer component={Paper}>
    <Table sx={{  minWidth: 600}} aria-label="simple table">
      <TableHead>
        <TableRow>
          
          <TableCell >ID </TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell align="right">Category</TableCell>
          <TableCell align="right">Description</TableCell>
          <TableCell align="right">Date</TableCell>
          <TableCell align="right">Edit</TableCell>
          <TableCell align="right">Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {(rows || []).map((row) =>{
         if (!row) return null;
        return (
          
          <TableRow
            key={row._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row._id}
            </TableCell>
            <TableCell align="right">{row.amount}</TableCell>
            <TableCell align="right">{row.category}</TableCell>
            <TableCell align="right">{row.description}</TableCell>
            <TableCell align="right">{dateformat (row.date)}</TableCell>
            <TableCell align="right"> <EditIcon onClick={() => handleEdit(row)}/></TableCell>
            <TableCell align="right"> <DeleteIcon onClick={() => handleDelete(row._id)}/> </TableCell>
          </TableRow>
)})}
      </TableBody>
    </Table>
  </TableContainer>

  <PieChart
       
      series={[
        {
          data:  (rows || []).map((row, index) => ({
            
            id: index, 
            value: row.amount, 
            label: row.category, 
          })),

          innerRadius: 30,
      outerRadius: 100,
      paddingAngle: 5,
      cornerRadius: 5,
      startAngle: -45,
      endAngle: 225,
      cx: 150,
      cy: 150,
        },
      ]}
      width={300}
      height={300}
    />
    
  </Box>
  </div>
  )
}
export default GetRecords;
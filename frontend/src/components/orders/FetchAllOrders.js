import React, { useEffect, useState,Fragment } from 'react'
import axios from 'axios'
import './del.css'
import './css.css'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const FetchAllOrders = ({add,addChange, getOrder}) => {
  const [deliverys, setOrders] = useState([])
  // const [searchText, setname] = useState("");
  const classes = useStyles();
  useEffect(() => {
    const getOrders = () => {
      axios
        .get('/api/orders/')
        .then((res) => {
          console.log(res)
          setOrders(res.data)
        })
        .catch((err) => {
          alert(err.message)
        })
    }
    getOrders()
  }, [])

 

  function deleteOrder(orderId){
    console.log(orderId);
    axios
    .delete('/api/orders/delete/'+orderId)
    .then((res) => {
      alert("Order deleted")
      console.log(res)
      //setOrders(res.data)
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  function editOrder(order){
    console.log(order);
    addChange(!add);
    getOrder(order);
  }

  function HandleChange(searchText){
    setOrders([]);
    if(searchText === ''){
      searchText = "*";
    }

    axios.get('/api/orders/search/'+ searchText).then((res)=> {
      console.log(searchText);
      console.log(res.data);
      
      if(res.data.length > 0){
        setOrders(res.data);
      }
      
  
    }).catch((error)=>{
      console.log(error);
    });
  }

  return (
    <Fragment>
        <Navbar />
    <div>
      <input type="text"  class="form-control" onChange={(event)=>{
        HandleChange(event.target.value);
      }}/>
      <h1>All Orders</h1><br></br><br></br>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
           
            <TableCell align="right"><b>Customer_Name</b></TableCell>
            <TableCell align="right"><b>Phone_Number</b></TableCell>
            <TableCell align="right"><b>E-mail</b></TableCell>
            <TableCell align="right"><b>Order_Items</b></TableCell>
            <TableCell align="right"><b>Quantity</b></TableCell>
            <TableCell align="right"><b>Order_Date</b></TableCell>
            <TableCell align="right"><b>Action</b></TableCell>   
            <TableCell align="right"></TableCell>       
          </TableRow>
        </TableHead>
        <TableBody>
          {deliverys.map((row) => (
            <TableRow key={row._id}>
              
              <TableCell align="right">{row.Cname}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.orderitems}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.orderdate}</TableCell>
              <TableCell align="right"> <Button variant="contained" color="primary" onClick={()=>editOrder(row)}>Edit</Button>
              </TableCell>
              <TableCell align="right"> <Button variant="contained" style={{color:"red"}} onClick={()=> deleteOrder(row._id)}>Delete</Button>
              </TableCell>             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    <Footer/>
</Fragment>
  )
}

export default FetchAllOrders

// <table class='table table-striped table-hover'>
// <thead>
//   <tr>
//     <th scope='col'>OID</th>
//     <th scope='col'>Customer_Name</th>
//     <th scope='col'>Phone_Number</th>
//     <th scope='col'>E-mail</th>
//     <th scope='col'>Order_Items</th>
//     <th scope='col'>Quantity</th>
//     <th scope='col'>Order_Date</th>
//     <th scope='col'>Action</th>
//   </tr>
// </thead>
// <tbody>
//   <td>Test Column</td>
//   {deliverys.length > 0 ? deliverys.map((item,index)=>{
//     <h1 style={{color: 'red'}}>{console.log('inside condition')}</h1>
//   }) : console.log('null')}

// </tbody>
// </table>

import {React, useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const Orders = (props) => {

  const [orders, setOrders] = useState([])
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  })();

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders(){
    axios
    .get('/api/orders/')
    .then((res) => {
      setOrders(res.data)
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  
  return (
    <div>
      <h1>Orders</h1>
      <TableContainer component={Paper}>
      <Table className={useStyles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
           
            <TableCell align="right"><b>Customer_Name</b></TableCell>
            <TableCell align="right"><b>Phone_Number</b></TableCell>
            <TableCell align="right"><b>E-mail</b></TableCell>
            <TableCell align="right"><b>Order_Items</b></TableCell>
            <TableCell align="right"><b>Quantity</b></TableCell>
            <TableCell align="right"><b>Order_Date</b></TableCell>
            <TableCell align="right"></TableCell>       
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow key={row._id}>
              
              <TableCell align="right">{row.Cname}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.orderitems}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.orderdate}</TableCell>             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

Orders.propTypes = {}

export default Orders

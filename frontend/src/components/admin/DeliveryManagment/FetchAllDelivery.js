import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './del.css'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const FetchAllDelivery = ({add,addChange, getDelivery}) => {
  const [orders, setDeliverys] = useState([])
  const classes = useStyles();
  useEffect(() => {
    const getDeliverys = () => {
      axios
        .get('/api/deliverys/')
        .then((res) => {
          console.log(res)
          setDeliverys(res.data)
        })
        .catch((err) => {
          alert(err.message)
        })
    }
    getDeliverys()
  }, [])

  console.log(orders.length);

  function deleteDelivery(deliveryId){
    console.log(deliveryId);
    axios
    .delete('/api/deliverys/delete/'+deliveryId)
    .then((res) => {
      alert("Delivery deleted")
      console.log(res)
      //setOrders(res.data)
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  function editDelivery(delivery){
    console.log(delivery);
    addChange(!add);
    getDelivery(delivery);
  }

  function HandleChange(searchText){
    setDeliverys([]);
    if(searchText === ''){
      searchText = "*";
    }

    axios.get('/api/deliverys/search/'+ searchText).then((res)=> {
      console.log(searchText);
      console.log(res.data);
      
      if(res.data.length > 0){
        setDeliverys(res.data);
      }
      
  
    }).catch((error)=>{
      console.log(error);
    });

  }

  function downloadDeliveryReport(){
    axios.get('/api/deliverys/report').then((res)=> {
    window.open("data:text/csv;charset=utf-8," + escape(res.data));
    }).catch((error)=>{
      console.log(error);
    });
  }



  return (
    <div>
      <div>
        <input type="text" className="form-control" onChange={(event)=>{
          HandleChange(event.target.value);
        }}></input>
      </div>
      
      <div className="row">
        <h1 className="col-md-6 col-lg-6">All Delivery</h1>
        <button id="btn-delivery-report" 
        className="col-md-6 col-lg-6 btn btn-sm btn-primary" onClick={downloadDeliveryReport}>
          Get Report</button>
      </div>
      
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell align="right">Destination</TableCell>
            <TableCell align="right">Payment_state</TableCell>
            <TableCell align="right">Delivery_type</TableCell>
            <TableCell align="right">Delivery_date</TableCell>
            <TableCell align="right">Deliver's_name</TableCell>
            <TableCell align="right">Delivery_state</TableCell>
            <TableCell align="right">Action</TableCell>   
            <TableCell align="right"></TableCell>       
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow key={row._id}>
              
              <TableCell align="right">{row.destination}</TableCell>
              <TableCell align="right">{row.pstate}</TableCell>
              <TableCell align="right">{row.dtype}</TableCell>
              <TableCell align="right">{row.ddate}</TableCell>
              <TableCell align="right">{row.dname}</TableCell>
              <TableCell align="right">{row.dstate}</TableCell>
              <TableCell align="right"> <Button variant="contained" color="primary" onClick={()=>editDelivery(row)}>Edit</Button>
              </TableCell>
              <TableCell align="right"> <Button variant="contained" style={{color:"red"}} onClick={()=> deleteDelivery(row._id)}>Delete</Button>
              </TableCell>             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
        
     
    
  

export default FetchAllDelivery

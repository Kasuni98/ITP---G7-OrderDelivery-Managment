import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Button, Row, Col } from 'react-bootstrap'
import AddDelivery from './AddDelivery'
import FetchAllDelivery from './FetchAllDelivery'

const DeliveryManagment = (props) => {
  const [add, showAdd] = useState(true)
  const [editDelivery, setEditDelivery] = useState({});
  const [isEdit, setIsEdit] = useState(false);


   
  function getDeliveryDetails(delivery){
    console.log(delivery);
    setEditDelivery(delivery);
    setIsEdit(true)
  }



  return (
    // <Router>
    <div>
      {/* <Header/> */}

      <Row className='align-items-center'>
        <Col className='text-right'>
          <Button className='my-3' onClick={() => showAdd(!add)}>
          <i className='fas fa-plus'></i> {isEdit ? 'Edit Delivery' : 'Add New Delivery'}
          </Button>
        </Col>
      </Row>

      {/* <Route path="admin/add" exact component={AddDelivery} /> */}
      {add ? <FetchAllDelivery add={add} addChange={showAdd} getDelivery={getDeliveryDetails}/> : <AddDelivery editDelivery={editDelivery} isEdit={isEdit} />}
    </div>
    // </Router>
  )
}

DeliveryManagment.propTypes = {}

export default DeliveryManagment
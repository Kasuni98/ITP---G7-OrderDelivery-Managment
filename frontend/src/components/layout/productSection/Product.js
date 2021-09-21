import React from 'react'
import TVimage from '../../../img/tv.jpg'

const Product = () => {
  return (
    <div class='col'>
      <div class='card'>
        <img src={TVimage} class='card-img-top' alt='...' />
        <div class='card-body'>
          <h5 class='card-title'>Rs 34,990.00</h5>
          <h6 class='card-title'>SAMSUNG HD LED TV 32" (UA32N4000AR)</h6>
          <p class='card-text'> SAMSUNG</p>
        </div>
      </div>
    </div>
  )
}

export default Product

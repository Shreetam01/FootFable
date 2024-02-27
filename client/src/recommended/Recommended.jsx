import React from 'react'
import"./Recommended.css"
import Ad from "./ad.png"

const Recommended = () => {
  return (
    <>
     <div className='ad-banner'>
      {/* <h2>Recommended</h2>
      <div className="recommended-btns">
        <button className='btn'>All Products</button>
        <button className='btn'>Nike</button>
        <button className='btn'>Adidas</button>
        <button className='btn'> Puma</button>
        <button className='btn'>Vans</button>
      </div> */}
      <img src={Ad} alt="" />
     </div>
    </>
  )
}

export default Recommended
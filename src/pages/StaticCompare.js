import React from 'react'
import { Link } from 'react-router-dom'
import DarkScooter from '../../src/pages/images/Ola S1/Ola S1/appscooter62d909eb8f2cb.webp'
import  ather from '../../src/pages/images/Ola S1/Ola S1/ather-450-space-grey.jpg'
import VS from '../../src/pages/images/gradient-versus-logo-template_23-2150342427.avif'
import './compare.css'

const StaticCompare1 = () => {
  return (
    <>
      <div className='mobile-section-headfing'>
               <span></span> <h3>Compare Electric Vehicles</h3><span></span>
             </div>
      <div className="StaticfirstOuter tanker">
      <div className="StaticOuter-compare-static">
      <div className="StaticMainouter">
        <div className="card-section-compares">
            <div className="compare-img-scooter">
               <img src={DarkScooter} alt="compare" />
               <div className="compare-title-main">
                <h6 className='price-vehicles'>OLA S1 PRO</h6>
                <p className="text-compare-scooter">Rs 147999</p>
               </div>     
            </div>
        </div>
        <div className="vs-image">
          <img src={VS} alt="" />
        </div>
        <div className="card-section-compares">
            <div className="compare-img-scooter">
               <img src={ather} alt="ather" />
               <div className="compare-title-main">
                <h6 className='price-vehicles'>ATHER 450x</h6>
                <p className="text-compare-scooter">Rs 137000</p>
               </div>     
            </div>
        </div>
      </div>
        <div className="compare-btn-static">
          <Link to={'/ComparisonMobile/64df4192973c270329b573d6/6487146af575a069b8a78916'} >Compare</Link>
        </div>
      </div>
      <div className="StaticOuter-compare-static">
      <div className="StaticMainouter">
        <div className="card-section-compares">
            <div className="compare-img-scooter">
               <img src={DarkScooter} alt="compare" />
               <div className="compare-title-main">
                <h6 className='price-vehicles'>KABIRA MOBILITY KM 4000</h6>
                <p className="text-compare-scooter">Rs 175000</p>
               </div>     
            </div>
        </div>
        <div className="vs-image">
          <img src={VS} alt="" />
        </div>
        <div className="card-section-compares">
            <div className="compare-img-scooter">
               <img src={ather} alt="ather" />
               <div className="compare-title-main">
                <h6 className='price-vehicles'>OBEN RORR</h6>
                <p className="text-compare-scooter">Rs 149999</p>
               </div>     
            </div>
        </div>
      </div>
        <div className="compare-btn-static">
          <Link to={'/ComparisonMobile/6489a6c9928842c260ca9f0e/64df6854b1c6c9e66472b702'} >Compare</Link>
        </div>
      </div>
      <div className="StaticOuter-compare-static">
      <div className="StaticMainouter">
        <div className="card-section-compares">
            <div className="compare-img-scooter">
               <img src={DarkScooter} alt="compare" />
               <div className="compare-title-main">
                <h6 className='price-vehicles'>Nexon EV Max</h6>
                <p className="text-compare-scooter">Rs 1649000</p>
               </div>     
            </div>
        </div>
        <div className="vs-image">
          <img src={VS} alt="" />
        </div>
        <div className="card-section-compares">
            <div className="compare-img-scooter">
               <img src={ather} alt="ather" />
               <div className="compare-title-main">
                <h6 className='price-vehicles'>Nexon EV Prime</h6>
                <p className="text-compare-scooter">Rs 1719000</p>
               </div>     
            </div>
        </div>
      </div>
        <div className="compare-btn-static">
          <Link to={'/ComparisonMobile/64a29d5d2b57898e07539141/64a6656c8ff2ed652ddf9b1f'} >Compare</Link>
        </div>
      </div>
      </div>
    </>
  )
}

export default StaticCompare1

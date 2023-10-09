import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './newsliderProduct.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import config from "../utils/config";


const FeaturedCarSection = ({handleclick}) => {
  const [cycleList, setCycleList] = useState({})
  let cycleType = cycleList.List

  const brandList=cycleType&&cycleType.map(data=>{
    return  data.Brand
  })
  localStorage.setItem("AllBrands", JSON.stringify(brandList))
    

  async function getCycleList() {
      let resultCycle = await axios.get(`${config.url}/product/list`, {
          headers: {
              "Accept": "application/json"
          }
      })
      let cycleData = await resultCycle.data
      setCycleList(cycleData)
  }

  useEffect(() => {
      getCycleList()
  }, [])

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    dot:false,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
         
        },
      },
    ],
  };

  return (
    <div>
      <div className="quick-look-card" id="quick-look-id">
      
        <div className='tanker'>
       
          
             <div className='slidercard'>
             <div className='mobile-section-headfing'>
               <span></span> <h3>Quick Look</h3><span></span>
             </div>
          <Slider {...settings}>
          
              {cycleType && cycleType.slice(5 ,20).map((data) => (
                <div className="quicklook-outer-card">
                <div class="Carcard" key={data._id}>
                  <img alt="cycle" src={`${config.url}/${data.productImage.length>0?data.productImage[0]:null}`}></img>
                  <div class="Cartitle">
                    <h5>{data.productName}</h5>
                    <p>Starting at Rs. {data.productPrice}</p>
                    {/* <p>{data.productName}</p> */}
                    <Link to={`/products/${data.productName}/${data.VehicleType}/${data._id}`}  class="view-offer-a">View-offer</Link>
                  </div>
                </div>
                </div>
              ))}
              
          </Slider>
          </div>
               
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarSection;
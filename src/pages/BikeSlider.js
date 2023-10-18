import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import config from "../utils/config";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Bike_slider = () => {
  $(document).ready(function () {
    $(".dealer-product-content").hover(
      function () {
        $(this).addClass("dealer-product-hoved");
      },
      function () {
        $(this).removeClass("dealer-product-hoved");
      }
    );
  });
  // ===============for hover

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    dot: false,
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
          slidesToShow: 2,
        },
      },
    ],
  };

  const [scooterList, setScooters] = useState();
  // console.log(priceList,'price')(scooterList, "ssss");

  const getScooters = async () => {
    let res = await axios.get(
      `${config.url}/product/multiFilter?VehicleType=bike`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let result = await res.data;
    setScooters(result?.searchedProduct);
  };

  useEffect(() => {
    getScooters();
  }, []);

  return (
    <div>
      <section className="product-slider-home">
      <div className="tanker">
        <div class="mobile-section-headfing">
          <span></span> <h3>Electric Bikes</h3>
          <span></span>
        </div>
        </div>
        <div className="tanker">
          <div className="home-slider-product">
            <Slider {...settings}>
              {scooterList &&
                scooterList.slice(5, 20).map((data) => (
                  <div className="dealer-product-content">
                    
                    <div class="dealer-product-content-boorder-div">
                      <div class="selaer-firt-secand-img">
                      <Link className="flotng-link-pro"
                      to={`/products/${data.productName}/Ev-scooters/${data._id}`}
                    ></Link>
                        <img
                          class="delaer-pr-first-img"
                          alt="vendor"
                          src={`${config.url}/${
                            data.productImage.length > 0
                              ? data.productImage[0]
                              : null
                          }`}
                        ></img>
                        <img
                          class="delaer-pr-secnd-img"
                          src={`${config.url}/${
                            data.productImage.length > 0
                              ? data.productImage[0]
                              : null
                          }`}
                        ></img>
                      </div>
                      <div class="dealer-product-text">
                        <h5>{data.productName}</h5>
                        <p>Starting at Rs. {data.productPrice}</p>
                        <div class="deler-product-btn">
                          <Link
                            class="deler-product-testdrive"
                            to={`/book-your-test-drive/${
                              data && data.productName
                            }/${data && data.VehicleType}/${
                              data && data.Brand
                            }/${data && data.city}`}
                          >
                            Book Test Drive
                          </Link>
                          <Link
                            class="view-offer-a"
                            to={`/buy-electric-vehicle/${
                              data && data.productName
                            }/${data && data.productPrice}/${
                              data && data.VehicleType
                            }/${data && data.Brand}/${data && data.city}`}
                          >
                            Buy Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bike_slider;

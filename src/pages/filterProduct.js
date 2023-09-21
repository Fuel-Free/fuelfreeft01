import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dealerpagedetail.css";
import { Link, useParams } from "react-router-dom";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import dealerimgbanner from "../pages/images/dealersimgbanner.jpeg";
import config from "../utils/config";

const FilterProduct  = () => {
  const getProduct=localStorage.getItem('NewVehicleByBudget')?(JSON.parse(localStorage.getItem('NewVehicleByBudget'))):""

  return (
    <>
      <Header />
      <div className="tanker">
      <div class="mobile-section-headfing   filterev ">
          <span></span>
          <h3 >Electric Vehicles</h3>
          <span></span>
        </div>
        <div className="tanker">
          <section id="product-cotegory-outer-ot">
            <div id="OUR-CARS">
              <div className="tanker">
                <div className="OUR-CARS-outer">
                  {" "}
                  {getProduct ? (
                    <>
                      {getProduct &&
                        getProduct.map((data) => (
                          <div class="Carcard" key={data._id}>
                            <img
                              alt="cycle"
                              src={`${config.url}/${
                                data.productImage.length > 0
                                  ? data.productImage[0]
                                  : null
                              }`}
                            ></img>
                            <div class="Cartitle">
                              <h5>{data.productName}</h5>
                              <p>Starting at Rs. {data.productPrice}</p>
                              <Link
                                to={`/products/${data.productName}/${data.VehicleType}/${data._id}`}
                                class="view-offer-a"
                              >
                                View-offer
                              </Link>
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FilterProduct ;

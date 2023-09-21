import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dealerpagedetail.css";
import { Link, useParams } from "react-router-dom";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import dealerimgbanner from "../pages/images/dealersimgbanner.jpeg";
import config from "../utils/config";

const TataBrand = () => {
  const { search } = useParams();
  const [loading, setloading] = useState(false);
  const [productList, setProduct] = useState("");
  const [chargingList, setcharging] = useState("");
  const [dealerList, setdealers] = useState("");
  const [newsList, setnewslist] = useState("");
  const [offerList, setOfferList] = useState("");
  const [usedVehicle, setVehicle] = useState("");
  const searchresult = async () => {
    setloading(true);
    let res = await axios.get(
      `${config.url}/search/search?query=${search}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let result = await res.data;
    let DATA = await result.Data;
    setloading(false);
    setProduct(DATA?.products);
    setcharging(DATA?.charging);
    setdealers(DATA?.agency);
    setnewslist(DATA?.news);
    setOfferList(DATA?.offers);
    setVehicle(DATA?.usedVehicle);
  };

  useEffect(() => {
    searchresult();
  }, [search]);

  return (
    <>
      <Header />
      {/* ---------------------------------our cycles------------------------------- */}
      <div className="tanker">
        <div class="mobile-section-headfing">
          <span></span>
          <h3>Result related to {search}</h3>
          <span></span>
        </div>
        {loading ? (
                  <h4>loading wait.......</h4>
                ) : (
        <div className="tanker">
          <section id="product-cotegory-outer-ot">
            <div id="OUR-CARS">
              <div className="tanker">
             {productList.length===null?'':<h3>Electric Vehicles</h3>}   
                <div className="OUR-CARS-outer">
                  {" "}
                  {productList ? (
                    <>
                      {productList &&
                        productList.map((data) => (
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
                {chargingList.length===null?'':<h3>ChargingStations:</h3>}
                
                <div className="tanker" id="charging-station-all">
                  <>
                    {chargingList &&
                      chargingList.map((data) => (
                        <div class="Carcard-charge" key={data._id}>
                          <div class="Cartitle-charge">
                            <h5>{data.name}</h5>
                            <p>
                              Opening/Closing(Time): {data.openingTime}/
                              {data.closingTime}
                            </p>
                            <Link
                              target="_blank"
                              to={data.googleMapURL}
                              className="google-find"
                              onClick={data.googleMapURL}
                            >
                              Location
                            </Link>
                          </div>
                        </div>
                      ))}
                  </>
                </div>
                {dealerList.length===null?'':<h3>DealerList:</h3>}
                <div className="tanker" id="charging-station-all">
                  {dealerList &&
                    dealerList.map((data) => (
                      <div class="Carcard" key={data._id}>
                        <img
                          alt="vendor-img"
                          className="dealer-img"
                          src={dealerimgbanner}
                        />

                        <div class="Cartitle">
                          <h5>{data.firmName}</h5>
                          <p style={{ color: "#262681" }}>{data.whatsappNo}</p>
                          <Link
                            className="google-color"
                            target="_blank"
                            to={data.googleMapURL}
                          >
                            Find on Google Map
                          </Link>
                          <Link
                            to={`/dealer-store-page/${data._id}`}
                            class="view-offer-a"
                          >
                            Visit Store
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
                {newsList.length===null?'':<h3>News:</h3>}
                <div className="OUR-CARS-outer">
                  {" "}
                  {newsList ? (
                    <>
                      {newsList &&
                        newsList.map((data) => (
                          <div class="Carcard" key={data._id}>
                            <img
                              alt="cycle"
                              src={`${config.url}/${data.image}`}
                            ></img>
                            <div class="Cartitle">
                              <h5>{data.MainHeading}</h5>

                              <Link
                                to={`/news-details/${data._id}`}
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

                {offerList.length===null?'':<h3>offers:</h3>}
                <div className="OUR-CARS-outer">
                  {" "}
                  {offerList ? (
                    <>
                      {offerList &&
                        offerList.map((data) => (
                          <div class="Carcard" key={data._id}>
                            <img
                              alt="cycle"
                              src={`${config.url}/${data.offerImage}`}
                            ></img>
                            <div class="Cartitle">
                              <h5>{data.offerHeading}</h5>
                              <h5>{data.offerText}</h5>
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    ""
                  )}
                </div>

                {usedVehicle.length===null?'':<h3>Used Vehicle:</h3>}
                <div className="OUR-CARS-outer">
                  {" "}
                  {usedVehicle ? (
                    <>
                      {usedVehicle &&
                        usedVehicle.map((data) => (
                          <div class="Carcard" key={data._id}>
                            <img
                              alt="cycle"
                              src={`${config.url}/${data.Image}`}
                            ></img>
                            <div class="Cartitle">
                              <h3>{data.vehicleName}</h3>
                              <p>Bid Amount : Minimum Bid ₹{data.minimumBid}</p>
                              <Link
                                to={`/used-vehicle-details/${data._id}`}
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
        )}
      </div>
      <Footer />
    </>
  );
};

export default TataBrand;

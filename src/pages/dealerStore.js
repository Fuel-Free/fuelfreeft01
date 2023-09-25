import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./storepage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./electricCarBrand.css";
import { useRef } from "react";
import Modal from "react-modal";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { FaBicycle } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { MdElectricRickshaw } from "react-icons/md";
import deal from "../images/deal.png";
import dealsleft from "../images/deals-left image.png";
// import blood_stroke from "./images/blood stroke 3.png";
import de from "./images/de.png";

const DealerStore = () => {
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

  const Navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  let userdata = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  let userId = userdata ? userdata._id : "";
  const visitCount = async () => {
    const pageVisited = window.location.href;
    let res = await axios.post(
      `https://app.fuelfree.in/user/track-page/${userId}?source=${encodeURIComponent(
        pageVisited
      )}`,
      {
        headers: {
          Accept: "aaplication/json",
        },
      }
    );
    let result = await res.data;
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      visitCount();
    }
  }, []);

  const gologin = () => {
    if (!localStorage.getItem("user")) {
      Navigate("/login");
      window.location.reload();
    }
  };
  $(document).ready(function () {
    $(".prodiuct-specifiacaton-title").click(function () {
      $(this).parent("div").isToggled("opn-product-content");
    });
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // main product
  const { id } = useParams();
  const [productDetails, setDetails] = useState("");
  let data1 = productDetails.vendorDetails;
  function extractCoordinatesFromGoogleMapsURL(url) {
    const params = new URLSearchParams(new URL(url?url:'https://www.google.com/maps/search/?api=1&query=22.7226274,75.8866805').search);
    const query = params.get("query");
    if (!query) {
      return null; // Invalid URL
    }
    const [latitude, longitude] = query.split(",").map(parseFloat);
    if (isNaN(latitude) || isNaN(longitude)) {
      return null; // Invalid coordinates in URL
    }
    return { latitude, longitude };
  }

  let url = data1?.googleMapURL;
  const coordinates = extractCoordinatesFromGoogleMapsURL(url);
  console.log(coordinates, "ddd");
  const apiKey = "AIzaSyA_2eybqcLSYvWm2bn4PIoi_wYCEnjYlkQ"; // Replace with your API key

  const iframeSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${coordinates?.latitude},${coordinates?.longitude}&zoom=17`;
  async function getProductdetails() {
    let resultDetails = await axios.get(
      `https://app.fuelfree.in/vendor/agency/details/${id}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let data = await resultDetails.data;
    // (data)
    setDetails(data);
  }

  useEffect(() => {
    getProductdetails();
  }, []);

  const [vendorList, setvendorList] = useState({});
  let vendorType = vendorList.List;
  async function getvendorList() {
    let resultCycle = await axios.get(
      `https://app.fuelfree.in/vendor/myproduct/${id}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let vendorData = await resultCycle.data;
    setvendorList(vendorData);
  }

  useEffect(() => {
    getvendorList();
  }, []);

  const sectionRef = useRef(null);
  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const seRef = useRef(null);
  const scrollToSec = () => {
    seRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const secRef = useRef(null);
  const scrollToS = () => {
    secRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scRef = useRef(null);

  const scrollTo = () => {
    scRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="dealer-store-id">
      <section id="dealer-header">
        <div className="tanker">
          <div className="dealer-header-outer">
            <div className="dealer-header-logo">
              {data1 && data1.firmName}
              <div class="back-to-home">
                <a href="/">
                  <BsFillArrowLeftSquareFill />
                  back to home page
                </a>
              </div>
            </div>

            <div className="dealer-header-link">
              <Link to="" className="map" onClick={scrollToSection}>
                Store Details
              </Link>
              <Link className="map" onClick={scrollToSec}>
                About
              </Link>
              <Link className="map" onClick={scrollToS}>
                Brands
              </Link>
              <Link className="map" onClick={scrollTo}>
                Vehicles
              </Link>
            </div>
            <div className="dealer-header-contact">
              <Link className="contact-store" onClick={openModal}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="dealer-banner">
        <div className="dealer-banner-outer">
          <div className="dealer-banner-text">
            <span>Get up to 50% off Today Only!</span>
            <h2>A brand new way to buy new electric vehicle</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad,{" "}
            </p>
            <a href="">See products</a>
          </div>
          <div className="dealer-banner_img">
          <img className="deler-banner-vehicle" src={de}></img>
            {/* <img src={blood_stroke}></img> */}
          </div>
        </div>
      </section>
      <section id="dealer-map-idd">
        <div class="tanker">
          <iframe
            src={iframeSrc}
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
      
      <div className="mobile" ref={secRef}></div>
 
      <div className="vehicles-you-found" ref={scRef}>
        <div className="tanker">
          <div className="dealer-section-title">
            <h2>
              {" "}
              <b>EXPLORE</b> PRODUCTS  OF {data1 && data1.Brand}
            </h2>
          </div>
        </div>

        <div className="tanker">
          {vendorType ? (
            <div className="dealer-product-list">
              {vendorType &&
                vendorType.map((data) => (
                  <div class="dealer-product-content" key={data._id}>
                    <Link
                      to={`/products/${data.productName}/${data.VehicleType}/${data._id}`}
                    >
                      <div className="dealer-product-content-boorder-div">
                        <div class="selaer-firt-secand-img">
                          <img
                            className="delaer-pr-first-img"
                            alt="vendor"
                            src={`https://app.fuelfree.in/${data.productImage.length>0?data.productImage[0]:null}`}
                          ></img>
                          <img
                            className="delaer-pr-secnd-img"
                            src={`https://app.fuelfree.in/${data.productImage.length>0?data.productImage[0]:null}`}
                          ></img>
                        </div>
                        <div class="dealer-product-text">
                          <h5>{data.productName}</h5>
                          <p>Starting at Rs. {data.productPrice}</p>
                          <p>{data.productName}</p>

                          <div className="deler-product-btn">
                            <Link
                              to={`/book-your-test-drive/${
                                data && data.productName
                              }/${data && data.VehicleType}/${
                                data && data.Brand
                              }/${data && data.city}`}
                              className="deler-product-testdrive"
                            >
                              Book Test Drive
                            </Link>
                            <Link
                              className="view-offer-a"
                              to={`/buy-electric-vehicle/${
                                data && data.productName
                              }/${data && data.productPrice}/${
                                data && data.VehicleType
                              }/${data && data.Brand}/${data && data.city}`}
                              onClick={gologin}
                            >
                              Buy Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          ) : (
            <div className="no-product">No Products Available</div>
          )}
        </div>
      </div>


      <section id="deales-OF-DAY">
        <div className="tanker">

        <div className="dealer-section-title">
            <h2>
              {" "}
              <b>DEAL OF</b> DAY
            </h2>
          </div>
       <div className="deales-OF-DAY-outer">
        <div className="deales-OF-DAY-content">
        <Link to=""></Link>
          <div class="deales-OF-DAY-image">
            <img src={deal}/>
            <img className="deales-left-img" src={dealsleft}/>
            
            <div className="Deals-text">
              <p>Starting at <span>$79.9</span></p>
              <h3>MOST<span>ESSENTIALS</span></h3>
              <h5>SHOP AND SAVE BIG</h5>
              <span className="dels-shop">Show more</span>
            </div>
          </div>
          







        </div>

        <div className="deales-OF-DAY-content">
          <Link to=""></Link>
          <div class="deales-OF-DAY-image">
            <img src={deal}/>
            <img className="deales-left-img" src={dealsleft}/>
            
            <div className="Deals-text">
              <p>Starting at <span>$79.9</span></p>
              <h3>MOST &nbsp; <span>ESSENTIALS</span></h3>
              <h5>SHOP AND SAVE BIG</h5>
              <span className="dels-shop">Show more</span>
            </div>
          </div>
        </div>




        

       </div>
        </div>
      </section>

      <section id="about-delaler">
        <div className="tanker">
          <h6>Nam provident sequi</h6>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam
            provident sequi, nemo sapiente culpa nostrum rem eum perferendis
            quibusdam, magnam a vitae corporis! Magnam enim modi, illo harum
            suscipit tempore aut dolore doloribus deserunt voluptatum illum, est
            porro? Ducimus dolore accusamus impedit ipsum maiores, ea iusto
            temporibus numquam eaque mollitia fugiat laborum dolor tempora
            eligendi voluptatem quis necessitatibus nam ab?
          </p>
          <div className="store-image-outer" ref={seRef}>
            <div className="mobile-view-home">
              <img
                className="img-outer-side"
                src="https://images.hindustantimes.com/auto/img/2022/02/07/600x338/BLive_store_1644236388477_1644236397711.jpg"
                alt="fuelfree"
              ></img>
            </div>
            <div class="deler-about-right">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                nisi tempora quibusdam libero possimus magni impedit a, facere
                recusandae eos ut at quod sed praesentium!
              </p>
              {/* ========================== */}
              <div className="about-dealer-graph">
                <h3>Integrative control </h3>
                <div className="about-dealer-graph-content">
                  <p>58%</p>
                  <span
                    style={{ width: "58%", backgroundColor: "lightblue" }}
                  ></span>
                </div>
              </div>
              {/* ============================= */}

              {/* ========================== */}
              <div className="about-dealer-graph">
                <h3>Integrative control </h3>
                <div className="about-dealer-graph-content">
                  <p>30%</p>
                  <span style={{ width: "30%" }}></span>
                </div>
              </div>
              {/* ============================= */}

              {/* ========================== */}
              <div className="about-dealer-graph">
                <h3>Costumer support </h3>
                <div className="about-dealer-graph-content">
                  <p>80%</p>
                  <span
                    style={{ width: "80%", backgroundColor: "#5cf047" }}
                  ></span>
                </div>
              </div>
              {/* ============================= */}
            </div>
          </div>
        </div>
      </section>




<section id="deler-store-gallary">
  <div className="tanker">
  <div className="dealer-section-title">
            <h2>
              {" "}
              <b>OUR</b> PHOTOS
            </h2>
          </div>
    <div className="deler-store-gallary">
      <div className="store-gallary"><img src="https://lh3.googleusercontent.com/p/AF1QipNmku16FxaQHhN4p_NOh0sbPw53TpQa2gpG3ggV=w768-h768-n-o-v1"></img></div>


      <div className="store-gallary"><img src="https://lh3.googleusercontent.com/p/AF1QipNmku16FxaQHhN4p_NOh0sbPw53TpQa2gpG3ggV=w768-h768-n-o-v1"></img></div>


      <div className="store-gallary"><img src="https://lh3.googleusercontent.com/p/AF1QipNmku16FxaQHhN4p_NOh0sbPw53TpQa2gpG3ggV=w768-h768-n-o-v1"></img></div>

      <div className="store-gallary"><img src="https://lh3.googleusercontent.com/p/AF1QipNmku16FxaQHhN4p_NOh0sbPw53TpQa2gpG3ggV=w768-h768-n-o-v1"></img></div>

      <div className="store-gallary"><img src="https://lh3.googleusercontent.com/p/AF1QipNmku16FxaQHhN4p_NOh0sbPw53TpQa2gpG3ggV=w768-h768-n-o-v1"></img></div>

      <div className="store-gallary"><img src="https://lh3.googleusercontent.com/p/AF1QipNmku16FxaQHhN4p_NOh0sbPw53TpQa2gpG3ggV=w768-h768-n-o-v1"></img></div>

      <div className="store-gallary"><img src="https://lh3.googleusercontent.com/p/AF1QipNmku16FxaQHhN4p_NOh0sbPw53TpQa2gpG3ggV=w768-h768-n-o-v1"></img></div>

      <div className="store-gallary"><img src="https://lh3.googleusercontent.com/p/AF1QipNmku16FxaQHhN4p_NOh0sbPw53TpQa2gpG3ggV=w768-h768-n-o-v1"></img></div>
      
       
    </div>
  </div>
</section>






      <section id="deler-ffoter">
        <div className="tanker">
          <div className="deler-ffoter-outr">
            <div className="deler-ffoter-content">
              <div className="deler-fotre-in">
                <h2>{data1 && data1.name}</h2>
                </div>
            </div>

            <div className="deler-ffoter-content">
            <div className="deler-fotre-in">
              <h3>Important link</h3>
              <ul>
                <li>
                  <Link  onClick={scrollToSec}>
                About
              </Link>
                </li>
                <li>
                <Link  onClick={scrollToS}>
                Brands
              </Link>
                </li>
                <li>
                <Link  onClick={scrollTo}>
                Vehicles
              </Link>
                </li>
              </ul>
              </div>
            </div>

            <div className="deler-ffoter-content">
            <div className="deler-fotre-in">
              <h3>Contact us</h3>
              <ul>
                <div class="mob-main">
                  <div class="mob-icon">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 16 16"
                      class="mob-fill"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                      ></path>
                    </svg>
                  </div>
                  <div class="mob-text">
                    <li class="mob-number-text">
                      <a href="tel:7880088944"> {data1 && data1.alternatePhoneNo}</a>
                    </li>
                    <li class="mob-number-text">
                      <a href="tel:7880088955">{data1 && data1.whatsappNo}</a>
                    </li>
                  </div>
                </div>
                <li>
                  <a href="mailto:info@fuelfree.in">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      class="mail-to"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path>
                    </svg>
                    {data1 && data1.email}
                  </a>
                </li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden-vender-details" ref={sectionRef}>
        <h3 className="vendor-details">Vendor Details</h3>
        <table class="table table-bordered">
          <tbody>
            <tr>
              <td sty>Vendor Name</td>
              <td>{data1 && data1.name}</td>
            </tr>
            
            <tr>
              <td>Brand</td>
              <td>{data1 && data1.Brand}</td>
            </tr>
            <tr>
              <td>Vehicle Deals</td>
              <td>{data1 && data1.vehicleDeals}</td>
            </tr>
            <tr>
              <td>Whatsapp No. / Alternate No.</td>
              <td>
                
              </td>
            </tr>
            <tr>
              <td>Opening Time / Closing Time</td>
              <td>
                {data1 && data1.openingTime} / {data1 && data1.closingTime}
              </td>
            </tr>
            <tr>
              <td>About the Store</td>
              <td>{data1 && data1.aboutTheStore}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{data1 && data1.address}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{data1 && data1.city}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div className="dealer-bg">
          <h3>Whatsapp No. / Alternate No.</h3>
          <p>
            {data1 && data1.whatsappNo}
          </p>
          <h3>Email</h3>
          <p>{data1 && data1.email}</p>
          <button className="close-btn-popup" onClick={closeModal}>
            close
          </button>
        </div>
      </Modal>

      {/* <Footer /> */}
    </div>
  );
};

export default DealerStore;

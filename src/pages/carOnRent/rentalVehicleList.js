import axios from "axios";
import {BiRupee} from "react-icons/bi";
import { Link ,useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import rentalVehicleBanner from "../../pages/images/rentalVehicleBanner.jpg";

const RentalVehicleList = () => {
  const navigate=useNavigate()
  const [rentalVehicle, setRentalVehicle] = useState({});
  let rentalVehicleList = rentalVehicle.list;
  async function getRentalVehicleList() {
    let resultRentalVehicle = await axios.get(
      "https://app.fuelfree.in/carRental/list",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let rentalVehicleData = await resultRentalVehicle.data;
    setRentalVehicle(rentalVehicleData);
  }


  const gotologin = () => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }  
  }

  useEffect(() => {
    getRentalVehicleList();
    
  }, []);



  return (
    <>
      <Header />
      <Helmet>
      <link rel="canonical" href="https://www.fuelfree.in/electric-rental-vehicles" />
      <meta
          name="description"
          content="this is a webite for Electric Scooter where we you can see all Electric Scooter"
          
        />
        <meta property="og:title" content="All ev solutions" />
        <meta property="og:description" content="lets make go green" />
        <meta
          property="og:image"
          content="https://app.fuelfree.in//uploads/image_1684908621969.Gen-3-Ather-450X-Electric-Scooter-Featured-removebg-preview.png"
        ></meta>
      </Helmet>
      <ToastContainer />
      <section id="collection-id">
        <img src={rentalVehicleBanner} alt="bycycle" />
      </section>
      {/* ---------------------------------our cars------------------------------- */}
      <div id="OUR-CARS">
                <div class="mobile-section-headfing">
                    <span></span>
                    <h3>Rental Vehicle</h3>
                    <span></span></div>
                <div className="tanker">

                    <div className="OUR-CARS-outer">
                        {rentalVehicleList && rentalVehicleList.map((data) => (
                            <div class="Carcard" key={data._id}>
                                <img alt={`${data.productName} image`} src={`https://app.fuelfree.in/${data.productImage}`} />
                               
                                <div class="Cartitle">
                                    <h5>{data.productName}</h5>
                                    <h4 style={{color: "#262681"}}><BiRupee/>{data.vehiclePricePerHour}/h</h4>
                                    <p style={{color: "#000"}}>{data.Brand} | {data.topSpeed}km/h | {data.seatingCapacity}Seats</p>
                                    <Link to={`/rent-vehicle-booking/${data._id}/${data.productName}/${data.vehiclePricePerHour}`} onClick={()=>gotologin(data)} class="view-offer-a">Book Now</Link>
                                    <Link to='/digital-kyc-rental-vehicle'  class="view-offer-a">Digital KYC</Link>
                                    <Link to={`/rental-vehicle-details/${data._id}`} onClick={gotologin} class="view-offer-a">See details</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
      <Footer />
    </>
  );
};

export default RentalVehicleList;

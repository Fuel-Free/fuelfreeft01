import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import ather from "./images/ather.jpg";
import erisha from "./images/erisha.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Landing_page = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Number: "",
    Address: "",
  });

  const [phoneError, setPhoneError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number format, change as needed

    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError('Please enter a valid phone number.');
      return false;
    }

    setPhoneError('');
    return true;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validatePhoneNumber(formData.Number)) {
        const res=await axios.post(`https://app.fuelfree.in/user/giveaway`,formData,{
            headers:{
                "Accept":"application/json"
            }
        })
        let result=await res.data
        if(result.success==='success'){
            toast.success('done')
        }
      }
  };

  return (
    <div>
      <Header />
      <ToastContainer />

      <section id="landing-page-id">
        <div class="background-top">
          <img className="landing-first-img" src={ather} />
          <img className="landing-secand-img" src={erisha}></img>
          <h1 className="five-off">5000₹ OFF</h1>

          <img
            className="landing-banner"
            src="https://png.pngtree.com/thumb_back/fw800/background/20190819/pngtree-diwali-red-background-image_300386.jpg"
          ></img>
          <div className="left-top-landing-page">
            <h1>Unveiling Exclusive Diwali Discounts!</h1>
            <p>
              Light up your celebrations with our incredible Diwali offers! This
              festive season, immerse yourself in joy and savings with our
              fantastic discounts. Avail yourself of the best deals and make
              your Diwali brighter!
            </p>
          </div>
        </div>

        <div className="tanker">
          <div className="landing-page-outer">
            <div className="left-text-landing-page">
              <h3>Exciting news!</h3>{" "}
              <p>
                {" "}
                A fantastic giveaway for a chance to <span>
                  get ₹5000!
                </span>{" "}
                Don't miss out on this incredible opportunity. Join me in
                participating and cross your fingers for that big win!
              </p>
            </div>
          
          <div className="right-text-landing-page">
            <form onSubmit={handleSubmit}>
              <label htmlFor="Name">Name:</label>
              <input
                type="text"
                id="Name"
                name="Name"
                placeholder="Name"
                value={formData.Name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="Number">Phone Number:</label>
              <input
                type="tel"
                id="Number"
                name="Number"
                placeholder="Phone Number"
                value={formData.Number}
                onChange={handleInputChange}
                required
              />
              {phoneError && <p className="error-message">{phoneError}</p>}
              <label htmlFor="Address">Address:</label>
              <textarea
                id="Address"
                name="Address"
                placeholder="Address"
                value={formData.Address}
                onChange={handleInputChange}
                required
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing_page;

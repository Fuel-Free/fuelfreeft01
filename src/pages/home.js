import "./style.css";
import axios from "axios";
import "firebase/firestore";
import "./Becomeadealer.css";
import { Helmet } from "react-helmet";
import Mobileview from "./mobileview";
import NewsLetter from "./NewsLetterEV";
import UsedVehicle from "./UsedVehicle";
import Whatpowerus from "./whatpowerus";
import Header from "../components/header";
import Footer from "../components/footer";
import WhyChooseUs from "./why-choose-us";
import Slider1 from "../components/Slider";
import { BsCarFrontFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import ElectricCarBrand from "./electricCarBrand";
import FeaturedCarSection from "./NewsliderProduct"; 
import { FaUniversalAccess, FaMoneyCheckAlt } from "react-icons/fa";
import config from "../utils/config";
import StaticCompare1 from "./StaticCompare";
import Faq_fuelfree from "./faq_accordian";
import Product_slider from "./product_slider";
import Bike_slider from "./BikeSlider";
import Call_back from "./call_back";

const Home = ({ handleclick }) => {
  const [visitorCount, setVisitorCount] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Retrieve the count from localStorage
    const count = parseInt(localStorage.getItem("visitorcount")) || 0;
    setVisitorCount(count);

    // Increment the count and update localStorage
    const newCount = count + 1;
    localStorage.setItem("visitorcount", newCount.toString());
  }, []);

  const [limitedProduct, setlimitedProduct] = useState([]);
  let LimitedPRO = limitedProduct.List;

  const getProductList = async () => {
    let result = await axios.get(`${config.url}/product/list`, {
      headers: {
        Accept: "application/json",
      },
    });
    let data = await result.data;
    setlimitedProduct(data);
  };

  useEffect(() => {
    getProductList();
  }, []);





  return (
    <div>
      <Header />
      <Helmet>
  <title>FuelFree - All EV Solutions</title>
  <meta
    name="description"
    content="Discover all the latest electric vehicle (EV) solutions and join the green revolution."
  />
  <meta property="og:title" content="FuelFree - All EV Solutions" />
  <meta
    property="og:description"
    content="Discover all the latest electric vehicle (EV) solutions and join the green revolution."
  />
  <meta property="og:image" content="https://fuelfree.in/static/media/scootymainlogoslider.c841c648442ab758c459.jpeg" />
</Helmet>

      <div id="banner-slider-home">
        <Slider1 />
      </div>
      <div className="desktop-view">
        <ElectricCarBrand />
        <FeaturedCarSection handleclick={handleclick} />
        <StaticCompare1/>
        <Product_slider/>
        <Bike_slider/>
        <Call_back/>
        <UsedVehicle />
        <Faq_fuelfree/>
        <NewsLetter />
        <Whatpowerus />
      </div>
      <Mobileview />
      <Footer />
    </div>
  );
};

export default Home;

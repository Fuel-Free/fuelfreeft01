import React, { useState } from "react";
import "../pages/filterformnew.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LeadModal from "./LeadModal";

function Filterformnew() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gotprices,setprices]=useState('')
  const [priceList,setPriceList]=useState('')
  // // console.log(priceList,'price')(priceList,'price')
  const vehicleTypes = async (vehicleType) => {
    setprices(vehicleType);
    let res = await axios.get(
      `https://app.fuelfree.in/product/multiFilter?VehicleType=${vehicleType}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let result = await res.data;
    let data = await result.searchedProduct;
    setPriceList(data);
  };

  const [Brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const uniqueBrandSet = new Set(
    Brand && Brand.map((data) => data.Brand.toLowerCase().toUpperCase())
  );
  const uniqueBrandList = Array.from(uniqueBrandSet);

  const setPrices = async (price) => {
    setPrice(price);
    let res = await axios.get(
      `https://app.fuelfree.in/product/multiFilter?VehicleType=${gotprices}&priceValue=${price}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let result = await res.data;
    let data = await result.searchedProduct;
    setBrand(data);
  };

  const [finalProduct1, setfinalProduct] = useState("");
  const getFinal1Data = async (brand) => {
    let res = await axios.get(
      `https://app.fuelfree.in/product/multiFilter?priceValue=${price}&VehicleType=${gotprices}&Brand=${brand}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let result = await res.data;

    let data = await result.searchedProduct;
    if (result.success === "success") {
      setfinalProduct(data);
    }
    localStorage.setItem("NewVehicleByBudget", JSON.stringify(data));
  };

const BrandListFromLocalSet = new Set();
let BrandListFromLocal = localStorage.getItem("AllBrands");
if (BrandListFromLocal !== null) {
  try {
    const parsedBrandList = JSON.parse(BrandListFromLocal);
    if (Array.isArray(parsedBrandList)) {
      parsedBrandList.forEach((data) => {
        BrandListFromLocalSet.add(data.toLowerCase().toUpperCase());
      });
    } else {
      console.error("BrandListFromLocal is not an array.");
    }
  } catch (error) {
    console.error("Error parsing BrandListFromLocal:", error);
  }
} else {
  console.warn("BrandListFromLocal is not defined in localStorage.");
}

  const BrandListFromLocalList = Array.from(BrandListFromLocalSet);
  const [modelAfterBrand, setmodelAfterBrand] = useState("");
  const [getsemiBrand, setsemiBrand] = useState("");
  const getsemifinal2Data = async (brand) => {
    setsemiBrand(brand);
    let res = await axios.get(
      `https://app.fuelfree.in/product/multiFilter?Brand=${brand}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let result = await res.data;
    let data = await result.searchedProduct;
    setmodelAfterBrand(data);
  };

  const [final2Product, setfinal2product] = useState("");
  const [productID, setProductID] = useState("");
  let savedLead=localStorage.getItem('saveLead')?JSON.parse(localStorage.getItem('saveLead')):'' 
  const goForDetails = async() => {
    if(savedLead){
      handleSubmitLead()
    }
    setIsModalOpen(true)
  };
  const getfinal2Products = async (productName) => {
    setProductID(productName);
    let res = await axios.get(
      `https://app.fuelfree.in/product/multiFilter?Brand=${getsemiBrand}&productName=${productName}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let result = await res.data;
    let data = await result.searchedProduct;
    // localStorage.setItem("NewVehicleByBudget", JSON.stringify(data))
    setfinal2product(data);
  };

  const goForSearch = () => {
    if(savedLead){
      handleSubmitLead()
    }else{
      setIsModalOpen(true)
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleSubmitLead = async() => {
  if(!savedLead){
    setIsModalOpen(false);
    productID&&(navigate(`/products/:Product/:type/${productID}`))
    finalProduct1&&(navigate("/Filter-Products") )
  }
  productID&&(navigate(`/products/:Product/:type/${productID}`))
  finalProduct1&&(navigate("/Filter-Products") )
  };

  const [activeTab, setActiveTab] = useState("new");
  const [showBudget, setShowBudget] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [budgetRange, setBudgetRange] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [showBrandOption, setShowBrandOption] = useState(false);
  const [showModelOption, setShowModelOption] = useState(false);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "budget") {
      setShowBudget(checked);
      setShowBrand(false);
      setShowBrandOption(false);
      setShowModelOption(false);
      // Reset selected brand and model when "Filter with Budget" checkbox is checked
      setSelectedBrand("");
      setSelectedModel("");
    } else if (name === "brand") {
      setShowBrand(checked);
      setShowBudget(false);
      setShowBrandOption(false);
      setShowModelOption(false);
      // Reset budget range when "Filter with Brand" checkbox is checked
      setBudgetRange("");
    } else if (name === "brandOption") {
      setShowBrandOption(checked);
      setShowModelOption(false);
    } else if (name === "modelOption") {
      setShowModelOption(checked);
      setShowBrandOption(false);
    }
  };

  const handleBudgetRangeChange = (event) => {
    setBudgetRange(event.target.value);
    setPrices(event.target.value);
  };
  const handleTypeChange = (event) => {
    vehicleTypes(event.target.value)
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    getsemifinal2Data(event.target.value);
    getFinal1Data(event.target.value);
    setSelectedModel(""); // Reset the model selection when brand changes
  };
  const handleBrandChanges = (event) => {
    setSelectedBrand(event.target.value);
    getsemifinal2Data(event.target.value);
    // getFinal1Data(event.target.value)
    setSelectedModel(""); // Reset the model selection when brand changes
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
    getfinal2Products(event.target.value);
  };

  function formatNumber(num) {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(2) + " cr";
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2) + " lakh";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "k";
    }
    return num.toString();
  }

  return (
    <div className="tanker">
      <div className="home-filter-outer">
      <h2 className="heading-home-filtermain">Find Your Right Vehicle</h2>
        <div className="home-outer-second">
            {/* <button
              className={activeTab === "new" ? "active" : ""}
              onClick={() => handleTabClick("new")}
            >
              New Vehicle
            </button> */}
            {/* <button
              className={activeTab === "used" ? "active" : ""}
              onClick={() => handleTabClick("used")}
            >
              Used Vehicle
            </button> */}
          
          
            {activeTab === "new" && (
              <div className="form-first">
              <div className="by-budget-div">
                <label>
                  <input
                    type="checkbox"
                    name="budget"
                    checked={showBudget}
                    onChange={handleCheckboxChange}
                  />
                  By Budget
                </label>
                {showBudget && (
                  <div className="dropdown-one">
                  <label>
                      <select
                        className="label-main"
                        value={gotprices}
                        onChange={handleTypeChange}
                      >
                        <option value="">Select VehicleType</option>
                        <option value="Ev-cars">Ev-cars</option>
                          <option value="Ev-bikes">Ev-bikes</option>
                          <option value="Ev-scooters">Ev-scooters</option>
                          <option value="Ev-cycles">Ev-cycles</option>
                          <option value="Ev-rickshaw">Ev-rickshaw</option>
                          <option value="Ev-loading">Ev-loading</option>
                          <option value="Ev-buses">Ev-buses</option>
                          <option value="E-Logistics">Ev-Logistics</option>
                          {/* <option value="Ev-Luna">Ev-Luna</option> */}
                      </select>
                    </label>
                    <label>
                      <select
                        className="label-main"
                        value={budgetRange}
                        onChange={handleBudgetRangeChange}
                      >
                        <option value="">Select Range</option>
                         <option value="70000">70,000 and below</option>
                        <option value="100000">1 Lakh and below</option>
                        <option value="150000">1.5 Lakh and below</option>
                        <option value="200000">2 Lakh and below</option>
                        <option value="250000">2.5 Lakh and below</option>
                        <option value="300000">3 Lakh and below</option>
                        <option value="350000">3.5 Lakh and below</option>
                        <option value="400000">4 Lakh and below</option>
                        <option value="500000">5 Lakh and below</option>
                        <option value="700000">7 Lakh and below</option>
                        <option value="900000">9 Lakh and below</option>
                        <option value="1000000">10 Lakh and below</option>
                        <option value="1200000">12 Lakh and below</option>
                        <option value="1500000">15 Lakh and below</option>
                        <option value="2000000">20 Lakh and below</option>
                        <option value="2500000">25 Lakh and below</option>
                        <option value="3500000">35 Lakh and below</option>
                        <option value="5000000">50 Lakh and below</option>
                        <option value="7000000">70 Lakh and below</option>
                        <option value="10000000">1 cr and below</option>
                        <option value="20000000">2 cr and below</option> 
                        <option value="50000000">5 cr and below</option> 
                         
      {/* {priceList &&
        priceList.map(data => (
          <option key={data.productPrice} value={data.productPrice}>
            {formatNumber(data.productPrice)} and below
          </option>
        ))} */}
     
                      </select>
                    </label>
                    <label>
                      <select
                        className="label-main"
                        // value={selectedBrand}
                        onChange={handleBrandChange}
                      >
                        <option value="">Select Brand</option>
                        {uniqueBrandList &&
                          uniqueBrandList.map((data) => (
                            <option value={data}>{data}</option>
                          ))}

                        {/* Add more options based on your requirements */}
                      </select>
                    </label>
                    <div className="search-btn-oute">
              {finalProduct1 && finalProduct1 ? (
                <button className="search-btn-outer" onClick={goForSearch}>
                  Search
                </button>
              ) : (
                ""
              )}

            </div> 
                  </div>
                )}

                 

                </div>
                <div className="by-budget-div">
                <label>
                  <input
                    
                    type="checkbox"
                    name="brand"
                    checked={showBrand}
                    onChange={handleCheckboxChange}
                  />
                  By Brand
                </label>
                
                {showBrand && (
                  <div className="flex-outer-brand-filter">
                    <label className="label-main">
                      <select
                        className="label-main"
                        value={selectedBrand}
                        onChange={handleBrandChanges}
                      >
                        <option value="">Select Brand</option>
                        {BrandListFromLocalList &&
                          BrandListFromLocalList.map((data) => (
                            <option value={data}>{data}</option>
                          ))}
                      </select>
                    </label>
                    {selectedBrand && (
                      <label className="label-main">
                        <select
                          className="label-main"
                          value={selectedModel}
                          onChange={handleModelChange}
                        >
                          <option value="">Select Model</option>
                          {modelAfterBrand &&
                            modelAfterBrand.map((data) => (
                              <option value={data._id}>
                                {data.productName}
                              </option>
                            ))}
                        </select>
                      </label>
                    )}
                  </div>
                )}
                </div>
              </div>
            )}

            <div>
              
            </div>
            {activeTab === "used" && (
              <div className="form-first" style={{ marginTop: "20px" }}>
                
                <label>
                  <input
                    type="checkbox"
                    name="brandOption"
                    checked={showBrandOption}
                    onChange={handleCheckboxChange}
                  />
                  By Budget
                </label>
                <label>
                  <input
                    style={{ marginLeft: "50px" }}
                    type="checkbox"
                    name="modelOption"
                    checked={showModelOption}
                    onChange={handleCheckboxChange}
                  />
                  By Model
                </label>
                {showBrandOption && (
                  <div className="flex-outer-brand-filter">
                    <label className="label-main">
                      <select
                        className="label-main"
                        value={selectedBrand}
                        onChange={handleBrandChange}
                      >
                        <option value="">Select Brand</option>
                        <option value="toyota">Toyota</option>
                        <option value="honda">Honda</option>
                        <option value="ford">Ford</option>
                        {/* Add more options based on your requirements */}
                      </select>
                    </label>
                    <label className="label-main">
                      <select
                        className="label-main"
                        value={selectedBrand}
                        onChange={handleBrandChange}
                      >
                        <option value="">Select City</option>
                        <option value="toyota">Indore</option>
                        <option value="honda">Bhopal</option>
                        <option value="ford">Dewas</option>
                        <option value="ford">Raipur</option>
                        <option value="ford">Kota</option>
                        {/* Add more options based on your requirements */}
                      </select>
                    </label>
                  </div>
                )}

                {showModelOption && (
                  <div className="flex-outer-brand-filter">
                    <label className="label-main">
                      <select
                        className="label-main"
                        value={selectedModel}
                        onChange={handleModelChange}
                      >
                        <option value="">Select Model</option>
                        {/* Add options based on the selected brand */}
                        {/* For example, if selectedBrand is 'toyota', show Toyota models */}
                        {selectedBrand === "toyota" && (
                          <>
                            <option value="camry">Camry</option>
                            <option value="corolla">Corolla</option>
                            {/* Add more Toyota models based on your requirements */}
                          </>
                        )}
                        {/* Add more options for other brands */}
                      </select>
                    </label>
                    <label className="label-main">
                      <select
                        className="label-main"
                        value={selectedBrand}
                        onChange={handleBrandChange}
                      >
                        <option value="">Select City</option>
                        <option value="toyota">Indore</option>
                        <option value="honda">Bhopal</option>
                        <option value="ford">Dewas</option>
                        <option value="ford">Raipur</option>
                        <option value="ford">Kota</option>
                      </select>
                    </label>
                  </div>
                )}
              </div>
            )}
           
            <div className="search-btn-oute" id="new-searchbtn-out">
              {final2Product && final2Product ? (
                <button className="search-btn-outer" onClick={goForDetails}>
                  Search
                </button>
              ) : (
                ""
              )}
            </div>
        </div>
        <LeadModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmitLead} />
      </div>
    </div>
  );
}

export default Filterformnew;

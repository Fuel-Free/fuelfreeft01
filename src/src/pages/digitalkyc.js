import React,{useState} from "react";
import { useRef } from "react";
import "./digitalkyc.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Digitalkyc() {
  
  const initialStateForImage = {
    AadhaarCardImage: null,
    panCardImage: null,
    electricityBillImage: null,
    yourSelfie: null,
    drivingLicense: null,
    uploadPhoto: null,
    uploadContactNumberPhoneBook: null,
    uploadAnotherContactNumberPhoneBook: null
  };

  const [state, setState] = useState(initialStateForImage);

  const handleFileInputChange = (event, fieldName) => {
    const file = event.target.files[0];
    setState({
      ...state,
      [fieldName]: file
    });
  };
  const handleImageget=(e)=>{
    scrollToSection1()
    e.preventDefault();
    // console.log(priceList,'price')(state);
  }
  const initialFormState = {
    name: "",
    email: "",
    phoneNo: "",
    alternatePhoneNo: "",
    DOB: "",
    panCardNo: "",
    gender: "",
    currentAddress: "",
    permanentAddress: "",
    bankName: "",
    accountNumber: "",
    IFSCNumber: "",
    accountHolderName: "",
    AadhaarCardNo:'',
    dealerName:"",
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    scrollToSection()
    e.preventDefault();
    // console.log(priceList,'price')(formData);
   };

   const sectionRef = useRef(null);
  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
   const section = useRef(null);
  const scrollToSection1 = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const LastFormState = {
    dealerName:"",
    dealerFirmName:"",
    dealerEmail:"",
    dealerContactNumber:"",
    firmGSTNumber:"",
    rentalDate:"",
    vehicleRegistrationNumber:"",
    vehicleModelName:"",
    dealerAddress:""
  };
  const [formData1, setFormData1] = useState(LastFormState);

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1({
      ...formData1,
      [name]: value,
    });
  };

 const handleSubmitDone = async (e) => {
  e.preventDefault();
  try {
    const combinedState = {
      ...formData,
    };

    const formDataForAPI = new FormData();
    Object.entries(combinedState).forEach(([key, value]) => {
      formDataForAPI.append(key, value);
    });

    Object.entries(state).forEach(([key, value]) => {
      formDataForAPI.append(key, value);
    });

    // console.log(priceList,'price')(combinedState);

    let res = await axios.post(`https://app.fuelfree.in/user/digitalkyc`, formDataForAPI, {
      headers: {
        "accept": "application/json",
        "content-type": "multipart/form-data"
      }
    });

    let data = await res.data;
    if(data.success==='success'){
      toast.success('success')
      setTimeout(() => {
        window.location.reload()
      },  2000);
    }   
  } catch (error) {
    console.error("Error submitting form:", error);
    alert('check form once')
  }
};

  return (
    <div className="width-percent">
    <ToastContainer/>
      <div className="digitalkyc">
        <div className="digital-1 digi-shadow">
          <h4>Personal Details</h4>
          <div className="digi-input">
            <form onSubmit={handleSubmit} >
              <div className="digi-flex">
                <div>
                  <input type="text" name="name" placeholder="Enter Your Name" required value={formData.name}  onChange={(e)=>handleInputChange(e)}></input>
                  <input type="email" name="email" placeholder="Enter Email Address" required value={formData.email}  onChange={handleInputChange} ></input>
                  <input type="tel" name="phoneNo"  placeholder="Enter your Contact Number" required value={formData.phoneNo} onChange={handleInputChange} ></input>
                  <input type="tel" placeholder="Enter Alternate Number" required name="alternatePhoneNo" value={formData.alternatePhoneNo} onChange={handleInputChange} ></input>
                  <label className="digi-mobile-show">Date Of Birth</label>
                  <input
                    type="date"
                    placeholder="Date OF Birth"
                    required
                    title="Date OF Birth"
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleInputChange}
                  ></input>
                  <input type="number" placeholder="Enter Your Aadhar Number" name="AadhaarCardNo" required value={formData.AadhaarCardNo} onChange={handleInputChange} ></input>
                  <input type="text" placeholder="Enter Your PAN Number"  name="panCardNo" required value={formData.panCardNo} onChange={handleInputChange} ></input>
                </div>
                <div>
                  <select id="cars" onChange={handleInputChange} value={formData.gender} name="gender" >
                    <option value="#">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="rnts">Rather not to say</option>
                  </select>
                  <input type="text" placeholder="Enter Your Current Address" name="currentAddress" required value={formData.currentAddress} onChange={handleInputChange} ></input>
                  <input type="text" placeholder="Enter Your Permanent Address" name="permanentAddress" required value={formData.permanentAddress} onChange={handleInputChange} ></input>
                  <input type="text" placeholder="Bank Name" required value={formData.bankName} name="bankName" onChange={handleInputChange} ></input>
                  <input type="number" placeholder="Enter Account Number" name="accountNumber" required value={formData.accountNumber} onChange={handleInputChange} ></input>
                  <input type="name" placeholder="Enter IFSC Code" name="IFSCNumber" value={formData.IFSCNumber} required onChange={handleInputChange} ></input>
                  <input type="name" placeholder="Account Holder name" name="accountHolderName"  required value={formData.accountHolderName} onChange={handleInputChange} ></input>
                </div>
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        <div className="digital-2 digital-1 digi-shadow" ref={sectionRef}>
          <h4>Document Upload</h4>
          <div className="digi-input">
            <form   onSubmit={handleImageget} >
              <div className="digi-flex">
                <div>
                  <label>Upload Aadhar Card</label>
                  <input type="file" placeholder="Enter Your Name" required name="AadhaarCardImage"   onChange={(event) => handleFileInputChange(event, 'AadhaarCardImage')}  ></input>

                  <label>Upload PAN Card</label>
                  <input type="file" placeholder="Enter Email Address"  required name="panCardImage"   onChange={(event) => handleFileInputChange(event, 'panCardImage')}  ></input>

                  <label>Upload Driving License</label>
                  <input type="file" placeholder="Enter your drivingLicense" required name="drivingLicense"   onChange={(event) => handleFileInputChange(event, 'drivingLicense')}></input>

                  <label>Upload Your Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    placeholder="Enter Image"
                    required 
                    name="uploadPhoto" 
                    onChange={(event) => handleFileInputChange(event, 'uploadPhoto')}
                  ></input>
                </div>
                <div>
                  <label>Upload Electricity Bill</label>
                  <input type="file" placeholder="electric" required name="electricityBillImage"   onChange={(event) => handleFileInputChange(event, 'electricityBillImage')} ></input>

                  <label>Upload Contact Number From PhoneBook</label>
                  <input type="file" placeholder="Contact number" required name="uploadContactNumberPhoneBook"   onChange={(event) => handleFileInputChange(event, 'uploadContactNumberPhoneBook')}></input>

                  <label>Upload Another Contact Number From PhoneBook</label>
                  <input type="file" placeholder="Contact number" required name="uploadAnotherContactNumberPhoneBook"   onChange={(event) => handleFileInputChange(event, 'uploadAnotherContactNumberPhoneBook')}></input>

                  <label>Take your Selfie</label>
                  <input type="file" placeholder="take your selfie" accept="image/*" required name="yourSelfie"   onChange={(event) => handleFileInputChange(event, 'yourSelfie')}></input>
                </div>
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        <div className="digital-3 digital-1 digi-shadow" ref={section} >
          <h4>Dealer Details</h4>
          <div className="digi-input">
            <form onSubmit={handleSubmitDone} >
              <div className="digi-flex">
                <div>
                  <input type="text" placeholder="Enter Dealer's Name" required name="dealerName"   value={formData1.dealerName} onChange={handleInputChange1} ></input>
                  <input type="text" placeholder="Enter Firm Name" required name="dealerFirmName"   value={formData1.dealerFirmName} onChange={handleInputChange1}></input>
                  <input type="email" placeholder="Enter Dealer's Email Address" required name="dealerEmail"   value={formData1.dealerEmail} onChange={handleInputChange1}></input>
                  <input type="tel" placeholder="Enter Dealer's Contact Number" required name="dealerContactNumber"   value={formData1.dealerContactNumber} onChange={handleInputChange1}></input>
                  <input type="text" placeholder="Enter Firm's GST Number" required name="firmGSTNumber"   value={formData1.firmGSTNumber} onChange={handleInputChange1}></input>
                  
                </div>
                <div>
                <label className="digi-mobile-show">Booking Date</label>
                <input
                    type="date"
                    placeholder="Booking Date"
                    required
                    title="Booking Date"
                    name="rentalDate" 
                    value={formData1.rentalDate}
                    onChange={handleInputChange1}
                  ></input>
                  <input type="text" placeholder="Vehicle Registration Number" required name="vehicleRegistrationNumber"   value={formData1.vehicleRegistrationNumber} onChange={handleInputChange1} ></input>
                  <input type="text" placeholder="Vehicle Type" required name="vehicleType"   value={formData1.vehicleType} onChange={handleInputChange1}></input>
                  <input type="text" placeholder="Vehicle Model Name" required name="vehicleModelName"   value={formData1.vehicleModelName} onChange={handleInputChange1}></input>
                  <input type="text" placeholder="Enter Dealer's Address" required name="dealerAddress"   value={formData1.dealerAddress} onChange={handleInputChange1}></input>

                </div>
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Digitalkyc;


 

 
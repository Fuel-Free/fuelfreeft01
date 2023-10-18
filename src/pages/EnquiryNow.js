import React,{useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EnquiryForm.css";
import ReactModal from "react-modal";
import Header from "../components/header";
import Footer from "../components/footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import config from "../utils/config";

function EnquiryForm() {
  const [showModal, setShowModal] = useState(false);
  const defaultValues = {
    Name: "",
    PhoneNo: "",
    Message: "",
    
  };

  const today = new Date();
  const validationSchema = yup.object().shape({
    Name: yup
      .string()
      .matches(/[A-Za-z]/, "Must be a alphabet")
      .required("Name is required"),
    
    PhoneNo: yup
      .string()
      .matches(
        /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/,
        "Must be valid phone number"
      )
      .required("Phone number is required"),
    
    Message: yup.string().required("Enter Message"),
  });

  const handleSubmit = async (values) => {
    let response = await axios.post( `${config.url}/consult/Add`, values, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    let result = response.data;

    if (result.success === "success") {
      setShowModal(true);
      setTimeout(() => {
        window.location.reload()
      },5000)
    } else {
      toast.error(result.error)
    }
  };
  const buynowmodal = () => {
    setShowModal(false);
  };


  

  return (
    <>
      <Header />
      
      <ToastContainer />
      <div className="welcomeline">
          <h3>WELCOME TO FUELFREE</h3>
          <p>FEEL FREE TO CONTACT US</p>
        </div>
      <div className="tanker">
        <div className="EnquiryAll">
          <div className="Enquiryformouter">
            <div className="enquiry-form">
              <Formik
                initialValues={defaultValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Field
                    type="text"
                    name="Name"
                    placeholder="Name"
                    className="form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="Name" />
                  </p>
                   
                  <Field
                    type="tel"
                    name="PhoneNo"
                    placeholder="Phone Number"
                    className="form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="PhoneNo" />
                  </p>
                 
                  <Field
                    type="text"
                    name="Message"
                    placeholder="Message"
                    className="form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="time" />
                  </p>
                  <button type="submit">Submit</button>
                </Form>
              </Formik>
            </div>
          </div>
          <div className="EnquiryContent">
            <div className="Enquirybackground"></div>
          </div>
        </div>
      </div>
      {showModal && (
        <ReactModal
          isOpen={true} 
          onRequestClose={() => setShowModal(false)} 
        >
          <div className="buynowmodelbox">
          <div className="congo">
            <h2>Congratulations</h2>
            </div>
            <p>Your Consulation is Saved</p>
            <button
              type="submit"
              className="btn btn-success mt-4"
              onClick={buynowmodal}
            >
              OK
            </button>
          </div>
        </ReactModal>
      )}
      <Footer />
    </>
  );
}

export default EnquiryForm;

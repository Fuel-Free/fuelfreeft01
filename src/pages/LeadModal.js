import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LeadModal({ isOpen, onClose, onSubmit  }) {
  const defaultValues = {
    name: "",
    number: "",
    city: "",
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/[A-Za-z]/, "Must be an alphabet")
      .required("Name is required"),
    number: yup
      .string()
      .matches(
        /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/,
        "Must be valid phone number"
      )
      .required("Phone number is required"),
    city: yup.string().required("Enter your city"),
  });

  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (value) => {
    let obj = { ...value, BuyDate: selectedOption };
    try {
      let res = await axios.post(`https://app.fuelfree.in/lead/generate`, obj, {
        headers: {  
          Accept: "application/json",  
        },
      });
      let result = await res.data;
      
      if (result.success === 'save your lead') {
      localStorage.setItem("saveLead", JSON.stringify(result.data))  
        toast.success("Thank You")
        setTimeout(() => {
          onSubmit()
        }, 1000);
      }
    } catch (error) {
      console.error(error); 
    }
  };
  

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
    <ToastContainer/>
      <div className="modal-content">
        <span onClick={onClose} className="close-btn-leadModal">
          x
        </span>

        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className="form-control"
            />
            <p className="text-danger">
              <ErrorMessage name="name" />
            </p>
            <Field
              type="tel"
              name="number"
              placeholder="Phone No"
              className="form-control"
            />
            <p className="text-danger">
              <ErrorMessage name="number" />
            </p>
            <Field
              className="form-control"
              placeholder="city"
              type="text"
              id="city"
              name="city"
            />
            <div id="fiter-planinng-modal">
              <label htmlFor="">How soon are you planning to buy?</label>
              <br />
              <div>
                <label>
                 
                  <input
                    type="radio"
                    name="purchaseTimeframe"
                    value="Urgent"
                    onChange={handleOptionChange}
                    checked={selectedOption === "Urgent"}
                  />
                  <span> Urgent</span>
                </label>
                <br />
                <label>
                  
                  <input
                    type="radio"
                    name="purchaseTimeframe"
                    value="Next Month"
                    onChange={handleOptionChange}
                    checked={selectedOption === "Next Month"}
                  />
                  <span>Next Month</span>
                </label>
                <br />
                <label>
                  
                  <input
                    type="radio"
                    name="purchaseTimeframe"
                    value="2-3 Months"
                    onChange={handleOptionChange}
                    checked={selectedOption === "2-3 Months"}
                  />
                  <span>2-3 Months</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="fiter-planinng-modal-butn"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default LeadModal;

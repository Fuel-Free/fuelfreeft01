import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

function LeadModal({ isOpen, onClose, onSubmit }) {
  const defaultValues = {
    userName: "",
    phoneNo: "",
    city: "",
  };

  const validationSchema = yup.object().shape({
    userName: yup
      .string()
      .matches(/[A-Za-z]/, "Must be an alphabet")
      .required("Name is required"),
    phoneNo: yup
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

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span onClick={onClose} className="close-btn-leadModal">
          x
        </span>

        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchema}
        >
          <Form>
            <Field
              type="text"
              name="userName"
              placeholder="Name"
              className="form-control"
            />
            <p className="text-danger">
              <ErrorMessage name="userName" />
            </p>
            <Field
              type="tel"
              name="phoneNo"
              placeholder="Phone No"
              className="form-control"
            />
            <p className="text-danger">
              <ErrorMessage name="phoneNo" />
            </p>
            <Field
              className="form-control"
              placeholder="city"
              type="text"
              id="city"
              name="city"
            />
            <div>
              <label htmlFor="">How soon are you planning to buy?</label>
              <br />
              <div>
                <label>
                  Urgent
                  <input
                    type="radio"
                    name="purchaseTimeframe"
                    value="Urgent"
                    onChange={handleOptionChange}
                    checked={selectedOption === "Urgent"}
                  />
                </label>
                <br />
                <label>
                  Next Month
                  <input
                    type="radio"
                    name="purchaseTimeframe"
                    value="Next Month"
                    onChange={handleOptionChange}
                    checked={selectedOption === "Next Month"}
                  />
                </label>
                <br />
                <label>
                  2-3 Months
                  <input
                    type="radio"
                    name="purchaseTimeframe"
                    value="2-3 Months"
                    onChange={handleOptionChange}
                    checked={selectedOption === "2-3 Months"}
                  />
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-3 userSignup-btn"
              onClick={onSubmit}
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

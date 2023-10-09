import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import countdown from "../../pages/images/clock.gif";
import Adminsidebar from "./adminsidebar";
import "./PaidVendorList.css"; // Import your CSS file here

const PaidVendorList = () => {
  const navigate = useNavigate();
  const [chargingList, setChargingList] = useState([]);

  async function getChargingList() {
    try {
      const response = await axios.get("https://app.fuelfree.in/vendor/agency/list/paid", {
        headers: {
          Accept: "application/json",
        },
      });
      const chargingData = response?.data?.paidList;
      setChargingList(chargingData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const gologinadmin = () => {
    if (!localStorage.getItem("Admin-Info")) {
      navigate("/admin");
    }
  };

  const calculateTimeRemaining = (updatedAt) => {
    const thirtyDaysInMillis = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    const now = new Date();
    const updatedAtDate = new Date(updatedAt);
    const timeDiff = thirtyDaysInMillis - (now - updatedAtDate);

    if (timeDiff <= 0) {
      return "Expired"; // Or any other text you want to display for expired items
    }

    const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeDiff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeDiff % (60 * 1000)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    getChargingList();
    gologinadmin();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedChargingList = chargingList.map((data) => ({
        ...data,
        countdown: calculateTimeRemaining(data.updatedAt),
      }));
      setChargingList(updatedChargingList);
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, [chargingList]);

  const handleUnPaid = async (paid, _id) => {
    let res = await axios.patch(
      `https://app.fuelfree.in/admin/agency/paid/${_id}?paid=${paid}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    setChargingList((prevList) => prevList.filter((item) => item._id !== _id));
    let result = await res.data;
  };
  

  return (
    <div id="admin-page-id">
      <Adminsidebar />
      <div className="admin-dashboard">
        <div className="admin-dashboard-outer-list">
          <div className="admin-title">
            <h3>Paid Vendor List</h3>
          </div>
          <div className="admin-dashboard-table-new custom-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th className="custom-th">Name</th>
                  <th className="custom-th">Email</th>
                  <th className="custom-th">Phone No / Alternate</th>
                  <th className="custom-th">Opening / Closing (Time)</th>
                  <th className="custom-th">Address</th>
                  <th className="custom-th">Time left</th>
                  <th className="custom-th"></th>
                </tr>
              </thead>
              <tbody>
                {chargingList &&
                  chargingList.map((data) => (
                    <tr className="custom-tr" key={data.id}>
                      <td className="custom-td">{data.name}</td>
                      <td className="custom-td">{data.email}</td>
                      <td className="custom-td">
                        {data.whatsappNo}
                        <br />
                        {data.alternatePhoneNo ? `- ${data.alternatePhoneNo}` : " "}
                      </td>
                      <td className="custom-td">
                        {data.openingTime}AM / {data.closingTime}PM
                      </td>
                      <td className="custom-td">{data.address}</td>
                      <td className="custom-td">
                        {calculateTimeRemaining(data.updatedAt)}
                        <img src={countdown} alt="countdown" className="custom-countdown" />
                      </td>
                      <td className="custom-td">
                        <button onClick={() => handleUnPaid("false",data._id)}>Unpaid</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaidVendorList;

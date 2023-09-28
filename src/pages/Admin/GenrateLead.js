import "./admin.css";
import axios from "axios";
import Adminsidebar from "./adminsidebar";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { Link, useNavigate } from "react-router-dom";

const  GenrateLead = () => {
  const navigate = useNavigate();
  const [chargingList, setChargingList] = useState('');

  const [count,setcount]=useState('')

  async function getChargingList() {
    let resultCharging = await axios.get("https://app.fuelfree.in/lead/generateList", {
      headers: {
        Accept: "application/json",
      },
    });
    let chargingData = await resultCharging.data;
     
    setChargingList(chargingData?.data);
    setcount(resultCharging?.count)
  }
  useEffect(() => {
    getChargingList();
  }, []);

  const gologinadmin = () => {
    if (!localStorage.getItem("Admin-Info")) {
      navigate("/admin");
    }
  };
  useEffect(() => {
    gologinadmin();
  }, []);
  const [filteredList, setFilteredList] = new useState(chargingList);
  const filterBySearch = (event) => {
    const query = event.target.value.toLowerCase();
    const updatedList = chargingList.filter((item) => {
      const vehicleTypeMatch = item.name.toLowerCase().indexOf(query) !== -1;
    
      const productPriceMatch =
        item.number.toString().toLowerCase().indexOf(query) !== -1;
      const DrivingRangeMatch =
        item.city.toString().toLowerCase().indexOf(query) !== -1;
      const LeadsMatch =
        item.BuyDate.toString().toLowerCase().indexOf(query) !== -1;

      return (
        productPriceMatch ||
        vehicleTypeMatch ||
        LeadsMatch||
        DrivingRangeMatch
      );
    });

    setFilteredList(updatedList);
  };
  const filterByCity = (event) => {
    const query = event.value.toLowerCase();
    const updatedList = chargingList.filter((item) => {
      const  LeadcityMatch = item.city.toLowerCase().indexOf(query) !== -1;
      return (
        LeadcityMatch
      );
    });

    setFilteredList(updatedList);
  };

  const options = [
    { value: 'Indore', label: 'Indore' },
    { value: 'Bhopal', label: 'Bhopal' },
    { value: 'gwalior', label: 'gwalior' },
    { value: 'jabalpur', label: 'jabalpur' },
    { value: 'surat', label: 'surat' },
    { value: 'Dewas', label: 'Dewas' },
    { value: 'Ujjain', label: 'Ujjain' },
    { value: 'Vidisha', label: 'Vidisha' },
    { value: 'Sehore', label: 'Sehore' },
    { value: 'Rajgarh', label: 'Rajgarh' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div id="admin-page-id">
      <Adminsidebar />
      <div className="admin-dashboard">
        <div className="admin-dashboard-outer-list">
          <div className="admin-title">
            <h3>Total generated leads-: {count}</h3>
          </div>
          <div className="section-title">
          <Select
        defaultValue={selectedOption}
        onChange={filterByCity}
        required
        options={options}
       />
            <div className="search-text">Search Lead:</div>
            <input
              id="search-box"
              className="form-controle"
              onChange={filterBySearch}
            />
          </div>
          <div className="admin-dashboard-table">
            <div className="admin-dashboard-table ">
              <ul>
                <li id="admint-table-haeding">
                  <div className="admin-dashboard-name">
                    <span> Custmor name </span>
                    <span>PhoneNo</span>
                    <span className="admin-emil">City</span>
                    <span className="admin-emil">Buy</span>
                  </div>
                </li>

                {filteredList ? (
                  <>
                    {filteredList &&
                      filteredList.map((item) => (
                        <li id="admint-table-haeding" key={item._id}>
                          <div className="admin-dashboard-name">
                            <span className="admin-emil">{item.name}</span>
                            <span className="admin-emil">{item.number}</span>
                            <span className="admin-emil">{item.city}</span>
                            <span className="admin-emil">
                              {item.BuyDate}
                            </span>
                             
                          </div>
                        </li>
                      ))}
                  </>
                ) : (
                  <>
                    {chargingList &&
                      chargingList.map((item) => (
                        <li id="admint-table-haeding" key={item._id}>
                          <div className="admin-dashboard-name">
                            <span className="admin-emil">{item.name}</span>
                            <span className="admin-emil">{item.number}</span>
                            <span className="admin-emil">{item.city}</span>
                            <span className="admin-emil">
                              {item.BuyDate}
                            </span>
                          </div>
                        </li>
                      ))}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GenrateLead;

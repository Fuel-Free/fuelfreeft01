import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./wishlist.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { RiDeleteBin5Line } from 'react-icons/ri'
import config from "../utils/config";

const Wishlist = () => {
  const navigate = useNavigate();
  let goTologin = () => {
    toast.warning("Please Login");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    return { _id: null };
  };

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : NaN;

  let uid = user._id;

  const [wishlist, setwishlist] = useState([]);
  // console.log(priceList,'price')(wishlist, "ffff");

  const getwishlist = async () => {
    let userid = uid ? uid : goTologin();
    let res = await axios.get(
      `${config.url}/favorite/list/${userid}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let result = await res.data;
    let wishlist = result.list;

    setwishlist(wishlist);
  };
  useEffect(() => {
    getwishlist();
  }, []);

  async function deleteProduct(_id) {
    let res = await axios.delete(`${config.url}/favorite/remove/${_id}`, {
      headers: {
        Accept: "application/json"
      }
    })
    let result = await res.data
    //   (result)
    window.location.reload();
  }
  return (
    <>
      <Header />
      <div className="tanker">
        <div className="OUR-CARS-outer">
        {wishlist.length>0?(<>{wishlist &&
            wishlist.map((data) => (
              <div class="Carcard" key={data._id}>
              <RiDeleteBin5Line className="delete-btn" 
                    onClick={() => deleteProduct(data._id)}
               />
                <img
                  src={`${config.url}/${data.productID.productImage}`}
                  alt="Card image cap"
                />
                <div class="Cartitle">
                  <h5>{data.productID.productName}</h5>
                  <p> Starting at Rs. {data.productID.productPrice}</p>
                  <Link
                    to={`/products/${data.productID.productName}/${data.productID.VehicleType}/${data.productID._id}`}
                    class="view-offer-a"
                  >
                    View
                  </Link>
                  {/* <Link
                    class="view-offer-a"
                    onClick={() => deleteProduct(data._id)}
                  >
                    Delete 
                  </Link> */}
                </div>
              </div>
            ))}</>):(<h2>No Product Found </h2>)}
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;

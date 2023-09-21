import axios from "axios";
import "./dealerpagedetail.css";
import Footer from "../components/footer";
import Header from "../components/header";
import { Link, useParams,useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import "react-responsive-pagination/themes/classic.css";
import { Loader } from "@googlemaps/js-api-loader"
import ResponsivePagination from "react-responsive-pagination";
import dealerimgbanner from "../pages/images/dealersimgbanner.jpeg";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {FaMapMarkerAlt} from 'react-icons/fa'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import config from "../utils/config";

const DealerList = () => {
  const { city } = useParams();
  const navigate=useNavigate()
  const [apiLoaded, setApiLoaded] = useState(false);
  const [loading, setLoading] = useState(true); 
  
  const [dealers, setdealers] = useState("");
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const lastProductIndex = currentPage * 12;
  const firstProductIndex = lastProductIndex - 12;
  const currentDealer = products.slice(firstProductIndex, lastProductIndex);
  const [counts, setcounts] = useState("");

  //getLocation automatic
  const [cityofuser, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA_2eybqcLSYvWm2bn4PIoi_wYCEnjYlkQ`;

          fetch(geocodeUrl)
            .then(response => response.json())
            .then(data => {
              const results = data.results;
              const city = getCityFromResults(results);
              const address = getAddressFromResults(results);
              const mapUrl = getMapUrl(latitude, longitude);
              setCity(city);
              setAddress(address);
              setMapUrl(mapUrl);
            })
            .catch(error => console.log(error));
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
    fetchDealersAndCalculateDistances()
  }, []);

  useEffect(() => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address + ' ' + city
    )}&key=AIzaSyA_2eybqcLSYvWm2bn4PIoi_wYCEnjYlkQ`;

    fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          const newMapUrl = getMapUrl(lat, lng);
          setMapUrl(newMapUrl);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [city, address]);

  function getCityFromResults(results) {
    let city = '';
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      for (let j = 0; j < result.address_components.length; j++) {
        const addressComponent = result.address_components[j];

        if (addressComponent.types.includes('locality')) {
          city = addressComponent.long_name;
          break;
        }
      }
      if (city !== '') {
        break;
      }
    }  
    return city;
  }

  useEffect(() => {
    if(address){
      setAddress(address);
      fetchDealersAndCalculateDistances();
    }
    // Fetch dealers and calculate distances
  }, [address]);

  function getAddressFromResults(results) {
    let address = '';

    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      for (let j = 0; j < result.address_components.length; j++) {
        const addressComponent = result.address_components[j];

        if (
          addressComponent.types.includes('street_number') ||
          addressComponent.types.includes('subpremise') ||
          addressComponent.types.includes('premise') ||
          addressComponent.types.includes('establishment') ||
          addressComponent.types.includes('route') ||
          addressComponent.types.includes('sublocality_level_1') ||
          addressComponent.types.includes('sublocality_level_2') ||
          addressComponent.types.includes('locality') ||
          addressComponent.types.includes('administrative_area_level_1') ||
          addressComponent.types.includes('postal_code') ||
          addressComponent.types.includes('country')
        ) {
          address += addressComponent.long_name + ' ';
        }
      }

      if (address !== '') {
        break;
      }
    }

    return address.trim();
  }

  function getMapUrl(latitude, longitude) {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    return mapUrl;
  }

  function handleCityChange(event) {
    setCity(event.target.value);
    setAddress(''); // Clear the address when changing the city
  }

  const handleAddressChange = async (value) => {
    setLoading(true);
    setAddress(value);

    // Fetch dealers and calculate distances based on the selected or changed address
    if (value) {
      try {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        fetchDealersAndCalculateDistances();
      } catch (error) {
        console.error("Error changing address:", error);
      }
    }
  };

   //distance calcutaion
   const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 * 1000; // Radius of the earth in meters
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const calculatedDistance = R * c; // Distance in meters

    return calculatedDistance;
  };

  const degToRad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const [userlat,setuserlat]=useState('')
  const [userlon,setuserlon]=useState('')
  const iframeSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyA_2eybqcLSYvWm2bn4PIoi_wYCEnjYlkQ&q=${userlat},${userlon}&zoom=17`
  const fetchDealersAndCalculateDistances = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.url}/vendor/agency/filterByCity?city=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch dealers');
      }
      const data = await response.json();
      const list = data.search;
      let length = list.count;      
      setcounts(length);
      
      setTotalPages(Math.ceil(list.length / 12));

      if (list.length < 2) {
        throw new Error('Insufficient dealer data');
      }

      const url2 =  mapUrl?new URL(mapUrl):new URL('https://www.google.com/maps/search/?api=1&query=22.7226274,75.8866805')  
      const lat2 = parseFloat(url2?.searchParams.get('query').split(',')[0]);
      const lon2 = parseFloat(url2?.searchParams.get('query').split(',')[1]);
     setuserlat(lat2)
     setuserlon(lon2)
    
      const calculatedDealerDetails =  list?.map(dealer => {
        const url1 = new URL(dealer?.googleMapURL?dealer.googleMapURL:"https://www.google.com/maps/search/?api=1&query=22.7226274,75.8866805");
        const query1 = url1?.searchParams.get('query');
        const lat1 = query1 ? parseFloat(query1.split(',')[0]) : 0;
        const lon1 = query1 ? parseFloat(query1.split(',')[1]) : 0;
        const distance = calculateDistance(lat1, lon1, lat2, lon2);

        return {
          name: dealer.name,
          address: dealer.address,
          aboutTheStore: dealer.aboutTheStore,
          distance: distance,
          openingTime:dealer.openingTime,
          closingTime:dealer.closingTime,
          googleMapURL:dealer.googleMapURL,
          firmName:dealer.firmName,
          _id:dealer._id
        };
      });

      const sortedDealerDetails = calculatedDealerDetails.slice().sort((a, b) => a.distance - b.distance);
      if(sortedDealerDetails){
        setProducts(sortedDealerDetails);
        setdealers(sortedDealerDetails);
          setLoading(false);
      }
     
    } catch (error) {
      console.error('Error fetching dealers:', error);
      setProducts([]);
    }
  };
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyA_2eybqcLSYvWm2bn4PIoi_wYCEnjYlkQ', // Replace with your Google Maps API key
      version: "weekly",
      libraries: ["places"]
    });

    loader.load().then(() => {
      setApiLoaded(true)
    });
  }, []);

  useEffect(() => {
    if (city && address) {
      fetchDealersAndCalculateDistances();
    }
  }, [city, address]);
  //search
  const handleGoogleMapsClick = (googleMapUrl) => {
    
  
    const userCoordinates = googleMapUrl.match(/query=([\d.]+),([\d.]+)/);
    const destinationCoordinates = mapUrl.match(/query=([\d.]+),([\d.]+)/);
  
    if (userCoordinates && userCoordinates.length === 3 && destinationCoordinates && destinationCoordinates.length === 3) {
      const [userLat, userLon] = userCoordinates.slice(1);
      const [destLat, destLon] = destinationCoordinates.slice(1);
  
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${destLat},${destLon}&destination=${userLat},${userLon}`;
      window.open(directionsUrl, '_blank');
    }
  };

  const handleAddressSelect = async (selectedAddress) => {
    setLoading(true)
    setAddress(selectedAddress);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      fetchDealersAndCalculateDistances();
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };

  const gotomap=()=>{
     navigate(`/my-location/${encodeURIComponent(mapUrl)}/location`)
  }

  return (
    <div>
      <Header />
      
      <div id="dealerlist">
        <div className="stations-wallpaper">
          <img src={dealerimgbanner} alt="charging station wallaper"></img>
          
          
          <div className="stations-wallpaper-overlay">
            <h3>Dealer List</h3>
            <p>find best Dealer List for electric vehicle in your area</p>
            <h5>Dealer List found in your location</h5>
            <div className="search_deler_div">
              {/* <p>Search address</p>
              <input
                id="deler_search"
                placeholder=""
                onChange={filterBySearch}
              ></input> */}
            </div>
          </div>
        </div>

        <iframe
            src={iframeSrc}
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            className="mapDealer"
          ></iframe>

        <div className="tanker" id="dealer-serch-input-id">
          <div className="dear-sech-input">
           
          {/* <input placeholder="Search address" value={address} onChange={handleAddressChange}/> */}
          
         <FaMapMarkerAlt onClick={gotomap} /> {apiLoaded&&(  <PlacesAutocomplete
            value={address}
            onChange={(value)=>handleAddressChange(value)}
            onSelect={(value)=>handleAddressChange(value)}
            className="form-control"
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search address",
                    className: "location-search-input",
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion, index) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    return (
                      <div
                        key={index}
                        {...getSuggestionItemProps(suggestion, { className })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>)} 
          </div>
          <button onClick={()=>handleAddressChange(address)} className="btn btn-success mt-4 " >Apply Address</button>     
          <div className="loc-css">
           
            <span className="flatNo">{counts}</span> DEALER FOUND IN YOUR
            LOCATION
          </div>
           
        </div>
   {loading?(<div className="loading-indicator">Loading...</div>):(<div className="tanker">
            <div className="OUR-CARS-outer">
              {currentDealer &&
                currentDealer.map((data) => (
                  <div class="Carcard" key={data._id}>
                    <img
                      alt="vendor-img"  className="dealer-img"
                      src={dealerimgbanner}
                    />

                    <div class="Cartitle">
                      <h5>{data.firmName}</h5>
                      <h6>Distance:{data.distance < 1 ? `${data.distance.toFixed(2)+1000} meters` : `${(data.distance / 1000).toFixed(2)+1} kilometers`}</h6>
                      <p style={{ color: "#262681" }}>{data.whatsappNo}</p>
                      <Link
                        className="google-color"
                        target="_blank"
                        // to={`${data.googleMapURL}`}
                        onClick={()=>handleGoogleMapsClick(data.googleMapURL)}
                      >
                        Find on Google Map
                      </Link>
                      <Link
                        to={`/dealer-store-page/${data._id}`}
                        class="view-offer-a"
                      >
                        Visit Store
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
            
          </div>)}   
        <div className="pagination-products-all">
              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
      </div>
      <Footer />
    </div>
  );
};

export default DealerList;

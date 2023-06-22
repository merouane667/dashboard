import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './option.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import useLocalStorageTokenCheck from '../../components/tokenCheck/useLocalStorageCheck';
import useLocalStorageRoleCheck from '../../components/roleCheck/useLocalStorageCheck';
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';


const AddOption = () => {
  const navigate = useNavigate();
  const { packId } = useParams();

  useLocalStorageTokenCheck('accessToken');
  useLocalStorageRoleCheck('role');

  const handleAddPackOptionsSubmit = async (event) => {
    event.preventDefault();
    const packOptionPackid = packId;
    const packOptionSpots = document.getElementById('pack_option_spots').value;
    const packOptionDuration = document.getElementById('pack_option_duration').value;
    const packOptionPrice = document.getElementById('pack_option_price').value;
    const packOptionLimitNumber = document.getElementById('pack_option_limit_number').value;
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        'rmpubs-access-token': accessToken,
      };

      const response = await axios.post(
        'https://rm-pubs-lpmp9.ondigitalocean.app/api/pack_options',
        {
          pack_option_packid: packOptionPackid,
          pack_option_spots: packOptionSpots,
          pack_option_duration: packOptionDuration,
          pack_option_price: packOptionPrice,
          pack_option_limit_number: packOptionLimitNumber,
        },
        { headers }
      );

      document.getElementById('pack_option_spots').value = "";
      document.getElementById('pack_option_duration').value = "";
      document.getElementById('pack_option_price').value = "";
      document.getElementById('pack_option_limit_number').value = "";
      alert("options added successfully to the pack!");
      navigate("/packs");
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  return (
    <div className="modify">
      <Sidebar />
      <div className="modifyContainer">
        <Navbar />
        <div className="top">
          <h1>ADD OPTION FOR THE PACK ID : {packId}</h1>
        </div>
        <div className="bottom">
          <div className="formcontent">
            <form onSubmit={handleAddPackOptionsSubmit}>
              <div className="formInput">
                <label htmlFor="pack_option_spots">Pack Option Spots</label>
                <input
                  type="number"
                  id="pack_option_spots"
                  required
                />
              </div>
              <div className="formInput">
                <label htmlFor="pack_option_duration">Pack Option Duration</label>
                <input
                  type="text"
                  id="pack_option_duration"
                  required
                />
              </div>
              <div className="formInput">
                <label htmlFor="pack_option_price">Pack Option Price</label>
                <input
                  type="number"
                  id="pack_option_price"
                  required
                />
              </div>
              <div className="formInput">
                <label htmlFor="pack_option_limit_number">Pack Option Limit Number</label>
                <input
                  type="number"
                  id="pack_option_limit_number"
                  required
                />
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOption;

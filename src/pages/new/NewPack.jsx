import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import useLocalStorageTokenCheck from '../../components/tokenCheck/useLocalStorageCheck';
import useLocalStorageRoleCheck from '../../components/roleCheck/useLocalStorageCheck';
import { Navigate, useNavigate } from 'react-router-dom';

const NewPack = () => {
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCreatedPackId, setNewCreatedPackId] = useState([]);
  const navigate = useNavigate();
  useLocalStorageTokenCheck('accessToken');
  useLocalStorageRoleCheck('role');
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
          'rmpubs-access-token': accessToken,
        };

        const response = await axios.get(
          'https://rm-pubs-lpmp9.ondigitalocean.app/api/client_categories',
          { headers }
        );

        setCategories(response.data.filter((pack) => pack.client_category_status === "Active"));
      } catch (error) {
        console.error(error);
        // Handle error response
      }
    };

    fetchCategories();
  }, []);

  const handleAddPackSubmit = async (event) => {
    event.preventDefault();

    const packName = document.getElementById('pack_name').value;
    const packDescription = document.getElementById('pack_description').value;
    const packClientCategoryId = document.getElementById('pack_client_category_id').value;

    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        'rmpubs-access-token': accessToken,
      };

      const response = await axios.post(
        'https://rm-pubs-lpmp9.ondigitalocean.app/api/packs',
        {
          pack_name: packName,
          pack_client_category_id: packClientCategoryId,
          pack_description: packDescription,
        },
        { headers }
      );

      setSuccess(true);
      setNewCreatedPackId(response.data.pack_id);
      //empty the inputs
      document.getElementById('pack_name').value ="";
      document.getElementById('pack_description').value ="";
      document.getElementById('pack_client_category_id').value ="";
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  const handleAddPackOptionsSubmit = async (event) => {
    event.preventDefault();
    const packOptionPackid = newCreatedPackId;
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
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  return (
    <>
      {success ? (
        <div className="new">
          <Sidebar />
          <div className="newContainer">
            <Navbar />
            <div className="top">
              <h1>ADD NEW PACK OPTIONS</h1>
            </div>
            <div className="bottom">
              <div className="formcontent">
                <form onSubmit={handleAddPackOptionsSubmit}>
                  <div className="formInput">
                    <label htmlFor="pack_option_spots">Pack Option Spots</label>
                    <input type="number" id="pack_option_spots" required/>
                  </div>
                  <div className="formInput">
                    <label htmlFor="pack_option_duration" >Pack Option Duration</label>
                    <input type="text" id="pack_option_duration" required/>
                  </div>
                  <div className="formInput">
                    <label htmlFor="pack_option_price" >Pack Option Price</label>
                    <input type="number" id="pack_option_price" required/>
                  </div>
                  <div className="formInput">
                    <label htmlFor="pack_option_limit_number">Pack Option Limit Number</label>
                    <input type="number" id="pack_option_limit_number" required/>
                  </div>
                  <button type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="new">
          <Sidebar />
          <div className="newContainer">
            <Navbar />
            <div className="top">
              <h1>ADD NEW PACK</h1>
            </div>
            <div className="bottom">
              <div className="formcontent">
                <form onSubmit={handleAddPackSubmit}>
                  <div className="formInput">
                    <label htmlFor="pack_name">Pack Name</label>
                    <input type="text" id="pack_name" placeholder="Pack Classique" required />
                  </div>
                  <div className="formInput">
                    <label htmlFor="pack_description">Pack Description</label>
                    <input type="text" id="pack_description" placeholder="Pack Description" required />
                  </div>
                  <div className="formInput">
                    <label htmlFor="pack_client_category_id">Choose a Category:</label>
                    <select id="pack_client_category_id">
                      {categories.map((category) => (
                        <option key={category.client_category_id} value={category.client_category_id}>
                          {category.client_category_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPack;

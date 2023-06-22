import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './option.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import useLocalStorageTokenCheck from '../../components/tokenCheck/useLocalStorageCheck';
import useLocalStorageRoleCheck from '../../components/roleCheck/useLocalStorageCheck';
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';


const ModifyOption = () => {
  const navigate = useNavigate();
  const { optionId } = useParams();
  const [optionData, setOptionData] = useState({
    pack_option_spots: '',
    pack_option_duration: '',
    pack_option_price: '',
    pack_option_limit_number: '',
  });

  useLocalStorageTokenCheck('accessToken');
  useLocalStorageRoleCheck('role');

  useEffect(() => {
    const fetchOptionData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
          'rmpubs-access-token': accessToken,
        };

        const response = await axios.get(
          `https://rm-pubs-lpmp9.ondigitalocean.app/api/pack_options/${optionId}`,
          { headers }
        );

        const { pack_option_spots, pack_option_duration, pack_option_price, pack_option_limit_number } =
          response.data;

        setOptionData({
          pack_option_spots,
          pack_option_duration,
          pack_option_price,
          pack_option_limit_number,
        });
      } catch (error) {
        console.error(error);
        // Handle error response
      }
    };

    fetchOptionData();
  }, [optionId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setOptionData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        'rmpubs-access-token': accessToken,
      };

      await axios.put(
        `https://rm-pubs-lpmp9.ondigitalocean.app/api/pack_options/${optionId}`,
        optionData,
        { headers }
      );

      setOptionData({
        pack_option_spots: '',
        pack_option_duration: '',
        pack_option_price: '',
        pack_option_limit_number: '',
      });

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
          <h1>MODIFY OPTION</h1>
        </div>
        <div className="bottom">
          <div className="formcontent">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="pack_option_spots">Pack Option Spots</label>
                <input
                  type="number"
                  id="pack_option_spots"
                  value={optionData.pack_option_spots}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label htmlFor="pack_option_duration">Pack Option Duration</label>
                <input
                  type="text"
                  id="pack_option_duration"
                  value={optionData.pack_option_duration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label htmlFor="pack_option_price">Pack Option Price</label>
                <input
                  type="number"
                  id="pack_option_price"
                  value={optionData.pack_option_price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label htmlFor="pack_option_limit_number">Pack Option Limit Number</label>
                <input
                  type="number"
                  id="pack_option_limit_number"
                  value={optionData.pack_option_limit_number}
                  onChange={handleChange}
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

export default ModifyOption;

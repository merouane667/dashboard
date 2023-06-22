import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import useLocalStorageTokenCheck from '../../components/tokenCheck/useLocalStorageCheck';
import useLocalStorageRoleCheck from '../../components/roleCheck/useLocalStorageCheck';
import { Navigate, useNavigate } from 'react-router-dom';

const NewCategory = () => {
  const navigate = useNavigate();
  useLocalStorageTokenCheck('accessToken');
  useLocalStorageRoleCheck('role');

  const handleAddCategorySubmit = async (event) => {
    event.preventDefault();

    const categoryName = document.getElementById('client_category_name').value;
    const categoryStatus = document.getElementById('client_category_status').value;

    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        'rmpubs-access-token': accessToken,
      };

      const response = await axios.post(
        'https://rm-pubs-lpmp9.ondigitalocean.app/api/client_categories',
        {
            client_category_name: categoryName,
            client_category_status: categoryStatus,
        },
        { headers }
      );
      navigate("/categories");

      //empty the inputs
      document.getElementById('client_category_name').value ="";
      document.getElementById('client_category_status').value ="";
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };


  return (

        <div className="new">
          <Sidebar />
          <div className="newContainer">
            <Navbar />
            <div className="top">
              <h1>ADD NEW CATEGORY</h1>
            </div>
            <div className="bottom">
              <div className="formcontent">
                <form onSubmit={handleAddCategorySubmit}>
                  <div className="formInput">
                    <label htmlFor="client_category_name">Category Name</label>
                    <input type="text" id="client_category_name" required/>
                  </div>
                  <div className="formInput">
                    <label htmlFor="client_category_status" >Category Status</label>
                    <input type="text" id="client_category_status" placeholder='Active or Inactive' required/>
                  </div>
                  <button type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    
  );
};

export default NewCategory;

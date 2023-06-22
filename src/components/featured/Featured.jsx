import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "react-circular-progressbar/dist/styles.css";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import axios from 'axios';
import  { useState, useEffect } from 'react';



const Featured = () => {
  const [packs, setPacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'rmpubs-access-token': localStorage.getItem('accessToken')
        };
        const response = await axios.get('https://rm-pubs-lpmp9.ondigitalocean.app/api/packs', { headers });
        const packs = response.data.filter((pack) => pack.pack_status === "Active");
        setPacks(packs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(packs);
  }, [packs]);

  return (
    <div className="featured"> 
        <div className="top">
            <h1 className="title">All Packs</h1>
            <MoreVertIcon fontSize="small" />
        </div>
        <div className="bottom">
          <div className="packs">
            {packs.map((pack) => (
              <Accordion key={pack.pack_id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{pack.pack_name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {pack.pack_description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
        <Link to="/packs" style={{ color: "black" }}>
          <p>Edit Packs</p>
        </Link>
    </div>
  );
};

export default Featured;

import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import { Card } from 'react-bootstrap'; // Import Card component from react-bootstrap
import './VolumeData.css';

const VolumeData = () => {
  const [volumeData, setVolumeData] = useState([]);

  useEffect(() => {
    const fetchVolumeData = async () => {
      try {
        const response = await fetchData('/api/volumes');
        setVolumeData(response); // Assuming the response directly contains the array of volume data
      } catch (error) {
        console.error('Error fetching volume data:', error);
      }
    };

    fetchVolumeData();
  }, []);

  return (
    <div>
      {volumeData.map((pair, index) => (
        <div key={index}>
          <Card>
            <Card.Body>
              
              <Card.Text>
                <ul>
                  <li>24h Volume: {pair.volume && pair.volume.h24}</li>
                  <li>6h Volume: {pair.volume && pair.volume.h6}</li>
                  <li>1h Volume: {pair.volume && pair.volume.h1}</li>
                  <li>5m Volume: {pair.volume && pair.volume.m5}</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default VolumeData;

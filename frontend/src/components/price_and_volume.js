import React, { useState, useEffect } from 'react';
import { fetchData, deleteData } from '../services/api';
import './VolumeData.css';
import { toast } from 'react-toastify';

const CombinedData = () => {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchCombinedData = async () => {
      try {
        const priceResponse = await fetchData("/api/prices");
        const volumeResponse = await fetchData('/api/volumes');
        
        const combinedData = priceResponse.map((price, index) => ({
          ...price,
          volume: volumeResponse[index].volume 
        }));
        
        setCombinedData(combinedData);
      } catch (error) {
        console.error('Error fetching combined data:', error);
      }
    };

    fetchCombinedData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteData(`/api/pairs/${id}`);
      toast.success('Deletion successful');
      
      const updatedData = combinedData.filter(pair => pair._id !== id);
      setCombinedData(updatedData);
    } catch (error) {
      console.error('Error deleting pair:', error);
      toast.error('Error deleting pair');
    }
  };

  return (
    <div className="card-container">
      {combinedData.map((pair) => (
        <div key={pair._id.$oid} className="custom-card">
          <button className="delete-button" onClick={() => handleDelete(pair._id)}>
            <i className="bi bi-x"></i> {/* Bootstrap Icon */}
          </button>
          <div className="card-header">Price and Volume</div>
          <div className="card-body">
            <div><strong>Price Native:</strong> {pair.priceNative}</div>
            <div><strong>Price USD:</strong> {pair.priceUsd}</div>
            <div><strong>Volume (24h):</strong> {pair.volume && pair.volume.h24}</div>
            <div><strong>Volume (6h):</strong> {pair.volume && pair.volume.h6}</div>
            <div><strong>Volume (1h):</strong> {pair.volume && pair.volume.h1}</div>
            <div><strong>Volume (5m):</strong> {pair.volume && pair.volume.m5}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CombinedData;

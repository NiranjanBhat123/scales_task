import React, { useState, useEffect } from 'react';
import { fetchData, deleteData, postData } from '../services/api';
import './VolumeData.css';
import './formData.css';
import { toast } from 'react-toastify';

const CombinedFormAndData = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [formData, setFormData] = useState({
    priceNative: '',
    priceUsd: '',
    volume: {
      h24: '',
      h6: '',
      h1: '',
      m5: '',
    },
  });

  useEffect(() => {
    fetchCombinedData();
  }, []);

  const fetchCombinedData = async () => {
    try {
      const priceResponse = await fetchData("/api/prices");
      const volumeResponse = await fetchData('/api/volumes');
      
      const combinedData = priceResponse.map((price, index) => ({
        ...price,
        volume: volumeResponse[index].volume 
      }));
      
      setCombinedData([...combinedData]); 
    } catch (error) {
      console.error('Error fetching combined data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteData(`/api/pairs/${id}`);
      toast.success('Deletion successful');
      fetchCombinedData(); 
    } catch (error) {
      console.error('Error deleting pair:', error);
      toast.error('Error deleting pair');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVolumeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      volume: {
        ...prevFormData.volume,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData('/api/pairs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response) {
        console.log('Data inserted successfully');
        toast.success('Data inserted successfully'); 
        setFormData({
          priceNative: '',
          priceUsd: '',
          volume: {
            h24: '',
            h6: '',
            h1: '',
            m5: '',
          },
        });
        fetchCombinedData();
      } else {
        console.error('Failed to insert data:', response.statusText);
        toast.error('Failed to insert data');
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Network error');
    }
  };

  return (
    <div>
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
      <div className="form-container">
        <h2>Form Data Input</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Price Native:
            <input type="text" name="priceNative" value={formData.priceNative} onChange={handleChange} />
          </label>
          <label>
            Price USD:
            <input type="text" name="priceUsd" value={formData.priceUsd} onChange={handleChange} />
          </label>
          <label>
            Volume (h24):
            <input type="text" name="h24" value={formData.volume.h24} onChange={handleVolumeChange} />
          </label>
          <label>
            Volume (h6):
            <input type="text" name="h6" value={formData.volume.h6} onChange={handleVolumeChange} />
          </label>
          <label>
            Volume (h1):
            <input type="text" name="h1" value={formData.volume.h1} onChange={handleVolumeChange} />
          </label>
          <label>
            Volume (m5):
            <input type="text" name="m5" value={formData.volume.m5} onChange={handleVolumeChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CombinedFormAndData;

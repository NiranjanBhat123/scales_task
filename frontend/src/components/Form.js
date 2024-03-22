import React, { useState } from 'react';
import './formData.css';
import { fetchData } from '../services/api'; // Assuming fetchData function is correctly implemented
import { toast } from 'react-toastify'; // Assuming you have react-toastify installed

const FormDataInput = () => {
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
        toast.success('Data inserted successfully'); // Show success toast
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
      } else {
        console.error('Failed to insert data:', response.statusText);
        toast.error('Failed to insert data'); // Show error toast
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Network error'); // Show network error toast
    }
  };
  

  return (
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
  );
};

export default FormDataInput;

import React, { useState, useEffect } from 'react';
import './App.css';
import CombinedFormAndData from './components/main_component'; 
import { fetchData } from './services/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        
        const priceResponse = await fetchData('/api/prices');
        const volumeResponse = await fetchData('/api/volumes');
        
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchDataFromAPI();
  }, []);

  return (
    <div className="App">
      <ToastContainer/>
      <header className="App-header">
        <h1>Price and Volume Data</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <CombinedFormAndData />
        )}
      </header>
    </div>
  );
}

export default App;



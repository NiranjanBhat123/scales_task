// // import React, { useState, useEffect } from 'react';
// // import './App.css';
// // import Pricedata from './components/PriceData';
// // import Volumedata from './components/VolumeData';
// // import { fetchData } from './services/api'; 
// // import FormDataInput from './components/Form';
// // import { ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // function App() {
// //   const [priceData, setPriceData] = useState([]);
// //   const [volumeData, setVolumeData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchDataFromAPI = async () => {
// //       try {
// //         const priceResponse = await fetchData('/api/prices');
// //         const volumeResponse = await fetchData('/api/volumes');
// //         setPriceData(priceResponse);
// //         setVolumeData(volumeResponse);
// //         setLoading(false);
// //       } catch (error) {
// //         setError('Error fetching data');
// //         setLoading(false);
// //       }
// //     };

// //     fetchDataFromAPI();
// //   }, []);

// //   return (
// //     <div className="App">
// //       <ToastContainer/>
// //       <header className="App-header">
      
// //         <h1>Price Data</h1>
// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : error ? (
// //           <p>{error}</p>
// //         ) : (
// //           <Pricedata data={priceData} />
// //         )}
// //         <h1>Volume Data</h1>
// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : error ? (
// //           <p>{error}</p>
// //         ) : (
// //           <Volumedata data={volumeData} />
// //         )}
// //          <FormDataInput />
// //       </header>
     
// //     </div>
// //   );
// // }

// // export default App;



// import React, { useState, useEffect } from 'react';
// import './App.css';
// import CombinedData from './components/price_and_volume'; // Import the CombinedData component
// import { fetchData } from './services/api'; 
// import FormDataInput from './components/Form';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDataFromAPI = async () => {
//       try {
//         // Fetch both price and volume data
//         const priceResponse = await fetchData('/api/prices');
//         const volumeResponse = await fetchData('/api/volumes');
        
//         // No need to setPriceData and setVolumeData here, as we're using CombinedData component
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching data');
//         setLoading(false);
//       }
//     };

//     fetchDataFromAPI();
//   }, []);

//   return (
//     <div className="App">
//     <ToastContainer/>
//     <header className="App-header">
//       <h1>Price and Volume Data</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <CombinedData />
//       )}
//       <FormDataInput />
//     </header>
//   </div>
  

//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import './App.css';
import CombinedFormAndData from './components/main_component'; // Import the CombinedFormAndData component
import { fetchData } from './services/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        // Fetch both price and volume data
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



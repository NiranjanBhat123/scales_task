import React, { useState, useEffect } from "react";
import { fetchData } from "../services/api";
import { Card } from "react-bootstrap";


const PriceData = () => {
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetchData("/api/prices");
        setPriceData(response);
      } catch (error) {
        console.error("Error fetching price data:", error);
      }
    };

    fetchPriceData();
  }, []);

  return (
    <div>
      
      {priceData.map((pair, index) => (
        <div key={index}>
          <Card>
            <Card.Body>
              <Card.Text>
                <strong>Price Native:</strong> {pair.priceNative}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Text>
                <strong>Price USD:</strong> {pair.priceUsd}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default PriceData;

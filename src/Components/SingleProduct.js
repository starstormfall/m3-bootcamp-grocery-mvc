import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SingleProduct(props) {
  const [product, setProduct] = useState({});

  const getProduct = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/products/${props.id}`
    );
    setProduct(response.data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <h1>Single</h1>
      <h2>{product.name}</h2>
      <h3>{product.price}</h3>
      <button onClick={() => props.toggle(product)}>Go Back</button>
    </>
  );
}

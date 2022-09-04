import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SingleProduct(props) {
  const [product, setProduct] = useState({});
  const [productPrice, setProductPrice] = useState(product.name);
  const [productName, setProductName] = useState(product.price);
  const [editModeOn, setEditModeOn] = useState(false);

  const getProduct = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/products/${props.id}`
    );
    setProduct(response.data);
    setProductName(response.data.name);
    setProductPrice(response.data.price);
  };

  useEffect(() => {
    getProduct();
  }, []);

  // const handleSubmitChanges = async (name, price) => {
  //   let updatedProduct = {
  //     name,
  //     price,
  //   };

  //   let response = await axios.put(
  //     `${process.env.REACT_APP_API_SERVER}/products/${props.id}`,
  //     updatedProduct
  //   );
  //   console.log(response.data.name);
  //   console.log(response.data.price);
  //   setProductName(response.data.name);
  //   setProductPrice(response.data.price);
  //   setEditModeOn(false);
  // };

  const handleResetChanges = () => {
    setProductName(product.name);
    setProductPrice(product.price);
  };

  const itemEntry = (
    <div>
      <label>
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Product Price:
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </label>
      <br />
      <button
        onClick={() => {
          props.handleUpdateProduct(productName, productPrice);
          setProductName(productName);
          setProductPrice(productPrice);
          setEditModeOn(false);
        }}
      >
        Submit Changes
      </button>
      <button onClick={() => handleResetChanges()}>Reset Changes</button>
    </div>
  );

  return (
    <>
      <h1>Single</h1>
      <button onClick={() => setEditModeOn(true)}>Edit Product</button>

      {editModeOn ? (
        itemEntry
      ) : (
        <>
          <h2>{productName}</h2>
          <h3>{productPrice}</h3>
        </>
      )}

      <button onClick={() => props.toggle(product)}>Go Back</button>
    </>
  );
}

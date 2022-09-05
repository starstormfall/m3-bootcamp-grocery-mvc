import logo from "./logo.svg";
import "./App.css";
import React from "react";
import AddProduct from "./Components/AddProduct";
import SingleProduct from "./Components/SingleProduct";
import axios from "axios";
import { useState, useEffect } from "react";

export default function App() {
  const [openSingle, setOpenSingle] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [currentIndex, setCurrentIndex] = useState();

  const getInitialData = async () => {
    let initialAPICall = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/products`
    );
    setProducts(initialAPICall.data);
  };

  useEffect(() => {
    getInitialData();
    console.log("does this run?");
  }, []);

  const toggleView = (product) => {
    setOpenSingle(!openSingle);
    setCurrentId(product.id);
  };

  const createNewProduct = async (name, price) => {
    let product = {
      name,
      price,
    };
    let response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/products`,
      product
    );
    let newArray = [...products];
    newArray.push(response.data);
    setProducts(newArray);
  };

  const handleDeleteItem = async (index, productId, product) => {
    let response = await axios.delete(
      `${process.env.REACT_APP_API_SERVER}/products/${productId}`
    );
    console.log(response);
    setProducts(response.data);
    // let newArray = [...products];
    // newArray.splice(index, 1);
    // console.log(newArray);
    // setProducts(newArray);

    console.log(index, productId, product);
  };

  const handleUpdateProduct = async (name, price) => {
    let updatedProduct = {
      name,
      price,
    };

    let response = await axios.put(
      `${process.env.REACT_APP_API_SERVER}/products/${currentId}`,
      updatedProduct
    );
    console.log(response.data.name);
    console.log(response.data.price);
    let newArray = [...products];
    newArray[currentIndex].name = name;
    newArray[currentIndex].price = price;
    setProducts(newArray);
  };

  return (
    <div className="App">
      <header className="App-header">
        {openSingle ? (
          <div>
            <SingleProduct
              toggle={toggleView}
              id={currentId}
              handleUpdateProduct={handleUpdateProduct}
            />
          </div>
        ) : (
          <div>
            <img src={logo} className="App-logo" alt="logo" />
            <h3>Grocery Store</h3>
            <h6>Products</h6>
            <div className="products-container">
              {products && products.length > 0 ? (
                products.map((product, index) => (
                  <div
                    key={product.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      className="product"
                      onClick={() => {
                        toggleView(product);
                        setCurrentIndex(index);
                      }}
                    >
                      <h4>
                        {product.name} : ${product.price}
                      </h4>
                    </div>
                    <button
                      onClick={() =>
                        handleDeleteItem(index, product.id, product)
                      }
                    >
                      Delete Item
                    </button>
                  </div>
                ))
              ) : (
                <p>Failure</p>
              )}
            </div>
            <AddProduct addProduct={createNewProduct} />
          </div>
        )}
      </header>
    </div>
  );
}

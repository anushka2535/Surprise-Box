import axios from "axios";
import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import freeD from "../../assets/freeD.png";
import offers from "../../assets/offers.png";
import security from "../../assets/security.png";
import retrun from "../../assets/retrun.png";
import flower1 from "../../assets/flower1.jpg";
import flower2 from "../../assets/flower2.jpg";

import chocolate1 from "../../assets/chocolate1.jpg";
import chocolat2 from "../../assets/chocolate2.jpg";
import chocolate3 from "../../assets/chocolate3.jpg";
import teddy from "../../assets/teddy.jpg";
import teddy2 from "../../assets/teddy2.jpg";
import show2 from "../../assets/show2.jpg";
import show1 from "../../assets/show1.jpg";
import show3 from "../../assets/show3.jpg";

import "../Home/Home";
import "./Shop.css";
import "../About/About";

function Shop({ wishlist, setWishlist, cart, setCart }) {

  const API = "https://surprise-box.onrender.com";

  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const handleSearch = async (value, apply = false) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setSuggestions([]);
      setDisplayProducts(products);
      return;
    }

    try {
      const res = await axios.get(`${API}/product/search?q=${value}`);

      setSuggestions(res.data);

      // ONLY apply to main product grid when apply = true
      if (apply) {
        setDisplayProducts(res.data);
        setSuggestions([]);
      }

    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm, true);
  };
  useEffect(() => {
    fetch(`${API}/product`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProducts(data);
        setDisplayProducts(data);
      })
      .catch(err => console.log(err));
  }, []);


  const addToWishlist = async (product) => {

    // Frontend state (your old code)
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }



  };
  const addToCart = async (product) => {

    // Frontend state (your old code)
    if (!cart.find((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }

    // Backend save
    try {

      const response = await fetch(`${API}/cart/add`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({


          orderId: "ORD" + Date.now(),

          productName: product.name,

          price: product.price,

          status: "Ordered"
        })
      });

      const data = await response.json();

      console.log(data);

    } catch (error) {

      console.log(error);
      alert(error.message);
    }
  };

  return (
    <>
      <div >
        <Navbar expand="lg" className='nav'>
          <Container fluid>
            <Navbar.Brand href="#">My Gift Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link as={NavLink} to="/Shop">Home</Nav.Link>
                <Nav.Link as={NavLink} to="#product">Product</Nav.Link>
                <Nav.Link as={NavLink} to="/Review">Review</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/Contact">Contact</Nav.Link>
              </Nav>
              <div className="icons">
                <Link to="/Wishlist"><i className="bi bi-heart-fill"></i></Link>
                <Link to="/Cart"><i className="bi bi-cart-fill"></i></Link>
                <Link to="/Account"><i className="bi bi-person-fill"></i></Link>
              </div>
            </Navbar.Collapse>

          </Container>

        </Navbar>
      </div >

      <div className="search">
        <Form className="d-flex" onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button
            variant="outline-success"
            type="submit"
          >
            Search
          </Button>
        </Form>

        {/* ADD THIS PART ONLY */}
        {suggestions.length > 0 && (
          <div className="suggestion-box">
            {suggestions.map((product) => (
              <div
                key={product._id}
                className="suggestion-item"
                onClick={() => {
                  setSearchTerm(product.name);
                  setSuggestions([]);
                }}
              >
                {product.name}
              </div>
            ))}
          </div>
        )}
      </div>


      {/* product Section */}

      <div className="product " id='product'>
        <h1 className="heading">Current <span>Products</span></h1>
        <div className="box-cont">
          {displayProducts.map((p) => (
            <div className="box" key={p._id}>
              <span className="discount">new</span>
              <div className="image">
                <img src={p.image} alt={p.name} />
                <div className="icon">
                  <button onClick={() => addToWishlist(p)}>
                    <i className="bi bi-heart-fill"></i>
                  </button>
                  <button className="cart-btn" onClick={() => addToCart(p)}>Add to cart</button>

                  <button><i className="bi bi-share-fill"></i></button>
                </div>
              </div>
              <div className="content">
                <h4>{p.name}</h4>
                <div className="price">
                  Rs. {p.price}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Icon Section */}

      <section className="icons-conta">

        <div className="icons">

          <img src={freeD} alt="free" style={{ width: "80px", height: "80px" }}></img>

          <div className="info">
            <h4>Free Delivery</h4>
            <span>on all orders</span>
          </div>
        </div>


        <div className="icons">

          <img src={retrun} alt="return" style={{ width: "80px", height: "80px" }}></img>

          <div className="info">
            <h4>10 Days retruns</h4>
            <span>moneyback garentee</span>
          </div>
        </div>

        <div className="icons">

          <img src={offers} alt="gift" style={{ width: "80px", height: "80px" }}></img>

          <div className="info">
            <h4>Offer & gift</h4>
            <span>on all orders</span>
          </div>
        </div>

        <div className="icons">

          <img src={security} alt="payment" style={{ width: "80px", height: "80px" }}></img>

          <div className="info">
            <h4>Secure payment</h4>
            <span>protected by paypal</span>
          </div>
        </div>
      </section>


    </>
  );
}

export default Shop;




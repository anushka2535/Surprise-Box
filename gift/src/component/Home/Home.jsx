import axios from "axios";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



import cr2 from "../../assets/cr2.jpeg";
import cr3 from "../../assets/Cr3.jpeg";
import cr4 from "../../assets/Cr4.jpeg";
import cr5 from "../../assets/Cr5.jpeg";
import cr6 from "../../assets/Cr6.jpeg";

import "./Home.css";

function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const searchProducts = async (value) => {
    setSearch(value);

    if (!value) {
      setProducts([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/product/search?q=${value}`
      );

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <>
      {/* Header */}
      <header className="navbar navbar-expand-lg  border-bottom sticky-top fig">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            <span className="logo-circle">S</span>

            SurpriseBox</a>
          <a className="btn btn-dark get-started-btn" href="Login">Get Started</a>

        </div>
      </header>

      {/* Hero Section */}
      <section className="py-5 bg-white">
        <div className="container hero-col">
          <div className="row align-items-center">
            <div className="col-md-6">
              <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700">Gifts made simple, beautiful, and fast</span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Find the perfect gift in minutes, not hours.</h1>
              <p className="lead">
                Shop curated gifts for every occasion,personalize with a thoughtful touch, and check out in a few clicks.Delight someone special with packaging that feels as good as the gift itself.
              </p>
              <a href="Login" className="btn btn-lg btn-dark mb-3 get-started-btn" >Shop Gifts</a>
              <ul className="list-unstyled">
                <li>✔ Curated for every occasion</li>
                <li>✔ Fast, secure checkout</li>
                <li>✔ Gift-ready presentation</li>
              </ul>
            </div>
            <div className="col-md-6 text-center">
              <div className="position-relative">
                <img src={cr2} alt="Wrapped gifts" className="img-fluid rounded shadow" style={{ width: "500px", height: "500px" }} />
                <div className="overlay-box bg-white shadow-sm p-3 rounded position-absolute bottom-0 start-0 m-3">
                  <p className="fw-bold mb-0">Trusted by thoughtful shoppers</p>
                  <small>Beautiful gifts, delivered with care.</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold">Everything you need to gift well</h2>
          <p className="text-muted mb-5">
            Explore smart shopping tools that make choosing, personalizing, and sending a gift feel effortless.
          </p>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm" style={{ backgroundColor: "rgb(242, 230, 237)" }}>
                <div className="card-body">
                  <img src={cr4} alt="" className="rounded" style={{ width: "300px", height: "400px" }} />
                  <h5 className="card-title fw-bold">Curated collections</h5>
                  <p className="card-text">
                    Shop by occasion, recipient, budget, or style to quickly narrow down the perfect match.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm" style={{ backgroundColor: "rgb(242, 230, 237)" }}>
                <div className="card-body">
                  <img src={cr5} alt="" className="rounded" style={{ width: "300px", height: "400px" }} />
                  <h5 className="card-title fw-bold">Personal touch</h5>
                  <p className="card-text">
                    Add a message, select gift wrap, and make every order feel unique and memorable.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm" style={{ backgroundColor: "rgb(242, 230, 237)" }}>
                <div className="card-body">
                  <img src={cr6} alt="" className="rounded" style={{ width: "300px", height: "400px" }} />
                  <h5 className="card-title fw-bold">Fast checkout</h5>
                  <p className="card-text">
                    Move from browsing to buying in minutes with a secure, streamlined checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Frequently asked questions</h2>
            <p className="text-muted">
              Quick answers to the most common questions about gifting, delivery, and checkout.
            </p>
          </div>

          <div className="accordion shadow-sm rounded" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq1">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                  Can I personalize each gift?
                </button>
              </h2>
              <div id="collapse1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Yes. You can add a message, select gift wrap options, and customize the experience so it feels thoughtful and unique.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="faq2">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                  How fast is delivery?
                </button>
              </h2>
              <div id="collapse2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Delivery times depend on the product and location, with express shipping available for many items at checkout.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="faq3">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                  What is your return policy?
                </button>
              </h2>
              <div id="collapse3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  If a gift arrives damaged or there is an issue with your order, contact support and we’ll help resolve it quickly.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="faq4">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4">
                  Which payment methods do you accept?
                </button>
              </h2>
              <div id="collapse4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  We accept major credit cards and other common online payment methods for a smooth checkout experience.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="faq5">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5">
                  Can I order gifts in bulk?
                </button>
              </h2>
              <div id="collapse5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Yes. Our corporate gifting option is designed for bulk orders, team celebrations, client appreciation, and events.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-dark text-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5 className="fw-bold">Giftly</h5>
              <p>
                A gifting ecommerce brand built to help customers discover, personalize, and send memorable presents with ease.
              </p>
              <p>Email: chandanikumari2742005@gmail.com</p>
            </div>
            <div className="col-md-4">
              <h6 className="fw-bold">Product</h6>
              <ul className="list-unstyled">
                <li>Curated gifts</li>
                <li>Personalization</li>
                <li>Plans</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="fw-bold">Resources</h6>
              <ul className="list-unstyled">
                <li>FAQ</li>
                <li>Gift guide</li>
                <li>Shipping</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-4">
            <small>© 2026 Giftly. All rights reserved.</small>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
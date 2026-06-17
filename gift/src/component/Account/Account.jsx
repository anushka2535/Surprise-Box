import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";

function Account() {

  const navigate = useNavigate();

  const [showAddressBox, setShowAddressBox] = useState(false);

  const [address, setAddress] = useState({
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    orders: []
  });

  useEffect(() => {

    const userId = localStorage.getItem("userId");

    if (!userId) {
      return;
    }

    fetch(`http://localhost:5000/${userId}`)

      .then((res) => res.json())

      .then((data) => {



        console.log(data);
        setCustomerData((prev) => ({
          ...prev,
          name: data.user.name,
          email: data.user.email
        }));

        const userId = localStorage.getItem("userId");

        fetch(`http://localhost:5000/cart/user/${userId}`)
          .then((res) => res.json())
          .then((orders) => {
            setCustomerData((prev) => ({
              ...prev,
              orders: orders
            }));
          });

      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const openAddressBox = () => {
    setShowAddressBox(true);
  };

  const handleAddressSubmit = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/address/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            ...address
          })
        }
      );

      const data = await response.json();

      if (data.success) {

        alert("Address Saved Successfully");

        setShowAddressBox(false);

        setAddress({
          address: "",
          landmark: "",
          city: "",
          state: "",
          pincode: ""
        });

      }

    } catch (error) {

      console.log(error);
      alert("Failed to save address");

    }

  };


  return (

    <div className="account-page">

      <div className="account-header">

        <button
          className="back-btn"
          onClick={() => navigate("/Shop")}
        >
          ← Back
        </button>

        <h2 className="heading">
          My <span>Account</span>
        </h2>

      </div>

      <div className="profile-info">

        <p>
          <strong>Name:</strong> {customerData.name}
        </p>

        <p>
          <strong>Email:</strong> {customerData.email}
        </p>

      </div>

      <button
        className="address-btn"
        onClick={openAddressBox}
      >
        Add Address
      </button>

      {showAddressBox && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h3 className="title">Add Address</h3>

            <input
              name="address"
              placeholder="Address"
              value={address.address}
              onChange={handleAddressChange}
            />

            <input
              name="landmark"
              placeholder="Landmark"
              value={address.landmark}
              onChange={handleAddressChange}
            />

            <input
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleAddressChange}
            />

            <input
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleAddressChange}
            />

            <input
              name="pincode"
              placeholder="Pincode"
              value={address.pincode}
              onChange={handleAddressChange}
            />


            <div className="modal-buttons">

              <button onClick={handleAddressSubmit} style={{ backgroundColor: '#ff6699', color: 'white' }}>
                Save
              </button>

              <button onClick={() => setShowAddressBox(false)} style={{ backgroundColor: 'grey', color: 'white' }}>
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}


      <h3 className="orders-title">My Orders</h3>

      <div className="orders-list">

        {customerData.orders.map((order) => (

          <div
            key={order._id}
            className="order-item"
          >

            <p>
              <strong>Order ID:</strong> {order.orderId}
            </p>

            <p>
              <strong>Product:</strong> {order.productName}
            </p>

            <p>
              <strong>Price:</strong> Rs. {order.price}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <button
              className="track-btn"
              onClick={() => navigate(`/track/${order.orderId}`)}
            >
              Track Order
            </button>




          </div>

        ))}

      </div>

    </div>

  );
}

export default Account;
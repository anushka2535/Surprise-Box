import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TrackOrder.css";

function TrackOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      console.log("TRACKING ORDER ID:", orderId);

      try {
        const res = await fetch(
          `https://surprise-box.onrender.com/cart/order/${orderId}`
        );

        console.log("STATUS:", res.status);

        const data = await res.json();

        console.log("ORDER DATA:", data);

        setOrder(data);
      } catch (err) {
        console.log("FETCH ERROR:", err);
      }
    };

    fetchOrder();

    const interval = setInterval(fetchOrder, 3000);

    return () => clearInterval(interval);
  }, [orderId]);

  const steps = [
    "Ordered",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ];

  return (
    <div className="track-order">
      <button className="back-btn" onClick={() => navigate("/Account")}>
        ← Back
      </button>

      <h2>Tracking Order: {orderId}</h2>

      {order ? (
        <>
          <p><strong>Product:</strong> {order.productName}</p>
          <p><strong>Status:</strong> {order.status}</p>

          <div className="progress-container">
            <div className="progress-container">

              <div className={`progress-step ${steps.indexOf(order.status) >= 0 ? "active" : ""}`}>
                <span>Ordered</span>
                <div className={`progress-line ${steps.indexOf(order.status) > 0 ? "active" : ""}`}></div>
              </div>

              <div className={`progress-step ${steps.indexOf(order.status) >= 1 ? "active" : ""}`}>
                <span>Confirmed</span>
                <div className={`progress-line ${steps.indexOf(order.status) > 1 ? "active" : ""}`}></div>
              </div>

              <div className={`progress-step ${steps.indexOf(order.status) >= 2 ? "active" : ""}`}>
                <span>Shipped</span>
                <div className={`progress-line ${steps.indexOf(order.status) > 2 ? "active" : ""}`}></div>
              </div>

              <div className={`progress-step ${steps.indexOf(order.status) >= 3 ? "active" : ""}`}>
                <span>Out for Delivery</span>
                <div className={`progress-line ${steps.indexOf(order.status) > 3 ? "active" : ""}`}></div>
              </div>

              <div className={`progress-step ${steps.indexOf(order.status) === 4 ? "active" : ""}`}>
                <span>Delivered</span>
              </div>

            </div>
          </div>
        </>
      ) : (
        <p>Order not found.</p>
      )}
    </div>
  );
}

export default TrackOrder;
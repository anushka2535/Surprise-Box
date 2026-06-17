import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Notifications() {

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);

   

  

    useEffect(() => {

    fetch("http://localhost:5000/cart/orders")
        .then(res => res.json())
        .then(data => setNotifications(data))
        .catch(err => console.log(err));

}, []);
    return (
        <Container className="mt-4">

            <Button
                className="mb-3"
                onClick={() => navigate("/vendorDashboard")}
            >
                ← Back
            </Button>

            <h3>Notifications</h3>

            {notifications.length === 0 ? (
                <p>No Notifications</p>
            ) : (
               
                notifications.map((order) => (
    <Card key={order._id} className="mb-3">
        <Card.Body>

            <h6>
                🔔 New Order Received
            </h6>

            <p>
                Product: {order.productName}
            </p>

            <p>
                Order ID: {order.orderId}
            </p>

            <p>
                Status: {order.status}
            </p>

        </Card.Body>
    </Card>
))
            )}

        </Container>
    );
}

export default Notifications;
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./Cart.css";

function Cart({ cart, setCart }) {

    const navigate = useNavigate();
    const [showPayment, setShowPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("COD");

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const handleProceed = async () => {

        try {

            const userId = localStorage.getItem("userId");

            for (const item of cart) {

                const response = await fetch(
                    "https://surprise-box.onrender.com/cart/add",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            userId: userId,
                            orderId: "ORD" + Date.now(),
                            productName: item.name,
                            price: item.price,
                            status: "Pending",
                            paymentMethod: paymentMethod
                        })
                    }
                );

                const data = await response.json();

                const notifications =
                    JSON.parse(localStorage.getItem("notifications")) || [];

                notifications.push({
                    id: Date.now(),
                    message: `New order received: ${item.name}`,
                    time: new Date().toLocaleString()
                });

                localStorage.setItem(
                    "notifications",
                    JSON.stringify(notifications)
                );

                console.log(data);
            }


            alert("Order Confirmed! 🎉 Thank you for shopping with us");

            setCart([]);

        } catch (error) {

            console.log(error);

            alert("Failed to place order");

        }
    };
    return (

        <div className="cart">
            <div className="cart-header">
                <button className="back-btn" onClick={() => navigate("/Shop")}>
                    ←Back
                </button>
                <h1 className="heading">My <span>Cart</span></h1>
            </div>
            <div className="cart-page">

                {cart.length === 0 ? (
                    <p>No items in cart.</p>
                ) : (
                    <>
                        <div className="cart-items">
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} />
                                    <div className="cart-info">
                                        <h4>{item.name}</h4>
                                        <p>
                                            Rs. {item.price} <span>Rs. {item.oldPrice}</span>
                                        </p>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h3>Total: Rs. {totalPrice}</h3>
                            <Button
                                variant="success"
                                onClick={() => setShowPayment(true)}
                            >
                                Proceed
                            </Button>
                        </div>
                    </>
                )}
            </div>
            {showPayment && (
                <div className="modal-overlay">
                    <div className="modal-box">

                        <h3>Select Payment Method</h3>

                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="COD"
                                    checked={paymentMethod === "COD"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />
                                Cash on Delivery
                            </label>
                        </div>

                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="UPI"
                                    checked={paymentMethod === "UPI"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />
                                UPI
                            </label>
                        </div>

                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="Card"
                                    checked={paymentMethod === "Card"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />
                                Credit / Debit Card
                            </label>
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <Button
                                variant="success"
                                onClick={async () => {
                                    const userId = localStorage.getItem("userId");

                                    const res = await fetch(`https://surprise-box.onrender.com/address/${userId}`);
                                    const address = await res.json();

                                    if (!address || !address.address || Object.keys(address).length === 0) {
                                        alert("Please add your address before placing order");
                                        navigate("/account");
                                        return;
                                    }


                                    await handleProceed();
                                    setShowPayment(false);
                                }}
                            >
                                Confirm Order
                            </Button>

                            <Button
                                variant="secondary"
                                style={{ marginLeft: "10px" }}
                                onClick={() => setShowPayment(false)}
                            >
                                Cancel
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;


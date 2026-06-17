import React from "react";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";


function Wishlist({ wishlist, setWishlist }) {
  const navigate = useNavigate();

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="wish">
      <div className="wish-header">
        <button className="back-btn" onClick={() => navigate("/Shop")}>
          ←Back
        </button>
        <h2 className="heading">My <span>Wishlist</span></h2>
      </div>

      <div className="wishlist-items">
        {wishlist.length === 0 ? (
          <p>No items in wishlist yet.</p>
        ) : (
          wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>Rs. {item.price} <span>Rs. {item.oldPrice}</span></p>
              <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;

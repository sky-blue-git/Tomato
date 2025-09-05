import React from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

import food_1 from '../../assets/food_1.png';
import food_2 from '../../assets/food_2.png';
import food_3 from '../../assets/food_3.png';
import food_4 from '../../assets/food_4.png';
import food_5 from '../../assets/food_5.png';
import food_6 from '../../assets/food_6.png';
import food_7 from '../../assets/food_7.png';
import food_8 from '../../assets/food_8.png';
import food_9 from '../../assets/food_9.png';
import food_10 from '../../assets/food_10.png';
import food_11 from '../../assets/food_11.png';
import food_12 from '../../assets/food_12.png';
import food_13 from '../../assets/food_13.png';
import food_14 from '../../assets/food_14.png';
import food_15 from '../../assets/food_15.png';
import food_16 from '../../assets/food_16.png';
import food_17 from '../../assets/food_17.png';
import food_18 from '../../assets/food_18.png';
import food_19 from '../../assets/food_19.png';
import food_20 from '../../assets/food_20.png';
import food_21 from '../../assets/food_21.png';
import food_22 from '../../assets/food_22.png';
import food_23 from '../../assets/food_23.png';
import food_24 from '../../assets/food_24.png';
import food_25 from '../../assets/food_25.png';
import food_26 from '../../assets/food_26.png';
import food_27 from '../../assets/food_27.png';
import food_28 from '../../assets/food_28.png';
import food_29 from '../../assets/food_29.png';
import food_30 from '../../assets/food_30.png';
import food_31 from '../../assets/food_31.png';
import food_32 from '../../assets/food_32.png';

// Create an image map
const foodImages = {
  food_1: food_1,
  food_2: food_2,
  food_3: food_3,
  food_4: food_4,
  food_5: food_5,
  food_6: food_6,
  food_7: food_7,
  food_8: food_8,
  food_9: food_9,
  food_10: food_10,
  food_11: food_11,
  food_12: food_12,
  food_13: food_13,
  food_14: food_14,
  food_15: food_15,
  food_16: food_16,
  food_17: food_17,
  food_18: food_18,
  food_19: food_19,
  food_20: food_20,
  food_21: food_21,
  food_22: food_22,
  food_23: food_23,
  food_24: food_24,
  food_25: food_25,
  food_26: food_26,
  food_27: food_27,
  food_28: food_28,
  food_29: food_29,
  food_30: food_30,
  food_31: food_31,
  food_32: food_32
};


const Cart = () => {
  const {
    cartItems,
    food_list = [],
    removeFromCart,
    getTotalCartAmount,
  } = React.useContext(StoreContext) || {};

  const navigate = useNavigate();

  // Remove all the image loading states and effects
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {Array.isArray(food_list) &&
          food_list.map((item) => {
            const quantity = cartItems?.[item?._id] || 0;
            if (quantity > 0) {
              return (
                <div key={item?._id || Math.random()}>
                  <div className="cart-items-title cart-items-item">
                    <div className="cart-item-image-container">
                      <img
                        src={foodImages[item?.image] || ''}
                        alt="Food Item"
                        onError={(e) => {
                          e.target.src = ''; // Clear the broken image
                          e.target.style.display = 'none'; // Hide if image fails
                        }}
                      />
                    </div>
                    <p>{item?.name || "Unnamed Item"}</p>
                    <p>${item?.price ?? "N/A"}</p>
                    <p>{quantity}</p>
                    <p>${quantity * (item?.price ?? 0)}</p>
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart?.(item?._id)}
                    >
                      Remove
                    </button>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}
      </div>
      {/* Rest of your cart component remains exactly the same */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount?.() ?? 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount?.() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>
                $
                {getTotalCartAmount?.() === 0
                  ? 0
                  : (getTotalCartAmount?.() ?? 0) + 2}
              </b>
            </div>
          </div>
          <button onClick={() => navigate?.("/order")}>
            Proceed to CheckOut
          </button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code, enter it here..</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
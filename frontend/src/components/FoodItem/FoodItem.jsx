import React from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

// Import all food images at the top
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

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = React.useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        {/* Use the image map */}
        <img 
          className='food-item-image' 
          src={foodImages[image]} 
          alt={name}
          onError={(e) => {
            e.target.src = assets.placeholder;
          }}
        />

        {!cartItems?.[id] ? (
          <img
            src={assets.add_icon_white}
            alt="Add to cart"
            className="add"
            onClick={() => addToCart?.(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt="Remove item"
              onClick={() => removeFromCart?.(id)}
            />
            <p>{cartItems?.[id]}</p>
            <img
              src={assets.add_icon_green}
              alt="Add more"
              onClick={() => addToCart?.(id)}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
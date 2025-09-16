import React from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, searchResults }) => {
  const { food_list } = React.useContext(StoreContext);
  
  // Use searchResults if provided, otherwise filter by category
  const displayItems = searchResults || food_list;

  return (
    <div className="food-display" id="food-display">
      <h2>{searchResults ? "Search Results" : "Top Dishes near you"}</h2>
      <div className="food-display-list">
        {displayItems.length > 0 ? (
          displayItems.map((item, index) => {
            if (searchResults || category === "All" || item.category === category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
            return null;
          })
        ) : (
          <div className="no-results">
            <p>No items found. Try a different search term or category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;

import React, { createContext, useState } from "react";

export const GroceryContext = createContext();

const GroceryProvider = (props) => {
  const [list, setListItem] = useState([
    {
      dessert: "Lassi",
      nutritionInfo: {
        calories: 12,
        fat: 12,
        carb: 12,
        protein: 12
      }
    }
  ]);

  return (
    <GroceryContext.Provider value={[list, setListItem]}>
      {props.children}
    </GroceryContext.Provider>
  );
};

export default GroceryProvider;

import React, { createContext, useState, useReducer } from "react";
import { ApolloProvider, useQuery, useLazyQuery, gql } from "@apollo/client";

export const GroceryContext = createContext();

const query = gql`
  query {
    desserts {
      dessert
      nutritionInfo {
        calories
        fat
        carb
        protein
      }
    }
  }
`;

const initialState = {
  dessert: [
    {
      dessert: "Lassi",
      nutritionInfo: {
        calories: 12,
        fat: 12,
        carb: 12,
        protein: 12,
      },
    },
    {
      dessert: "Passi",
      nutritionInfo: {
        calories: 12,
        fat: 12,
        carb: 12,
        protein: 12,
      },
    },
  ],

  isModal: false,
};

const reducer = (state, action) => {
  console.log("*** Calling Action Add Item**", action.payload);
  console.log("Calling Action Item", ...state.dessert);
  switch (action.type) {
    case "ADD_ITEM":
      return { dessert: [...state.dessert, action.payload] };
    case "DELETE_MODAL":
      return !state.isModal;
    default:
      return state;
  }
};

const GroceryProvider = (props) => {
  const [list, setListItem] = useState([
    {
      dessert: "Lassi",
      nutritionInfo: {
        calories: 12,
        fat: 12,
        carb: 12,
        protein: 12,
      },
    },
  ]);

  // const updateData = () => {
  //   setListItem;
  // };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // <GroceryContext.Provider value={[list, setListItem]}>
    <GroceryContext.Provider value={[state, dispatch]}>
      {props.children}
    </GroceryContext.Provider>
  );
};

export default GroceryProvider;

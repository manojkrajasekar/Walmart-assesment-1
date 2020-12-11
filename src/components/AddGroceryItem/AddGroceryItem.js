import React, { useContext, useState } from "react";
import { GroceryContext } from "../../State/Context/GroceryContext";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery, gql } from "@apollo/client";

const query = gql`
  query {
    desserts {
      dessert
      nutritionInfo
    }
  }
`;

const AddGroceryItem = () => {
  const [dessertValue, setDessertValue] = useState("");
  const [calorieValue, setCalorieValue] = useState("");
  const [fatValue, setFatValue] = useState("");
  const [carbValue, setCarbValue] = useState("");
  const [protienValue, setProteinValue] = useState("");
  const [list, setListItem] = useContext(GroceryContext);

  //  = listValues;

  const { loading, data } = useQuery(query);

  console.log("Data Value", data);

  const handleAddNewItem = (e) => {
    e.preventDefault();

    setListItem((prevItems) => [
      ...prevItems,
      {
        dessert: "Laddu",
        nutritionInfo: {
          calories: calorieValue,
          fat: fatValue,
          carb: carbValue,
          protein: protienValue
        }
      }
    ]);
  };
  return (
    <>
      <div>
        <label>Dessert</label>
        <div>
          <input
            type="text"
            value={dessertValue}
            onChange={(e) => setDessertValue(e.target.value)}
          />
        </div>
        <div>
          <label>Calories</label>
          <input
            type="text"
            value={calorieValue}
            onChange={(e) => setCalorieValue(e.target.value)}
          />
        </div>
        <div>
          <label>Fat</label>
          <input
            type="text"
            value={fatValue}
            onChange={(e) => setFatValue(e.target.value)}
          />
        </div>
        <div>
          <label>Carbs</label>
          <input
            type="text"
            value={carbValue}
            onChange={(e) => setCarbValue(e.target.value)}
          />
        </div>
        <div>
          <label>Protein</label>
          <input
            type="text"
            value={protienValue}
            onChange={(e) => setProteinValue(e.target.value)}
          />
        </div>
        <button onClick={handleAddNewItem}> Add Item</button>
      </div>
    </>
  );
};

export default AddGroceryItem;

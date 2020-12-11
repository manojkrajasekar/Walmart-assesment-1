import React, { useState, useContext, useEffect } from "react";
import { GroceryContext } from "../../State/Context/GroceryContext";
import AddGroceryItem from "../AddGroceryItem/AddGroceryItem";
import { ApolloProvider, useQuery, gql } from "@apollo/client";

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

const GroceryData = () => {
  const listValues = useContext(GroceryContext)[0];

  const { loading, data } = useQuery(query);

  useEffect(() => {}, []);

  if (loading)
    return (
      <>
        <h1>Data is loading</h1>
      </>
    );

  return (
    <>
      <h1> Grocery Data Component </h1>
      {/* {listValues &&
        listValues.map((item) => {
          return <h1>{item.dessert}</h1>;
        })} */}

      <table>
        <tbody>
          <tr>
            <td>Dessert</td>
            <td>Calories</td>
            <td>Fat</td>
            <td>Carbs</td>
            <td>Protein</td>
          </tr>
          {data.desserts.map((item) => {
            return (
              <tr>
                <td>
                  <input type="checkBox" />
                </td>
                <td>{item.dessert}</td>
                <td>{item.nutritionInfo[0].calories}</td>
                <td>{item.nutritionInfo[0].carb}</td>
                <td>{item.nutritionInfo[0].fat}</td>
                <td>{item.nutritionInfo[0].protien}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <button
            onClick={defaultValue.addNewItem(
              dessertValue,
              calorieValue,
              fatValue
            )}
          >
            Add New Item
          </button> */}

      <AddGroceryItem />
    </>
  );
};

export default GroceryData;

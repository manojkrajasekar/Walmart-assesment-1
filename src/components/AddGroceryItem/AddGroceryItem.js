import React, { useContext, useState } from "react";
import { GroceryContext } from "../../State/Context/GroceryContext";
import ApolloClient from "apollo-boost";
import {
  ApolloProvider,
  useQuery,
  gql,
  useLazyQuery,
  useMutation,
} from "@apollo/client";

// const query = gql`
//   query {
//     desserts {
//       dessert
//       nutritionInfo
//     }
//   }
// `;

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

// const ADD_ITEM = gql`
//   mutation PostItem($type: String!) {
//     postItem(type: $type) {
//       dessert
//       calories
//       fat
//       carb
//       protein
//     }
//   }
// `;

const ADD_ITEM = gql`
  mutation PostItem(
    $dessert: String!
    $calories: Int
    $fat: Int
    $carb: Int
    $protein: Int
  ) {
    postItem(
      input: {
        dessert: $dessert
        calories: $calories
        fat: $fat
        carb: $carb
        protein: $protein
      }
    ) {
      dessert
    }
  }
`;

const DELETE_ITEM = gql`
  mutation DeleteItem(
    $dessert: String!
    $calories: Int
    $fat: Int
    $carb: Int
    $protein: Int
  ) {
    deleteItem(
      input: {
        dessert: $dessert
        calories: $calories
        fat: $fat
        carb: $carb
        protein: $protein
      }
    ) {
      dessert
    }
  }
`;

const AddGroceryItem = (props) => {
  console.log("Add props", props);
  const [dessertValue, setDessertValue] = useState("");
  const [calorieValue, setCalorieValue] = useState("");
  const [fatValue, setFatValue] = useState("");
  const [carbValue, setCarbValue] = useState("");
  const [protienValue, setProteinValue] = useState("");
  const [getNewData, { loading, data }] = useLazyQuery(query);

  console.log("Update Data Val", data);
  // const [list, setListItem] = useContext(GroceryContext);

  const [state, dispatch] = useContext(GroceryContext);

  const [ADD_ITEM_VALUE, { dataVal }] = useMutation(ADD_ITEM);

  // const { loading, data } = useQuery(query);

  // const updateData = () => {
  //   const { loading, groceryData } = useQuery(query);

  //   console.log("** Update Grocery Data**", groceryData);
  // };

  //console.log("Data Value", data);

  console.log(
    "** Adding New Items ** ",
    dessertValue,
    calorieValue,
    fatValue,
    carbValue,
    protienValue
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    ADD_ITEM_VALUE({
      variables: {
        dessert: dessertValue,
        calories: parseInt(calorieValue, 10),
        fat: parseInt(fatValue, 10),
        carb: parseInt(carbValue, 10),
        protein: parseInt(protienValue, 10),
      },
    });
    // updateData();

    dispatch({
      type: "ADD_ITEM",
      payload: {
        dessert: dessertValue,
        nutritionInfo: {
          calories: parseInt(calorieValue, 10),
          fat: parseInt(fatValue, 10),
          carb: parseInt(carbValue, 10),
          protein: parseInt(protienValue, 10),
        },
      },
    });

    dispatch({
      type: "DELETE_MODAL",
      payload: {},
    });

    props.callRefetch();

    console.log("Added Item Value", data);
    // setListItem((prevItems) => [
    //   ...prevItems,
    //   {
    //     dessert: "Laddu",
    //     nutritionInfo: {
    //       calories: calorieValue,
    //       fat: fatValue,
    //       carb: carbValue,
    //       protein: protienValue,
    //     },
    //   },
    // ]);
  };

  return (
    <>
      <form class="pa4 black-80">
        <div class="measure">
          <label for="name" class="f6 b db mb2">
            Dessert *
          </label>
          <input
            id="name"
            class="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="text"
            value={dessertValue}
            onChange={(e) => setDessertValue(e.target.value)}
            aria-describedby="name-desc"
          />
        </div>
        <div class="measure">
          <label for="name" class="f6 b db mb2">
            Calories *
          </label>
          <input
            id="name"
            class="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="number"
            value={calorieValue}
            onChange={(e) => setCalorieValue(e.target.value)}
            aria-describedby="name-desc"
          />
        </div>
        <div class="measure">
          <label for="name" class="f6 b db mb2">
            Fat *
          </label>
          <input
            id="name"
            class="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="number"
            value={fatValue}
            onChange={(e) => setFatValue(e.target.value)}
            aria-describedby="name-desc"
          />
        </div>
        <div class="measure">
          <label for="name" class="f6 b db mb2">
            Carbs *
          </label>
          <input
            id="name"
            class="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="number"
            value={carbValue}
            onChange={(e) => setCarbValue(e.target.value)}
            aria-describedby="name-desc"
          />
        </div>
        <div class="measure">
          <label for="name" class="f6 b db mb2">
            Protein *
          </label>
          <input
            id="name"
            class="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="number"
            value={protienValue}
            onChange={(e) => setProteinValue(e.target.value)}
            aria-describedby="name-desc"
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
};

export default AddGroceryItem;

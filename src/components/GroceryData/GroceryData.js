import React, { useState, useContext, useEffect } from "react";
import { GroceryContext } from "../../State/Context/GroceryContext";
import AddGroceryItem from "../AddGroceryItem/AddGroceryItem";
import Modal from "../Modal/Modal";
import {
  ApolloProvider,
  useQuery,
  useLazyQuery,
  gql,
  useMutation,
} from "@apollo/client";
import "./styles.css";

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

const RESET_DATA = gql`
  mutation ResetData(
    $dessert: String!
    $calories: Int
    $fat: Int
    $carb: Int
    $protein: Int
  ) {
    resetData(
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

// const [state, dispatch] = useContext(GroceryContext);

const GroceryData = () => {
  const listValues = useContext(GroceryContext)[0];

  const { loading, data, refetch } = useQuery(query, {
    pollInterval: 500,
  });

  //const [groceryStateData, SetGroceryStateData] = useState(data);
  const [state, dispatch] = useContext(GroceryContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [DELETE_ITEM_VAL, { dataVal }] = useMutation(DELETE_ITEM);
  const [RESET_DATA_VAL, {}] = useMutation(RESET_DATA);
  const [updateData, setUpdatedData] = useState([]);

  const showGroceryItemModal = () => {
    setModalOpen(!isModalOpen);
  };

  // useEffect(() => {
  //   console.log("Use Effect Data", data);
  //   if (data && data.desserts) {
  //     data.desserts.map((item) => {
  //       dispatch({
  //         type: "ADD_ITEM",
  //         payload: {
  //           dessert: item.dessert,
  //           nutritionInfo: {
  //             calories: parseInt(item.nutritionInfo[0].calories, 10),
  //             fat: parseInt(item.nutritionInfo[0].fat, 10),
  //             carb: parseInt(item.nutritionInfo[0].carb, 10),
  //             protein: parseInt(item.nutritionInfo[0].protein, 10),
  //           },
  //         },
  //       });
  //     });
  //   }
  // }, [data]);

  useEffect(() => {
    if (data) {
      let sortedValues = [...data.desserts].map((item) => {
        console.log("Item", item);
        let newVal = { ...item };

        newVal["sortval"] = "desc";
        return newVal;
      });
      setUpdatedData(sortedValues);
    }
  }, [data]);

  if (loading)
    return (
      <>
        <h1>Data is loading</h1>
      </>
    );

  console.log("Data Value", state.dessert);

  if (!data) return null;

  const handleDeleteVal = () => {
    console.log("Deleting Item", deleteItem);
    DELETE_ITEM_VAL({
      variables: {
        dessert: deleteItem,
        calories: 12,
        fat: 10,
        carb: 9,
        protein: 4,
      },
    });
  };

  const handleResetData = () => {
    console.log("Resetting Data");
    RESET_DATA_VAL({
      variables: {
        dessert: "",
        calories: 12,
        fat: 10,
        carb: 9,
        protein: 4,
      },
    });
  };

  const handleChecked = (val) => {
    setDeleteItem(val);
  };

  // let updateData = [...data.desserts];
  const handleSort = (sortParameter) => {
    let newSortedData;
    let duplicate = [...updateData];
    let sortedData;
    if (sortParameter == "dessert") {
      sortedData = duplicate.sort((a, b) => {
        console.log("Sort Val", a);
        // return a[sortParameter] > b[sortParameter] ? 1 : -1;
        if (a.sortval == "desc") {
          //a.sortVal = "asc";
          return a[sortParameter] > b[sortParameter] ? 1 : -1;
        } else {
          //a.sortVal = "desc";
          return a[sortParameter] > b[sortParameter] ? -1 : 1;
        }
      });
      console.log(duplicate[0]);
      if (duplicate[0].sortval == "desc") {
        console.log("IF");
        newSortedData = duplicate.map((item) => {
          item.sortval = "asc";
          return item;
        });
      } else {
        console.log("ELSE");
        newSortedData = duplicate.map((item) => {
          item.sortval = "desc";
          return item;
        });
      }
    } else {
      sortedData = duplicate.sort((a, b) => {
        console.log("Sort Val", a);
        // return a[sortParameter] > b[sortParameter] ? 1 : -1;
        if (a.sortval == "desc") {
          //a.sortVal = "asc";
          return a.nutritionInfo[0][sortParameter] >
            b.nutritionInfo[0][sortParameter]
            ? 1
            : -1;
        } else {
          //a.sortVal = "desc";
          return a.nutritionInfo[0][sortParameter] >
            b.nutritionInfo[0][sortParameter]
            ? -1
            : 1;
        }
      });
      console.log(duplicate[0]);
      if (duplicate[0].sortval == "desc") {
        console.log("IF");
        newSortedData = duplicate.map((item) => {
          item.sortval = "asc";
          return item;
        });
      } else {
        console.log("ELSE");
        newSortedData = duplicate.map((item) => {
          item.sortval = "desc";
          return item;
        });
      }
    }

    setUpdatedData(newSortedData);
    console.log("Updated Data Set", newSortedData);
    // updateData = ;
  };

  console.log("Updated State Data", updateData);
  console.log("State Data:", state.dessert);
  console.log("Updated Data", data);
  return (
    <div className="grocery-data-container">
      {/* <button onClick={() => showGroceryItemModal()}>Add New</button> */}
      <div className="reset-data-container">
        <h1 className="nutrition--list">Nutrition List</h1>
        <button className="reset--data" onClick={handleResetData}>
          Reset Data
        </button>
      </div>
      <div className="item--container">
        <button onClick={showGroceryItemModal} class="add--data">
          Add New
        </button>
        <button className="delete--data" onClick={handleDeleteVal}>
          Delete Item
        </button>
      </div>

      <div class="pa4">
        <div class="overflow-auto">
          <table class="f6 w-100 mw8 center" cellspacing="0">
            <thead>
              <tr class="stripe-dark">
                <th class="fw6 tl pa3 bg-white">
                  <input type="checkBox" />
                </th>
                <th
                  class="fw6 tl pa3 bg-white"
                  onClick={() => {
                    handleSort("dessert");
                  }}
                >
                  Dessert
                </th>
                <th
                  class="fw6 tl pa3 bg-white"
                  onClick={() => {
                    handleSort("calories");
                  }}
                >
                  Calories
                </th>
                <th
                  class="fw6 tl pa3 bg-white"
                  onClick={() => {
                    handleSort("fat");
                  }}
                >
                  Fat
                </th>
                <th
                  class="fw6 tl pa3 bg-white"
                  onClick={() => {
                    handleSort("carb");
                  }}
                >
                  Carbs
                </th>
                <th
                  class="fw6 tl pa3 bg-white"
                  onClick={() => {
                    handleSort("protein");
                  }}
                >
                  Protein
                </th>
              </tr>
            </thead>
            <tbody class="lh-copy">
              {/* {data.desserts &&
                data.desserts.map((item) => { */}
              {updateData &&
                updateData.map((item) => {
                  return (
                    <tr class="stripe-dark">
                      <td class="pa3">
                        <input
                          type="checkBox"
                          onClick={() => {
                            handleChecked(item.dessert);
                          }}
                        />
                      </td>
                      <td class="pa3">{item.dessert}</td>
                      <td class="pa3">{item.nutritionInfo[0].calories}</td>
                      <td class="pa3">{item.nutritionInfo[0].carb}</td>
                      <td class="pa3">{item.nutritionInfo[0].fat}</td>
                      <td class="pa3">{item.nutritionInfo[0].protien}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      {/* <button
        onClick={defaultValue.addNewItem(dessertValue, calorieValue, fatValue)}
      >
        Add New Item
      </button> */}
      {/* {isModalOpen && <AddGroceryItem />} */}
      {isModalOpen && (
        <Modal>
          <AddGroceryItem defaultOpened={true} callRefetch={() => refetch()} />
        </Modal>
      )}
    </div>
  );
};

export default GroceryData;

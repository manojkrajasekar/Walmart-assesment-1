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
  ],
};

const reducer = (state = initialState, action) => {
  console.log("State Data", state.dessert, action.payload.dessert)
  switch (action.type) {
    case "ADD_ITEM":
        if(!state.dessert.contains(action.payload.dessert)) {
            return { items: [...state.dessert, action.payload] };
        }
    default:
      return state;
  }
};

export const reducer;

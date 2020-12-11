import React from "react";
import GrocerProvider from "../src/State/Context/GroceryContext";
import GroceryData from "../src/components/GroceryData/GroceryData";

import "./styles.css";

export default function App() {
  return (
    <GrocerProvider>
      <GroceryData />
    </GrocerProvider>
  );
}

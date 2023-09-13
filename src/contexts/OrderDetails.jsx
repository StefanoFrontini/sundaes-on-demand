import { createContext, useState, useContext } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

// create custom hook to check weather we are in a provider

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be used within a OrderDetailsProvider"
    );
  }
  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionsCount, setOptionsCount] = useState({
    scoops: {},
    toppings: {},
  });
  function updateItemCount(itemName, newItemCount, optionType) {
    setOptionsCount({
      ...optionsCount,
      [optionType]: {
        ...optionsCount[optionType],
        [itemName]: newItemCount,
      },
    });
  }
  function resetOrder() {
    setOptionsCount({ scoops: {}, toppings: {} });
  }

  // utility function to derive totals from optionsCount state value
  function calculateTotal(optionType) {
    const countsArray = Object.values(optionsCount[optionType]);
    const totalCount = countsArray.reduce((acc, item) => acc + item, 0);
    return totalCount * pricePerItem[optionType];
  }
  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };
  const value = { optionsCount, updateItemCount, resetOrder, totals };
  return <OrderDetails.Provider value={value} {...props} />;
}

import { useState, useEffect } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
function OrderConfirmation({ gotoPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  // function that taks you back to the order entry phase
  function handleClick() {
    resetOrder();
    gotoPhase("orderEntry");
  }

  useEffect(() => {
    async function postConfirmation() {
      try {
        const data = await fetch("http://localhost:3030/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ orderNumber }),
        });
        setOrderNumber("1224");
      } catch (error) {
        console.log(error);
      }
    }
    postConfirmation();
  }, []);
  if (!orderNumber) return <h1>Loading</h1>;
  return (
    <>
      <h1>Thank you!</h1>
      <p>Your order number is {orderNumber}</p>
      <small>Warning</small>
      <button onClick={handleClick}>Create new order</button>
    </>
  );
}

export default OrderConfirmation;

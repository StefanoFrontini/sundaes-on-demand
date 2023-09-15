import { useState, useEffect } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";
import Button from "react-bootstrap/Button";
function OrderConfirmation({ gotoPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
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
        setError(true);
        console.log(error);
      }
    }
    postConfirmation();
  }, []);
  const newOrderButton = (
    <Button onClick={handleClick}>Create new order</Button>
  );
  if (!orderNumber) return <h1>Loading</h1>;
  if (error)
    return (
      <>
        <AlertBanner message={null} variant={null} />
        {newOrderButton}
      </>
    );
  return (
    <>
      <h1>Thank you!</h1>
      <p>Your order number is {orderNumber}</p>
      <small>Warning</small>
      {newOrderButton}
    </>
  );
}

export default OrderConfirmation;

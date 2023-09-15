import Container from "react-bootstrap/Container";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import { useState } from "react";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/entry/OrderConfirmation";

function App() {
  const [orderPhase, setOrderPhase] = useState("orderEntry"); // orderEntry, orderSummary, orderConfirmation
  function gotoPhase(newPhase) {
    setOrderPhase(newPhase);
  }
  const orderEntry = orderPhase === "orderEntry" && (
    <OrderEntry gotoPhase={gotoPhase} />
  );
  const orderSummary = orderPhase === "orderSummary" && (
    <OrderSummary gotoPhase={gotoPhase} />
  );
  const orderConfirmation = orderPhase === "orderConfirmation" && (
    <OrderConfirmation gotoPhase={gotoPhase} />
  );
  return (
    <OrderDetailsProvider>
      <Container>
        {orderEntry}
        {orderSummary}
        {orderConfirmation}
      </Container>
    </OrderDetailsProvider>
  );
}

export default App;

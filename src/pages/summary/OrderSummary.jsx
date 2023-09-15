import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
function OrderSummary({ gotoPhase }) {
  const { totals, optionsCount } = useOrderDetails();
  const scoopsArray = Object.entries(optionsCount.scoops);
  const scoopList = scoopsArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });
  const toppingsArray = Object.keys(optionsCount.toppings);
  const toppingList = toppingsArray.map((key) => {
    return <li key={key}>{key}</li>;
  });
  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm gotoPhase={gotoPhase} />
    </div>
  );
}

export default OrderSummary;

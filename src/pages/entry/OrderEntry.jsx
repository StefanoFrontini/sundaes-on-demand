import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
function OrderEntry({ gotoPhase }) {
  const { totals } = useOrderDetails();
  const isDisabled = totals.scoops + totals.toppings === 0;

  return (
    <>
      <div>
        <h1>Design your sundae!</h1>
        <Options optionType="scoops" />
        <Options optionType="toppings" />
        <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
        <button disabled={isDisabled} onClick={() => gotoPhase("orderSummary")}>
          Order Sundae!
        </button>
      </div>
    </>
  );
}

export default OrderEntry;

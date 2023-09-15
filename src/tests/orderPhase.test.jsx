import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import { logRoles } from "@testing-library/react";

import App from "../App";

test("order phases for happy path", async () => {
  // render App
  render(<App />);
  //   logRoles(container);
  const user = userEvent.setup();
  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  // find and click order button
  const orderSummary = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummary);
  const summaryHeading = screen.getByRole("heading", {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();
  //  check summary information based on order
  const scoopsHeading = screen.getByRole("heading", {
    name: "Scoops: $2.00",
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  // accept terms and conditions and click button to confirm ordet

  await user.click(orderSummary);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
  //   const confirmButton = screen.getByText("Confirm Order");
  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmButton);
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();
  const thankYouHeading = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeading).toBeInTheDocument();
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();
  // confirm order number on confirmation page
  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /new order/i,
  });
  await user.click(newOrderButton);
  // check that scoops and toppings subtotals have been reset
  const scoopTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopTotal).toBeInTheDocument();
  const toppingTotal = await screen.findByText("Toppings total: $0.00");
  expect(toppingTotal).toBeInTheDocument();
});

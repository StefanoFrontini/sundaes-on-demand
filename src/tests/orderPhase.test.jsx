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

test("Toppings header is not on summary page if no toppings ordered", async () => {
  render(<App />);
  const user = userEvent.setup();
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  // find and click order button
  const orderSummary = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummary);
  // const notToppings = screen.queryByText(/toppings/i);
  const toppingsHeading = screen.queryByRole("heading", {
    name: /toppings/i,
  });
  expect(toppingsHeading).not.toBeInTheDocument();
});

test("Toppings header is not on summary page if toppings ordered, then removed", async () => {
  const user = userEvent.setup();
  render(<App />);
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const cherriesTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesTopping);
  expect(cherriesTopping).toBeChecked();
  const toppingsTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsTotal).toHaveTextContent("1.50");

  // remove topping
  await user.click(cherriesTopping);
  expect(cherriesTopping).not.toBeChecked();
  expect(toppingsTotal).toHaveTextContent("0.00");

  // find and click order summary button
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  const scoopsHeading = screen.queryByRole("heading", {
    name: /scoops/i,
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", {
    name: /toppings/i,
  });
  expect(toppingsHeading).not.toBeInTheDocument();
});

import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("Handles error for scoop and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<OrderEntry />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
test("disable order button for no scoops", async () => {
  render(<OrderEntry gotoPhase={jest.fn()} />);
  const user = userEvent.setup();
  // screen.debug();
  const confirmButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  expect(confirmButton).toBeDisabled();
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(confirmButton).toBeEnabled();
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");
  expect(confirmButton).toBeDisabled();
});

import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";
import { rest } from "msw";
import { server } from "../../../mocks/server";
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

test("showing alert for error when submitting order", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) => {
      //   await sleep(100);
      return res(ctx.status(500));
    })
  );
  render(<OrderConfirmation gotoPhase={jest.fn()} />);
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(
    "An unexpected error occurred. Please try again later."
  );
});

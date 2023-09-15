import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
function SummaryForm({ gotoPhase }) {
  const [tcChecked, setTcChecked] = useState(false);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No icecream will actually be delivered</Popover.Body>
    </Popover>
  );
  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );
  function handleSubmit(e) {
    e.preventDefault();
    gotoPhase("orderConfirmation");
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm Order
      </Button>
    </Form>
  );
}

export default SummaryForm;

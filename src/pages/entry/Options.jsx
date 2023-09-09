import { useState, useEffect } from "react";
import ScoopOption from "./ScoopOption";
import Row from "react-bootstrap/Row";
function Options({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3030/${optionType}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.log(err));
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : null;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}

export default Options;

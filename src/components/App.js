import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

//////////////////////
// Building the Layout
export default function App() {
  ////////////////////////////////////////////
  // Thinking About State and Lifting State Up
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  ///////////////////////////////////////////////////////
  // Deleting an Item: More Child-to-Parent Comunication!
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  /////////////////////////////////////////////////////
  // Updating an Item: Complex Immutable Data Operation
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  ////////////////////
  // Clearing the List
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

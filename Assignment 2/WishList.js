import React, { useState } from 'react';

function WishList() {
  const [items, setItems] = useState([]);

  const addItem = (name, priority = 0) => {
    setItems([...items, { name, priority }]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const updatePriority = (index, priority) => {
    const newItems = [...items];
    newItems[index].priority = priority;
    setItems(newItems);
  };

  const moveItemToTop = (index) => {
    const newItems = [...items];
    const item = newItems.splice(index, 1)[0];
    newItems.unshift(item);
    setItems(newItems);
  };

  return (
    <div>
      <h2>Wish List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - priority: {item.priority}
            <button onClick={() => removeItem(index)}>Remove</button>
            <button onClick={() => updatePriority(index, item.priority + 1)}>
              Increase Priority
            </button>
            <button onClick={() => updatePriority(index, item.priority - 1)}>
              Decrease Priority
            </button>
            <button onClick={() => moveItemToTop(index)}>Move to Top</button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const name = event.target.elements.name.value;
          const priority = parseInt(event.target.elements.priority.value, 10);
          addItem(name, priority);
          event.target.reset();
        }}
      >
        <label>
          Name:set BROWSER=chrome
          <input type="text" name="name" required />
        </label>
        <label>
          Priority:
          <input type="number" name="priority" defaultValue="0" min="0" />
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default WishList;

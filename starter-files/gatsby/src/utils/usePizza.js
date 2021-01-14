import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // 1. create some state to hold our order
  const [order, setOrder] = useState([]);

  // 2. make a function to add things to order
  // orderedPizza = an object { id, size }
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  // 3. Make a function to remove things from our order
  function removeFromOrder(index) {
    // everything before the item we want to remove
    const first = order.slice(0, index);

    // everything after the item we want to remove
    const second = order.slice(index + 1);

    setOrder(first.concat(second));
  }

  // 4. send this data via a serverless function when the user checks out
  // TODO

  return { order, addToOrder, removeFromOrder };
}

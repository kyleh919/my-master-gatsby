import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  // 1. create some state to hold our order
  // we got rid of this line because we moved useState up to
  //  the provider
  // const [order, setOrder] = useState([]);

  // now we access our state and updater function (setOrder)
  //  via context
  const [order, setOrder] = useContext(OrderContext);

  // set up the states for the loading, error, and returned messages
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  // the function that is run when someone submits the form
  async function submitOrder(e) {
    console.log(e);

    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    // gather all the data that needs to be sent
    // data includes: order, total price, name, and email
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    console.log(pizzas);
    console.log(body);

    // 4. send this data via a serverless function when the user checks out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST', // your posting data, not getting
        headers: {
          'Content-Type': 'application/json', // mimetype
        },
        body: JSON.stringify(body),
      }
    );

    const text = JSON.parse(await res.text());

    // check if everything worked
    if (res.response >= 400 && res.response < 600) {
      setLoading(false);
      setError(true);
      setMessage(text.message);
    } else {
      setLoading(false);
      setError(false);
      setMessage('Success! Come on down for your pizza!');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}

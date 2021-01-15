import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // 1. loop over each item in the order
  // 2. calculate the total for that pizza
  // 3. add that total to the running total

  const orderTotal = order.reduce(function (acc, singleOrder) {
    const currPizza = pizzas.find((pizza) => pizza.id === singleOrder.id);

    return acc + calculatePizzaPrice(currPizza.price, singleOrder.size);
  }, 0);

  return orderTotal;
}

import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((singleOrder) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );
    return {
      ...singleOrder,
      name: pizza.name,
      price: formatMoney(calculatePizzaPrice(pizza.price)),
    };
  });
}

import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        // console.log(singleOrder);
        // console.log(pizzas);

        const currentPizza = pizzas.find(
          (pizza) => pizza.id === singleOrder.id
        );

        // console.log(currentPizza);
        // console.log(
        //   formatMoney(calculatePizzaPrice(currentPizza.price, singleOrder.size))
        // );

        return (
          <MenuItemStyles key={`${singleOrder.id}-${index}`}>
            <Img fluid={currentPizza.image.asset.fluid} />
            <h2>{currentPizza.name}</h2>
            <p>
              {formatMoney(
                calculatePizzaPrice(currentPizza.price, singleOrder.size)
              )}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${currentPizza.name} from Order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}

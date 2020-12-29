import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export default function ToppingsFilter() {
  // 1. Get a list of all the toppings
  // 2. Get a list of all the pizzas with their toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query MyQuery {
      toppings: allSanityTopping {
        nodes {
          id
          name
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            id
            name
          }
        }
      }
    }
  `);

  console.log({ toppings, pizzas });

  // 3. Count how many pizzas are in each topping
  // 4. Loop over the list of toppings and display the topping and the count of pizzas in that topping
  // 5. Link it up.....

  return (
    <div>
      <p>toppings</p>
    </div>
  );
}

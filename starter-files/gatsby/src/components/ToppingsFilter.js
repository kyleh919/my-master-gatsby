import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

function countToppingsInPizzas(pizzas) {
  // 1. extract each pizzas list of toppings
  // 2. flatten out the nested arrays
  // 3. reduce the flattened array to count the number of topping occurences
  // 4. sort the results from least to greatest
  const count = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      if (acc[topping.id] === undefined) {
        acc[topping.id] = {
          name: topping.name,
          id: topping.id,
          count: 1,
        };
      } else {
        acc[topping.id].count += 1;
      }

      return acc;
    }, {});

  return Object.values(count).sort((a, b) => a.count - b.count);
}

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

  const toppingsCount = countToppingsInPizzas(pizzas.nodes);

  // 3. Count how many pizzas are in each topping
  // 4. Loop over the list of toppings and display the topping and the count of pizzas in that topping
  // 5. Link it up.....

  return (
    <div>
      {toppingsCount.map((topping) => (
        <Link key={topping.id} to={`/topping/${topping.name}`}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </div>
  );
}

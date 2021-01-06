import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;

  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    text-decoration: none;

    .count {
      background: var(--white);
      padding: 2px 5px;
    }

    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countToppingsInPizzas(pizzas) {
  // 1. extract each pizzas list of toppings
  // 2. flatten out the nested arrays
  // 3. reduce the flattened array to count the number of topping occurrences
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
  const { pizzas } = useStaticQuery(graphql`
    query MyQuery {
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

  // 3. Count how many pizzas are in each topping
  // 4. Loop over the list of toppings and display the topping and the count of pizzas in that topping
  const toppingsCount = countToppingsInPizzas(pizzas.nodes);

  // 5. Link it up.....
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsCount.map((topping) => (
        <Link key={topping.id} to={`/topping/${topping.name}`}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}

import React from 'react';
import { graphql } from 'gatsby';

export default function PizzasPage() {
  return (
    <>
      <p>Hey, I'm the pizza page!!!</p>
    </>
  );
}

export const queryPizza = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
        toppings {
          id
          name
        }
      }
    }
  }
`;

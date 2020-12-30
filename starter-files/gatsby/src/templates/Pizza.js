import React from 'react';
import { graphql } from 'gatsby';

export default function SinglePizzaPage() {
  return <p>I'm a single pizza page!</p>;
}

// this needs to be dynamic based on the slug passed in via
// the context in gatsby-node.js
export const pizzaQuery = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      toppings {
        name
        id
        vegetarian
      }
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

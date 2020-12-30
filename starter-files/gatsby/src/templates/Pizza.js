import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SinglePizzaStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

export default function SinglePizzaPage({ data }) {
  const { pizza } = data;

  return (
    <SinglePizzaStyles>
      <Img fluid={pizza.image.asset.fluid} />
      <div>
        <h2 className="mark">{pizza.name}</h2>
        <ul>
          {pizza.toppings.map((topping) => (
            <li>{topping.name}</li>
          ))}
        </ul>
      </div>
    </SinglePizzaStyles>
  );
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

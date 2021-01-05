import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const BeersGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  text-align: center;
  padding: 2rem;

  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

const GrayStarStyles = styled.span`
  filter: grayscale(100%);
`;

export default function BeersPage({ data }) {
  const { beers } = data;
  const beersCount = beers.nodes.length;

  console.log(beers);

  return (
    <>
      <h2 className="center">
        We have {beersCount} beers available. Dine in only!
      </h2>
      <BeersGridStyles>
        {beers.nodes.map((beer) => {
          const rating = Math.round(beer.rating.average);

          return (
            <SingleBeerStyles key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              <h4>{beer.price}</h4>

              <p title={`${rating} out of 5 stars`}>
                {`⭐`.repeat(rating)}
                <GrayStarStyles>{`⭐`.repeat(5 - rating)}</GrayStarStyles>
                <span>({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeersGridStyles>
    </>
  );
}

export const beersQuery = graphql`
  query {
    beers: allBeer {
      nodes {
        name
        id
        image
        price
        rating {
          average
          reviews
        }
      }
    }
  }
`;

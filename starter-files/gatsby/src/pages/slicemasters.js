import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SlicemastersGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }

  .gatsby-image-wrapper {
    height: 400px;
  }

  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }

  .description {
    background: var(--yellow);
    text-align: center;
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    position: relative;
    z-index: 2;
    transform: rotate(1deg);
  }
`;

export default function SlicemastersPage({ data }) {
  const { slicemasters } = data;

  console.log(slicemasters);

  return (
    <>
      <SlicemastersGridStyles>
        {slicemasters.nodes.map((slicemaster) => (
          <SlicemasterStyles key={slicemaster.id}>
            <Link to={`/slicemasters/${slicemaster.slug.current}`}>
              <h2>
                <span className="mark">{slicemaster.name}</span>
              </h2>
            </Link>
            <Img fluid={slicemaster.image.asset.fluid} />

            <p className="description ">{slicemaster.description}</p>
          </SlicemasterStyles>
        ))}
      </SlicemastersGridStyles>
    </>
  );
}

export const slicemastersQuery = graphql`
  query {
    slicemasters: allSanityPerson {
      nodes {
        name
        id
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
        slug {
          current
        }
      }
      totalCount
    }
  }
`;

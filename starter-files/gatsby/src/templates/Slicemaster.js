import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default function IndividualSlicemasterPage({ data }) {
  console.log(data);
  return (
    <div className="center">
      <Img fluid={data.slicemaster.image.asset.fluid} />
      <h2>
        <span className="mark">{data.slicemaster.name}</span>
      </h2>
      <p>{data.slicemaster.description}</p>
    </div>
  );
}

export const individualSlicemasterQuery = graphql`
  query IndividualSlicemaster($id: String!) {
    slicemaster: sanityPerson(id: { eq: $id }) {
      name
      description
      image {
        asset {
          fluid(maxHeight: 600) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

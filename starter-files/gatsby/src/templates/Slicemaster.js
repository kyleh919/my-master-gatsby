import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SlicemasterStyles = styled.div`
  text-align: center;
  & > * {
    margin-bottom: 2px;
  }
`;

export default function IndividualSlicemasterPage({ data }) {
  console.log(data);
  return (
    <SlicemasterStyles>
      <Img fluid={data.slicemaster.image.asset.fluid} />
      <h2 className="mark">{data.slicemaster.name}</h2>
      <p>{data.slicemaster.description}</p>
    </SlicemasterStyles>
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

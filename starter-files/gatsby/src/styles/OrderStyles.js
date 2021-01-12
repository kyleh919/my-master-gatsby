import styled from 'styled-components';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  fieldset {
    /* overwrites the grid-template-columns creating 2
    columns for fieldset elements */
    grid-column: span 2;

    /* sets a max-height for each fieldset and turns on
    overflow if the content exceeds the max-height */
    max-height: 600px;
    overflow: auto;

    /* applies a grid to the child elements of fieldset
    elements */
    display: grid;
    gap: 1rem;
    align-content: start;

    &.order,
    &.menu {
      grid-column: span 1;
    }
  }

  /* @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  } */
`;

export default OrderStyles;

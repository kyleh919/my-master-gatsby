import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const NavStyled = styled.nav`
  margin-bottom: 3rem;

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    /* 2rem * the set html:font-size in GlobalStyles.js */
    grid-gap: 2rem;
    align-items: center;

    margin: 0;
    padding: 0;
  }
`;

export default function Nav() {
  return (
    <NavStyled>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">LOGO</Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead!</Link>
        </li>
      </ul>
    </NavStyled>
  );
}

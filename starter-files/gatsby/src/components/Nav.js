import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

const NavStyled = styled.nav`
  margin-bottom: 3rem;

  .logo {
    transform: translateY(-25%);
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    /* 2rem * the set html:font-size in GlobalStyles.js */
    grid-gap: 2rem;
    align-items: center;

    margin: 0;
    padding: 0;
    list-style: none;

    margin-top: -6rem;
  }

  li {
    --rotate: -2deg;

    transform: rotate(var(--rotate));
    order: 1;

    &:nth-child(1) {
      --rotate: 1deg;
    }

    &:nth-child(2) {
      --rotate: -2.5deg;
    }

    &:nth-child(4) {
      --rotate: 2.5deg;
    }

    &:hover {
      --rotate: 3deg;
    }
  }

  a {
    font-size: 3rem;
    text-decoration: none;

    &:hover {
      color: var(--red);
    }
    &[aria-current='page'] {
      color: var(--red);
    }
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
          <Link to="/">
            <Logo />
          </Link>
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

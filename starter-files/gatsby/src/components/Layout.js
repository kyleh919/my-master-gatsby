import React from 'react';
import styled from 'styled-components';
import 'normalize.css';

import Nav from './Nav';
import Footer from './Footer';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';

const ContentStyles = styled.div`
  background: var(--white);
  padding: 2rem;
`;

export default function Layout({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Typography />

      <ContentStyles>
        <Nav />
        {children}
        <Footer />
      </ContentStyles>
    </div>
  );
}

import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  align-content: center;
  text-align: center;

  margin: 2rem 0;

  border: 1px solid var(--grey);
  border-radius: 5px;

  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;

    &[aria-current],
    &.current {
      color: var(--red);
    }

    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  // base = what base page the pagination component is related to (eg. slicemasters)
  base,
}) {
  // calculate the totalPages
  // create a previous page variable
  // create a next page variable
  // create link for previous page &#8592;
  // create link for next page &#8594;
  // pass in props
  // create hasPrevPage check and add the check to the Link as disabled
  //  TODO: need to disable this via CSS because React will not disable the actual
  //    Link, only for buttons
  // create hasNextPage check and add the check to the Link as disabled
  //  TODO: need to disable this via CSS because React will not disable the actual
  //    Link, only for buttons
  // create numbers between prev and next for pages
  // fix it so that if you go to /slicemasters/1 it actually just goes to /slicemasters
  // style PaginationStyles
  // fix styling issue where clicking slicemasters in nav won't highlight 1 in pagination
  //  by adding logic to className on the Link

  const totalPages = Math.ceil(totalCount / pageSize);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPrevPage = previousPage >= 1;
  const hasNextPage = nextPage <= totalPages;

  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={`${base}/${previousPage}`}>
        &#8592; Prev{' '}
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          to={`${base}/${i > 0 ? i + 1 : ''}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next &#8594;
      </Link>
    </PaginationStyles>
  );
}

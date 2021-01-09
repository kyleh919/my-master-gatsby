import React, { useState } from 'react';
import SEO from '../components/SEO';

export default function OrderPage() {
  const [name, setName] = useState('');

  return (
    <>
      <SEO title="Order a pizza!" />

      <form>
        <fieldset>
          <legend>Your Info</legend>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
        </fieldset>

        <fieldset>
          <legend>Menu</legend>
        </fieldset>

        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
    </>
  );
}

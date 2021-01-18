import React, { useState } from 'react';

// Create a order context
const OrderContext = React.createContext();

// Create a provider and stick state into it
export function OrderProvider({ children }) {
  const [order, setOrder] = useState([]);

  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;

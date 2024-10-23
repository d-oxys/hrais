'use client'
import { makeStore } from '@root/libs/store';
import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [store, setStore] = useState<any>();

  useEffect(() => {
    setStore(makeStore([]));
  }, []);

  return (
    store && (
      <Provider store={store}>        
        {children}
      </Provider>
    )
  );
}
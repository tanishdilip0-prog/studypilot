import React from 'react';
import { AppProvider } from './context/AppContext';
import { MainLayout } from './layouts/MainLayout';

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;

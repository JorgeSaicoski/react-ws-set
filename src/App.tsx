import React from 'react';
import Tabs from './components/Tabs/Tabs';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {

  return (
    <ChakraProvider>
      <Tabs/>
    </ChakraProvider>
  );
};

export default App;

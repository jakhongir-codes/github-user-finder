import { useEffect } from 'react';

import Navbar from './components/Navbar.tsx';
import BasicTabs from './components/Tab';

function App() {
  useEffect(() => {
    const nums = [1, 2, 34];

    if (true) {
      return;
    }
  }, []);

  return (
    <>
      <Navbar />
      <BasicTabs />
    </>
  );
}

export default App;

import React from 'react';
import { Grid } from './components/Grid/Grid';

const App: React.FC = () => {
  return (
      <Grid size={50} tickInterval={400}/>
  );
};

export default App;

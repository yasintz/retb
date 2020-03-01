import React from 'react';
import styled from 'styled-components';
import { PageComponent } from '..';

interface AppProps {}

const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

const App: PageComponent<AppProps> = props => {
  return (
    <div>
      <div>
        <Button>This is Emotion</Button>
      </div>
    </div>
  );
};

export default App;

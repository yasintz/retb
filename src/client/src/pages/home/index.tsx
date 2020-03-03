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
  console.log(props);

  return (
    <div>
      <div>
        <Button>This is Emotion</Button>
      </div>
    </div>
  );
};

App.getInitialProps = ({ req }) => {
  // @ts-ignore
  return { user: req?.user };
};

export default App;

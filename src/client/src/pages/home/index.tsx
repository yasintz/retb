import React from 'react';
import axios from 'axios';
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
        <Button
          onClick={() => {
            axios.post('/auth/logout').then(({ data }) => {
              console.log(data);
            });
          }}
        >
          logout
        </Button>
      </div>
      <div>
        <a href="/auth/login/google"> Login With Google</a>
      </div>
    </div>
  );
};

App.getInitialProps = ({ req }) => {
  // @ts-ignore
  return { user: req?.user };
};

export default App;

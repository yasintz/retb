import React from 'react';
import axios from 'axios';
import { PageComponent } from '..';

interface LoginPageProps {
  user?: { username: string; id: string };
}
const Login: PageComponent<LoginPageProps> = props => {
  const [user, setUser] = React.useState(props.user ? props.user : { username: 'yok la' });

  return (
    <>
      <div>{user.username}</div>
      <div>
        <label>Username:</label>
        <input type="text" name="username" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" />
      </div>
      <div>
        <button
          onClick={() => {
            axios
              .post('/auth/login', { username: 'yasintz', password: '12345' })
              .then(i => {
                setUser({ username: i.data.username });
                console.log(i.data);
              })
              .catch(e => {
                alert(e);
              });
          }}
          type="button"
        >
          Login
        </button>
      </div>
    </>
  );
};
Login.getInitialProps = ({ req }) => {
  // @ts-ignore
  return { user: req?.user };
};

export default Login;

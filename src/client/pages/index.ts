import { AsyncComponent, asyncComponent } from '@jaredpalmer/after';

import '~/client/assets/style/app.css';
import NotFound from './not-found';
import Loading from '../components/loading';

export type PageComponent<P = any> = Partial<AsyncComponent> & (React.StatelessComponent<P> | React.ComponentClass<P>);

export interface Page {
  path?: string;
  exact?: boolean;
  component: any;
}

const routes: Page[] = [
  {
    path: '/',
    exact: true,
    component: asyncComponent({ loader: () => import('./home'), Placeholder: Loading }),
  },
  {
    path: '/about',
    exact: true,
    component: asyncComponent({ loader: () => import('./about'), Placeholder: Loading }),
  },
  {
    path: '/error',
    exact: true,
    component: asyncComponent({ loader: () => import('./server-error'), Placeholder: Loading }),
  },
  {
    component: NotFound,
  },
];

export default routes;

import routes  from './routes';
import * as reducer from './redux/reducer';
import wrapper from './wrapper';
import asyncSettings from './react-isomorphic-render-async';

export default {
  reducer,
  routes,
  wrapper,
  ...asyncSettings
};

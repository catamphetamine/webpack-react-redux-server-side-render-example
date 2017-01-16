import routes  from './routes';
import * as reducer from './reducer';
import asyncSettings from './react-isomorphic-render-async';

export default {
  reducer,
  routes,
  ...asyncSettings
};

import routes  from './routes';
import * as reducer from './redux/reducer';
import wrapper from './wrapper';
import asyncSettings from './react-isomorphic-render-async';

// "Favicon" must be imported on the client side too
// since no assets are emitted on the server side
export { default as icon } from '../assets/images/icon.png'

export default {
  reducer,
  routes,
  wrapper,
  ...asyncSettings
};

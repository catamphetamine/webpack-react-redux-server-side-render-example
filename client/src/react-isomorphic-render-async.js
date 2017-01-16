import { underscoredToCamelCase } from 'react-isomorphic-render';

export default {
  // When supplying `event` instead of `events`
  // as part of an asynchronous Redux action
  // this will generate `events` from `event`
  // using this function.
  asynchronousActionEventNaming: event => ([
    `${event}_PENDING`,
    `${event}_SUCCESS`,
    `${event}_ERROR`
  ]),

  // When using `asynchronousActionHandler`
  // this function will generate a Redux state property name from an event name.
  // E.g. event `GET_USERS_ERROR` => state.`getUsersError`.
  asynchronousActionHandlerStatePropertyNaming: underscoredToCamelCase
};

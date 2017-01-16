import { action, createHandler, stateConnector } from 'react-isomorphic-render'
import settings from '../react-isomorphic-render-async'

const handler = createHandler(settings);

export const get_users = action
({
  namespace: 'USERS',
  event: 'GET_USERS',
  action: async (http) =>
  {
    await delay(1000)
    const user_ids = await http.get('/api/example/users')
    return await Promise.all(user_ids.map(id => http.get(`/api/example/users/${id}`)))
  },
  result: (state, result) =>
  ({
    ...state,
    users: result
  })
},
handler)

handler.addStateProperties('users')

export const add_user = action
({
  namespace: 'USERS',
  event: 'ADD_USER',
  action: async (user, http) =>
  {
    await http.post(`/api/example/users`, user)
  }
},
handler)

export const delete_user = action
({
  namespace: 'USERS',
  event: 'DELETE_USER',
  action: async (id, http) =>
  {
    await http.delete(`/api/example/users/${id}`)
  }
},
handler)

// // A developer can additionally handle any other custom events
// handler.handle('CUSTOM_EVENT', (state, action) =>
// ({
//   ...state,
//   customProperty: action.result
// }))

// A little helper for Redux `@connect()`
export const connector = stateConnector(handler)

const initial_state = { users: [] }

// This is the Redux reducer which now
// handles the asynchronous actions defined above.
export default handler.reducer(initial_state)

// "Sleep" using `Promise`
function delay(delay)
{
  return new Promise(resolve => setTimeout(resolve, delay))
}
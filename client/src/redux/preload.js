import { PRELOAD_STARTED, PRELOAD_FINISHED, PRELOAD_FAILED } from 'react-isomorphic-render'

export default function(state = {}, action = {})
{
  switch (action.type)
  {
    case PRELOAD_STARTED  : return { ...state, pending: true,  error: false }
    case PRELOAD_FINISHED : return { ...state, pending: false }
    case PRELOAD_FAILED   : return { ...state, pending: false, error: action.error }
    default               : return state
  }
}

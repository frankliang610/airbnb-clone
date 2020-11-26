const initState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  if (action.type === 'REGISTER_ACTION') {
    return action.payload;
  } else if (action.type === 'LOGGED_IN_ACTION') {
    return action.payload
  } else if (action.type === 'LOGOUT'){
    return initState;
  }
  return state;
};

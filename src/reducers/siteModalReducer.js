const initState = {
  openClose: 'close',
  content: '',
};

export default (state = initState, action) => {
  if (action.type === 'OPEN_MODAL') {
    return action.payload;
  }
  return state;
};

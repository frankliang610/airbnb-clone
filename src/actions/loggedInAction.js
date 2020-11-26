// eslint-disable-next-line import/no-anonymous-default-export
export default (loggedInObj) => {
  return {
    type: 'LOGGED_IN_ACTION',
    payload: loggedInObj,
  };
};

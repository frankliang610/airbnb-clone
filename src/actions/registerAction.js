// eslint-disable-next-line import/no-anonymous-default-export
export default (regObj) => {
  return {
    type: 'REGISTER_ACTION',
    payload: regObj,
  };
};

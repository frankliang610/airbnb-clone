// eslint-disable-next-line import/no-anonymous-default-export
export default (openClose, content) => {
  return {
    type: 'OPEN_MODAL',
    payload: {
      openClose,
      content,
    },
  };
};

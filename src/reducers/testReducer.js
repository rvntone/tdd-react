const INITIAL_STATE = { value: 1 };
export default (state = INITIAL_STATE, action) => {
  if (action && action.type === 'MI_ACCION') {
    return { value: 2 };
  }
  return state;
};

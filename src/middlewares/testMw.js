export const myMw = store => next => action => () => {
  return next(action);
};

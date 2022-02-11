import ACTIONS from './actions';

const searchReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.SEARCH_START:
      return { ...state, ...payload };
    case ACTIONS.SEARCH_END:
      return { ...state, ...payload };
    case ACTIONS.RESET_SEARCH:
      return { ...state, ...payload };
    case ACTIONS.CHANGE_SEARCH_TERM:
      return { ...state, ...payload };
    case ACTIONS.CHANGE_PAGE:
      return { ...state, ...payload };
    case ACTIONS.SEARCH_ERROR:
      return { ...state, ...payload };
    case ACTIONS.SEARCH_USER_DATA_ERROR:
      return { ...state, ...payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
export default searchReducer;

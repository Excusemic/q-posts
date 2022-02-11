/* eslint-disable react/jsx-no-constructed-context-values */
// DISABLE  /jsx-no-constructed-context-values since SearchContext is a TOP level component

import { useContext, useReducer, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import reducer from '../reducers/searchReducer';
import ACTIONS from '../reducers/searchReducer/actions';
import { getUserByUserData, getPosts } from '../service/api';

const SearchContext = createContext();
const initialState = {
  posts: [],
  page: 1,
  loading: true,
  error: false,
  searchTerm: '',
  totalCount: 0
};
export function SearchContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeSearchTerm = (term) => {
    if (term !== state.searchTerm) {
      return dispatch({
        type: ACTIONS.CHANGE_SEARCH_TERM,
        payload: { searchTerm: term, page: 1 }
      });
    }
    return null;
  };

  const resetSearch = () => {
    if (state.searchTerm) {
      return dispatch({ type: ACTIONS.RESET_SEARCH, payload: { page: 1, searchTerm: '' } });
    }
    return null;
  };

  const changePage = (page) => {
    return dispatch({ type: ACTIONS.CHANGE_PAGE, payload: { page } });
  };
  const handlePostsSearch = async (matchingUsers) => {
    const { error: postsError, data: postsData } = await getPosts(state.page, matchingUsers);
    if (postsError) {
      return dispatch({
        type: ACTIONS.SEARCH_ERROR,
        payload: { loading: false, error: true, posts: [], totalCount: 0 }
      });
    }
    return dispatch({
      type: ACTIONS.SEARCH_END,
      payload: {
        loading: false,
        error: false,
        posts: postsData.data,
        totalCount: Number(postsData.headers['x-total-count'])
      }
    });
  };
  const searchPosts = async () => {
    dispatch({
      type: ACTIONS.SEARCH_START,
      payload: { loading: true, error: false }
    });
    if (!state.searchTerm) {
      // BASIC SEARCH HANDLING (NO SEARCH TERM), FOR PAGINATION OR RESET
      return handlePostsSearch();
    }
    // SEARCH HANDLING WITH SEARCH TERM
    const { error: userDataResponseError, data: userDataResponse } = await getUserByUserData(
      state.searchTerm
    );
    if (userDataResponseError) {
      return dispatch({
        type: ACTIONS.SEARCH_USER_DATA_ERROR,
        payload: { loading: false, error: true, posts: [], totalCount: 0 }
      });
    }
    if (!userDataResponse?.data?.length) {
      return dispatch({
        type: ACTIONS.SEARCH_END,
        payload: { loading: false, error: false, posts: [], totalCount: 0 }
      });
    }
    const matchingUsers = userDataResponse.data.map((userData) => {
      return userData.id;
    });
    return handlePostsSearch(matchingUsers);
  };

  useEffect(() => {
    searchPosts();
  }, [state.page, state.searchTerm]);
  return (
    <SearchContext.Provider value={{ state, resetSearch, changeSearchTerm, changePage }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => {
  return useContext(SearchContext);
};

SearchContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};

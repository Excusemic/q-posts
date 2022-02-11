import axios from 'axios';
import { BASE_URL, SLUGS, LIMIT } from '../utils/constants';

export const getPosts = (page, userIds) => {
  let URL = `${BASE_URL}${SLUGS.posts}?_page=${page}&_limit=${LIMIT}&_embed=comments&_expand=user`;
  if (userIds?.length) {
    userIds.forEach((id) => {
      URL += `&userId=${id}`;
    });
  }
  const response = axios
    .get(URL)
    .then((data) => {
      return { data, error: false };
    })
    .catch((error) => {
      // place to handle various types of error, for placeholder's sake just left with console.log
      console.log(error, 'ERROR FETCHING POSTS'); // <----
      return { data: null, error: true };
    });
  return response;
};

export const getUserByUserData = async (term) => {
  const response = axios
    .get(`${BASE_URL}${SLUGS.users}?q=${term}`)
    .then((data) => {
      return { data, error: false };
    })
    .catch((error) => {
      // place to handle various types of error, for placeholder's sake just left with console.log
      console.log(error, 'ERROR FETCHING USER DATA'); // <----
      return { data: null, error: true };
    });
  return response;
};

export const getSinglePost = async (id) => {
  const URL = `${BASE_URL}${SLUGS.posts}?id=${id}&_embed=comments&_expand=user`;
  const response = axios
    .get(URL)
    .then((data) => {
      return { data, error: false };
    })
    .catch((error) => {
      // place to handle various types of error, for placeholder's sake just left with console.log
      console.log(error, 'ERROR FETCHING POST'); // <----
      return { data: null, error: true };
    });
  return response;
};

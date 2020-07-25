import { useReducer, useEffect } from 'react';
import axios from 'axios';

//Different action types for requests
const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error',
};

//placing cors in order for API to accept the request
//cors issues occur when an api will only accept request from a live server or a specific server
//We are proxing from a live server in order to make the request
const BASE_URL =
  'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

/** Our state changes base on our user actions which the reducer handles
 * This function gets called everytime we call dispatch..
 *  dispatch values passed to action params
 *  state is the current state of application
 */
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };

    default:
      return state;
  }
}

/**
 *
 * @param {*} params
 * @param {*} page
 */
export default function useFetchJobs(params, page) {
  //creating state dispatch & intial state & calls the reducer to handle state changes
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  //used to make http requests
  useEffect(() => {
    //created cancel token to cancel request
    const cancelToken = axios.CancelToken.source();
    //set request to loading state where its "making a request"
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
        console.log(res.data); //view the array of job objects
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });

    return () => {
      cancelToken.cancel();
    };
  }, [params, page]);

  return state;
}

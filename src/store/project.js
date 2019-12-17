import axios from 'axios'
import socket from '../socket';
// ACTION TYPES

import {SET_PROJECT, GET_PROJECT} from './index'
// ACTION CREATORS


export function setProject (project) {
  const action = { type: SET_PROJECT, project };
  return action;
}
export function gotProject (project) {
  const action = { type: GET_PROJECT, project };
  return action;
}

//thunks
export const getProject = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api');
      //will return the array of students set on projects
      dispatch(gotProject(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const selectProject = (project) => {
  return async dispatch => {
    const response = await axios.post('/api', project);
    const data = response.data;
    dispatch(setProject(data));
    socket.emit('select-project', data);
  };
};
// REDUCER
export default function project (state = {}, action) {

  switch (action.type) {

    case SET_PROJECT:
      return action.project;
    case GET_PROJECT:
      return action.project;

    default:
      return state;
  }

}

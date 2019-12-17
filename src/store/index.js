import {
    createStore,
  } from 'redux';
// ACTION TYPES

const UPDATE_NAME = 'UPDATE_NAME';

// ACTION CREATORS

export function updateName (name) {
  const action = { type: UPDATE_NAME, name };
  sessionStorage.setItem('name', name)
  return action;
}

// REDUCER
function reducer (state = 'student', action) {

  switch (action.type) {

    case UPDATE_NAME:
      return action.name;

    default:
      return state;
  }

}

const store = createStore(
    reducer
  );
  
  export default store;

import {createStore, applyMiddleware, combineReducers} from 'redux';
import name from './name';
import project from './project';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import socket from '../socket';
import {selectProject} from '../store/project'

export const UPDATE_NAME = 'UPDATE_NAME';
export const SET_PROJECT = 'SET_PROJECT';
export const GET_PROJECT = 'GET_PROJECT';

socket.on('select-project', project => {
  store.dispatch(selectProject(project));
});

const rootReducer = combineReducers({
  name,
  project,
})

const middleware = 
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })
);

const store = createStore(
    rootReducer, middleware
  );
  
export default store;
export * from './name';
export * from './project';
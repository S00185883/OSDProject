
import {Action, createReducer, on} from '@ngrx/store';
import * as ListActions from '../action/list.actions';

import {List} from 'src/app/components/list/models/list';


export const listFeatureKey = 'list';

export interface ListState {
  lists: List[];

}

export const initialState: ListState = {
lists:[]
};


export const listReducer = createReducer(
  initialState,
  on(ListActions.addList,
    (state: ListState, {list}) =>
      ({...state,
        lists: [...state.lists, list]
      }))
);
export function reducer(state: ListState | undefined, action: Action): any {
  return listReducer(state, action);
}

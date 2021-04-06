import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromList from '../reducer/list.reducer';
export const selectListState = createFeatureSelector<fromList.ListState>(
  fromList.listFeatureKey,
);
export const selectLists = createSelector(
  selectListState,
  (state: fromList.ListState) => state.lists
);
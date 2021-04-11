import { createAction, props } from '@ngrx/store';
import {List} from 'src/app/components/list/models/list';

export const addList = createAction(
  '[List] Add List',

  (list: List) => ({list})
);





import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {List} from 'src/app/components/list/models/list';
import {select, Store} from '@ngrx/store';
import {selectLists} from '../store/selector/list.selectors';
import {ListState} from '../store/reducer/list.reducer';
@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {
    lists$: Observable<List[]>;
    constructor(private store: Store<ListState>) {
      this.lists$ = this.store.pipe(select(selectLists));
    }
  }
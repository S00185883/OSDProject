import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListViewComponent} from './list-view/list-view.component';
import {StoreModule} from '@ngrx/store';
import {listFeatureKey, reducer} from './store/reducer/list.reducer';


@NgModule({
  declarations: [ListViewComponent],
  imports: [
        CommonModule,
        StoreModule.forFeature(listFeatureKey, reducer),
      ],
      exports: [
        ListViewComponent, 
      ]
})
export class ListModule { }

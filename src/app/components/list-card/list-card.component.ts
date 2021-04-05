import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCardComponent {

  @ViewChild('listTitleInput') listTitleInput: any;

  listsTrackFn = (i, list) => list.id;


  constructor(public listsStore: StoreService) {}

  onAddList(ingredient: string){
    this.listsStore.addlist(ingredient); 
    this.listTitleInput.nativeElement.value = '';
  }
}

import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { List } from '../list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  @Input() list: List;
  @Output() complete = new EventEmitter<boolean>();
  @Output() remove = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  task: string;
  tasks = [];

  onClick(){
  	this.tasks.push({name: this.task});
  	this.task = '';
  }
}

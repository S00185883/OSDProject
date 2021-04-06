import { Component, OnInit, Inject } from '@angular/core';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {RecipeService} from 'src/app/services/recipe.service'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { AngularFirestore } from '@angular/fire/firestore';

import { ResultRecipeDetail } from '../../recipe';
import { timestamp, Timestamp } from 'rxjs/internal/operators/timestamp';
import { FirestoreDataService } from 'src/app/services/firestore-data.service';
import { Store } from '@ngrx/store';
import { ListState } from 'src/app/list/store/reducer/list.reducer';
import { List } from 'src/app/models/list';
import { addList } from 'src/app/list/store/action/list.actions';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipe: ResultRecipeDetail;
  base_href: string;
  myDate : string;
  getRecipe = (id: string) => {
    this.http
      .get<ResultRecipeDetail>(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=58e2448b9b28471fa800f9360395d3a4`
      )
      .subscribe((data) => (this.recipe = data));
  };

  constructor(@Inject(APP_BASE_HREF) private baseHref: string,private store: Store<ListState>, private http: HttpClient, private datePipe: DatePipe,private route: ActivatedRoute,private db: AngularFirestore, private recipeservice:RecipeService ) {
    this.base_href = this.baseHref;
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

  }

  ngOnInit(): void {
    
    this.getRecipe(this.route.snapshot.paramMap.get('recipeId'));
  }
  onSave() {
    this.recipe.dateSaved=this.myDate
    let data = this.recipe;
    
   this.recipeservice.createSaveRecipe(data);
}
addList(listName: string): void {
  const list = new List();
  list.ingredient = listName;
  this.store.dispatch(addList(list));
}

onDelete() {
  let data = this.recipe;
  this.recipeservice.deleteRecipe(data);
     
}
}

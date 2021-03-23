import { Component, Inject, Input, OnInit } from '@angular/core';
import {RecipeService} from 'src/app/services/recipe.service'
import { AngularFirestore } from '@angular/fire/firestore'; 
import { Recipe } from 'src/app/recipe';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.css']
})
export class SavedRecipesComponent implements OnInit {
  //@Input() recipe: Recipe[];
  base_href: string;

  constructor( private firestore: AngularFirestore,private recipeservice:RecipeService,@Inject(APP_BASE_HREF) private baseHref: string){}
  ngOnInit() {
    this.getSavedRecipes();
  }

  recipes;

  getSavedRecipes = () =>
    this.recipeservice
      .getSavedRecipes()
      .subscribe(res => (this.recipes = res));

  deleteRecipe = data => this.recipeservice.deleteRecipe(data);
  onDelete() {
    let data = this.recipes;
    this.recipeservice.deleteRecipe(data);
  
       
  }
}
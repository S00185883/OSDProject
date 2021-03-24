import { NgAuthService } from "src/app/services/ng-auth.service";
import { Component, Inject, Input, OnInit } from '@angular/core';
import {RecipeService} from 'src/app/services/recipe.service'
import { AngularFirestore } from '@angular/fire/firestore'; 
import { Recipe } from 'src/app/recipe';
import { APP_BASE_HREF } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  base_href: string;

  constructor(public ngAuthService: NgAuthService,private firestore: AngularFirestore,private recipeservice:RecipeService,@Inject(APP_BASE_HREF) private baseHref: string){}
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
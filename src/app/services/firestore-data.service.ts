import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Recipe} from 'src/app/recipe';
@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {
  recipes: Observable<Recipe[]>;


}

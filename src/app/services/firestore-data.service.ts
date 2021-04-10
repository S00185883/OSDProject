import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Recipe} from 'src/app/recipe';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {
  recipes: Observable<Recipe[]>;
  dataUri = `${environment.databaseUri}/recipe`;
  constructor(private http: HttpClient) { }
  addRecipe(Recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.dataUri, Recipe)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteRecipe(data:string):Observable<Recipe>
  {
    console.log('subscribing to delete');
    let productURI: string = this.dataUri +'/recipe'+ '/' + data;
return this.http.delete<Recipe>(productURI)
.pipe(
  catchError(this.handleError)
)
  }


  getRecipes(): Observable<Recipe[]> {

    console.log("get product called" );
    let getproductURI: string = this.dataUri +'/recipes';

    return this.http.get<Recipe[]>(getproductURI)
      .pipe(
        catchError(this.handleError)
      )
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
 
      console.error('An error occurred:', error.error.message);
    } else {

      
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);



      // question over how much information you want to give to the end-user
      // it depends on who will be using the system
      // this information would not be returned in a public interface but might in an intranet.

      if (error.status == 412) {
        return throwError('412 Error' + JSON.stringify(error.error))
      }

    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}



import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularTiltModule } from 'angular-tilt';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { ListRecipesComponent } from './API/ahh/list-recipes/list-recipes.component';
import { RecipeComponent } from './recipe/recipe.component';
import { HomeComponent } from './components/home/home.component';

import { TruncatePipe } from './trunc';

@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    ListRecipesComponent,
    RecipeComponent,
    HomeComponent,
    TruncatePipe,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularTiltModule,
    HttpClientModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/fire-make-better' }],
  bootstrap: [AppComponent],
})
export class AppModule {}

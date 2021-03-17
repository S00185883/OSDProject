import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularTiltModule } from 'angular-tilt';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { ListRecipesComponent } from './list-recipes/list-recipes.component';
import { RecipeComponent } from './recipe/recipe.component';
import { HomeComponent } from './components/home/home.component';
import { NgAuthService } from "./services/ng-auth.service";
import { TruncatePipe } from './trunc';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';  

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
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    AngularTiltModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule, 
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/home' },NgAuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

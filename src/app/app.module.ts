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
import { RecipeCardComponent } from './Api/recipe-card/recipe-card.component';
import { ListRecipesComponent } from './Api/list-recipes/list-recipes.component';
import { RecipeComponent } from './Api/recipe/recipe.component';
import { HomeComponent } from './components/home/home.component';
import { NgAuthService } from "./services/ng-auth.service";
import { TruncatePipe } from './trunc';
import { CommonModule } from '@angular/common';  
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ProfileComponent } from './components/profile/profile.component';
import { DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './reducers';
import {ListModule} from './list/list.module';



@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    ListRecipesComponent,
    RecipeComponent,
    HomeComponent,
    TruncatePipe,
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ProfileComponent,
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
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, StoreModule.forRoot(reducers, { metaReducers }), !environment.production ? StoreDevtoolsModule.instrument() : [], 
    ListModule

  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/home' },NgAuthService,DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

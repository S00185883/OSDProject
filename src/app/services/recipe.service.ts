import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(   private firestore: AngularFirestore   ) {}
    //Firestore CRUD actions example
    createSaveRecipe(data) {
      return new Promise<any>((resolve, reject) => {
        this.firestore
          .collection("recipe")
          .add(data)
          .then(res => {}, err => reject(err));
      });
    }
  
    updateCoffeeOrder(data) {
      return this.firestore
        .collection("recipe")
        .doc(data.payload.doc.id)
        .set({ completed: true }, { merge: true });
    }
  
    getSavedRecipes() {
      return this.firestore.collection("recipe").snapshotChanges();
    }
  
    deleteRecipe(data) {
      this.firestore.collection('recipe').doc(data).delete();
    }
  }
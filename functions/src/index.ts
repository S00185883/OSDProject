//import libraries
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body 
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

//initialize the database and the collection 
const db = admin.firestore();
const recipeCollection = 'recipe';

//define google cloud function name
export const webApi = functions.https.onRequest(main);
interface Recipe {
    title: String,
    dateSaved: any;
    readyInMinutes: number;
  servings: number;
}

// Create new recipe
app.post('/recipe', async (req, res) => {
    try {
        const recipe: Recipe = {
            title: req.body['title'],
            dateSaved: req.body['dateSaved'],
            readyInMinutes: req.body['readyInMinutes'],
            servings: req.body['servings'],

        }

        const newDoc = await db.collection(recipeCollection).add(recipe);
        res.status(201).send(`Created a new recipe: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`recipe should cointain title, dateSaved, readyInMinutes and servings!!!`)
    }
});
app.get('/recipe', async (req, res) => {
    try {
        const recipeQuerySnapshot = await db.collection(recipeCollection).get();
        const recipes: any[] = [];
        recipeQuerySnapshot.forEach(
            (doc)=>{
                recipes.push({
                    id: doc.id,
                    data:doc.data()
            });
            }
        );
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get('/recipe/:id', (req,res) => {

    const recipeId = req.params.recipeId; 
    db.collection(recipeCollection).doc(recipeId).get()
    .then(recipe => {
        if(!recipe.exists) throw new Error('recipe not found');
        res.status(200).json({id:recipe.id, data:recipe.data()})})
    .catch(error => res.status(500).send(error));
        
});


// Delete a recipe
app.delete('/recipes/:recipeId', (req, res) => {
    db.collection(recipeCollection).doc(req.params.recipeId).delete()
    .then(()=>res.status(204).send("Document successfully deleted!"))
    .catch(function (error) {
            res.status(500).send(error);
    });
})

// Update recipe
app.put('/recipes/:recipeId', async (req, res) => {
    await db.collection(recipeCollection).doc(req.params.recipeId).set(req.body,{merge:true})
    .then(()=> res.json({id:req.params.recipeId}))
    .catch((error)=> res.status(500).send(error))

});
 import * as actionTypes from './actionTypes'
 import axios from '../../axios-orders'
 export const addIngredient = (name) =>{
     return{
         type:actionTypes.ADD_INGREDIENT,
         ingredientName : name
     }
 }


 export const removeIngredient = (name) => {
   return {
     type: actionTypes.REMOVE_INGREDIENT,
     ingredientName: name,
   };
 };

 export const setIngredients =(ingredients) =>{
     return{
        type: actionTypes.SET_INGREDIENT,
        ingredients:ingredients
     }
 }

 export const fetchIngredientsFailed =()=>{
     return{
         type:actionTypes.FETCH_INGREDIENTS_FAILED
     }
 }

//  fetching ingredients asynchrnously
export const fetchIngredients = () =>{
    return dispatch => {
          axios
            .get("https://my-first-app-684db.firebaseio.com/ingredients.json")
            .then((response) => {
              dispatch(setIngredients(response.data))
            })
            .catch((err) => {
              dispatch(fetchIngredientsFailed())
            });
    }
}

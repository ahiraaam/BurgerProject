import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) =>{
    let transformedIngredients = [];
        for (let [ingredient, amount] of Object.entries(props.ingredients)) {
            for (let i = 0; i < amount; i++) {
                transformedIngredients.push(
                    <BurgerIngredient key={ingredient+i} type={ingredient} />
                );
            }
        };
    if(transformedIngredients.length===0){
        transformedIngredients= <p>Please add some ingredients</p>
    }
    /*****SOLUCION DIFICIL***** */
    //Obtenemos las keys del objeto ingredientes
    /*const transformedIngredients = Object.keys(props.ingredients)
    //Recorremos el objetos
        .map(ingKey => {
            //regresamos un arreglo de longitud que tiene, por ejemplo cheese: 2, entonces arreglo de tamaño 2
            return[...Array(props.ingredients[ingKey])].map((_,i) => {
                return <BurgerIngredient key = {ingKey+i} type={ingKey} />
            });
        });
        */
    /******OTRA SOLUCION****** */
    /*let transformedIngredients = [];
        for (let key in props.ingredients) {
            for (let i = 0; i < props.ingredients[key]; i++) {
                transformedIngredients.push(<BurgerIngredient key={key + i} type={key} />);
            }
        }*/

    
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>

        </div>
    )
}
export default burger;
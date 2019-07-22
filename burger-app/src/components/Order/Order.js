import React from 'react';
import classes from './Order.css'
const order = (props) => {
    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push(
            { 
                name: ingredientName, 
                amount: props.ingredients[ingredientName]
            });
    }
    const ingredientOutput = ingredients.map(ig => {
        return <span 
                key={ig.name}
                style={{
                    textTransform: 'uppercase',
                    display:'inline-block',
                    boxShadow: '0 2px 2px #eee',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
            >{ig.name} ({ig.amount})</span>;
    })
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;
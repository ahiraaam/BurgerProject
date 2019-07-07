import React,{ Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7,
}
    

class BurgerBuilder extends Component {
    state = {
        //Estan hardcodeados los ingredientes
        ingredients:{
            salad:0,
            bacon:0,
            meat:0,
            cheese:0
        },
        totalPrice: 4,
        purchasable : false,
        purchasing : false
    }


    purchaseHandler = () => {
        this.setState({purchasing:true})
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler = () =>{
        alert('You Continue');
    }
    updatePurchase(ingredients){
        const sum =  Object.values(ingredients).some(amount => amount > 0);
        /*const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey]
                    })
                    .reduce((sum,el) => {
                        return sum + el;
                    },0 )
        //asignar verdadero si la suma es mayor que 0 */
        this.setState({purchasable: sum>0});
    }


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
        this.updatePurchase(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
        this.updatePurchase(updatedIngredients);

    }
    render(){
        const disableInfo = {
            ...this.state.ingredients,
        }
        //{salad: true, meat:false,....}
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key]<= 0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing}
                        modalClose={this.purchaseCancelHandler}>
                    <OrderSummary ingredients = {this.state.ingredients} 
                                  purchaseCancelled = {this.purchaseCancelHandler}
                                  purchaseContinue = {this.purchaseContinueHandler}
                                  price = {this.state.totalPrice}></OrderSummary>
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                    ingredientRemoved = {this.removeIngredientHandler}
                    ingredientAdded={this.addIngredientHandler}
                    disabled = {disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchasing = {this.purchaseHandler}
                    />
            </Aux>
        )
    }
}

export default BurgerBuilder
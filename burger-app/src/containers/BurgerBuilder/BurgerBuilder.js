import React,{ Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from  '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { ADD_INGREDIENT } from '../../store/actions';
import * as actionTypes  from "../../store/actions";
    

class BurgerBuilder extends Component {
    state = {
        //Estan hardcodeados los ingredientes
        purchasable : false,
        purchasing : false, //Local UI state
        loading: false, //Local UI state
        error: false, //Local UI state
    }

    componentDidMount() {
        /*axios.get('https://burgerapp-react-d03c0.firebaseio.com/ingredients.json')
            .then(response=>{
                this.setState({ingredients:response.data})
            })
            .catch(error =>{
                this.setState({error: true})
            })*/
    }
    purchaseHandler = () => {
        this.setState({purchasing:true})
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler = () =>{
        
        this.props.history.push('/checkout');

        //alert('You Continue');
        //.json solo para firebase
        /*
        */
    }
    updatePurchase(ingredients){
        const sum =  Object.values(ingredients).some(amount => amount > 0);
        /*const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey]
                    })
                    .reduce((sum,el) => {
                        return sum + el;
                    },0 )*/
        //asignar verdadero si la suma es mayor que 0 
                    return sum > 0
    }


    
    render(){
        const disableInfo = {
            ...this.props.ings,
        }
        //{salad: true, meat:false,....}
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key]<= 0
        }
        let order = null

        
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if(this.props.ings){
            burger = (
                <React.Fragment>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        ingredientAdded={this.props.onIngredientAdded}
                        disabled = {disableInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchase(this.props.ings)}
                        purchasing = {this.purchaseHandler}
                    />
                </React.Fragment>
                );
            order = <OrderSummary 
                    ingredients = {this.props.ings} 
                    purchaseCancelled = {this.purchaseCancelHandler}
                    purchaseContinue = {this.purchaseContinueHandler}
                    price = {this.props.price}/>
        }
        if(this.state.loading){
            order = <Spinner/>;
        }
        
        return(
            <Aux>
                <Modal show={this.state.purchasing}
                        modalClose={this.purchaseCancelHandler}>
                    {order}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
        price: state.totalPrice,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
import React, {Component}  from 'react'
import { connect } from "react-redux";
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'



class BurgerBuilder extends Component{

    state ={
        purchasing:false,
    }

    componentDidMount (){
        this.props.onfetchingIngredients()
        // ====code now in redux(actions/burgerBuilder)====
        // axios.get('https://my-first-app-684db.firebaseio.com/ingredients.json').then(response =>{
        //     this.setState({ingredients:response.data})
        // }).catch(err =>{
        //     this.setState({error:true})
        // })
    }

    updatePurchaseState  (ingredients) {
      
        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey]
        }).reduce((sum, el)=>{
            return sum + el
        }, 0);
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({purchasing:true })
    }

    purchaseCancelHandler =() =>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler =() =>{
        this.props.onInitPurchase()
        this.props.history.push('/checkout')

        // const queryParams =[]
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.state.totalPrice)
        // const queryString = queryParams.join('&')
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search:'?' + queryString
        // })
    }

    render(){
        const disabledInfo ={
            ...this.props.ingrs
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        let orderSummary = null
       
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
        if(this.props.ingrs){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingrs} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdd}
                        ingredientRemove={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingrs)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={this.props.ingrs}
                price={this.props.price.toFixed(2)}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} /> 
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        
        // the destructured form of the new state
        // {salad:true, meat:false, bacon:false ...}
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
              
            </Aux>
        ) 
    }
}

const mapStateTpProps =(state) =>{
    return{
        ingrs : state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
      onIngredientAdd: (ingName) => dispatch(actions.addIngredient(ingName)),
      onIngredientRemove: (ingName) => dispatch(actions.removeIngredient(ingName)),
      onfetchingIngredients :() => dispatch(actions.fetchIngredients()),
      onInitPurchase : ()=> dispatch(actions.purchaseInit())
    };
}

export default connect(mapStateTpProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
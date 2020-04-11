import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux'
// import * as actions from '../../store/actions/index'

class Checkout extends Component { 


  // componentWillMount(){
  //   this.props.onInitPurchase()
  // }

    checkoutCancelledHandler = () => {
        console.log('the checkout is successful')
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        console.log('the checki succesfull')
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        let summary = <Redirect to="/" />
        if(this.props.ingrs){
          const purchasedRedirect =this.props.purchased ? <Redirect to="/" /> : null

            summary = (
              <div>
                {purchasedRedirect}
                <CheckoutSummary
                  ingredients={this.props.ingrs}
                  checkoutCancelled={this.checkoutCancelledHandler}
                  checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                  path={this.props.match.path + "/contact-data"}
                  component={ContactData}
                />
              </div>
            );
        }
        return summary
    }
}


const mapStateToProps =(state)=>{
    return {
      ingrs: state.burgerBuilder.ingredients,
      purchased: state.order.purchased
    };
}

// const maptDispatchToProps =(dispatch) =>{
//   return{
//     onInitPurchase : () => dispatch(actions.purchaseInit)
//   }
// }

export default connect(mapStateToProps)(Checkout);
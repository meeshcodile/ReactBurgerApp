import React, {Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component{

    state={
        ingredients:null,
        price:0
    }
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients ={}
        let price = 0
        for (let param of query.entries()){ 
            // ['salad': '1']
            if(param[0] === 'price'){
                price = param[1]
                console.log(price)
            }
            else{
                ingredients[param[0]] = +param[1];
            }  
        }
        this.setState({ingredients:ingredients,totalPrice:price})
    }

    CheckoutCancelledHandler = () =>{
        console.log('the checkout is successful')
        this.props.history.goBack()
    }

    CheckoutContiueHandler = () => {
        console.log('the checki succesfull')
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        return (
          <div>
            <CheckoutSummary
              checkoutCancelled={this.CheckoutCancelledHandler}
              checkoutContinue={this.CheckoutContiueHandler}
              ingredients={this.state.ingredients}
            />
            <Route
              path={this.props.match.path + "/contact-data"}
              render={(props) => (
                <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>
              )}
            />
          </div>
        ); 
    }
}

export default Checkout
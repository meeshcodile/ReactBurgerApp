import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component{
    state={
        name:'',
           email:'',
        address:{
            street:'',
            postalCode:'',
        },
        loading:false
    } 


    orderSubmitHandler = (event) =>{
        event.preventDefault()
         this.setState({loading:true})
        const order ={
            ingredients: this.props.ingredients,
            price:this.props.price,
            customer:{
                name:'misheal',
                address:{
                    street:'abbatoir',
                    zipCode:'3433',
                    country:'Nigeria'
                },
                email:'ezekielmisheal4@gmail.com'
            },
            deliveryMethod:'fastest'
        }

        axios.post('/orders.json', order).then(orders =>{
            console.log(orders)
            this.setState({loading:false})
            this.props.history.push('/')
        }).catch(err =>{
            console.log(err)
            this.setState({loading:false})
        })
    }

    render(){
        let form = (
          <form action="">
            <input
              className={classes.Input}
              type="text"
              name="name"
              placeholder="Your Name"
            />
            <input
              className={classes.Input}
              type="email"
              name="email"
              placeholder=" Email"
            />
            <input
              className={classes.Input}
              type="text"
              name="street"
              placeholder="Your Street"
            />
            <input
              className={classes.Input}
              type="text"
              name="postal"
              placeholder="Your Postal Code"
            />
            <Button btnType="Success" clicked={this.orderSubmitHandler}>
              Order
            </Button>
          </form>
        );
        if(this.state.loading){
            form =<Spinner/>
        }
        return (
          <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
          </div>
        );
    }
}

export default ContactData
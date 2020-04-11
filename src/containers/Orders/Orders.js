import React, {Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    // state= {
    //     orders:[],
    //     loading:false
    // }

    componentDidMount () {
        this.props.onFetchOrders()
        // ==== code now handled by redux====
        // axios.get('/orders.json').then(order =>{
        //     const fetchedOrders = []
        //     for(let key in order.data){
        //         fetchedOrders.push({
        //             ...order.data[key],
        //             id:key
        //         })
        //     }
        //     this.setState({loading:false, orders:fetchedOrders})
        // }).catch(err =>{
        //     console.log(err)
        //     this.setState({ loading: false })

        // })
    }

    render(){
        let orders=<Spinner/>
        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price} />
                    ))
        }
        return orders
    }  
}

const mapStateToProps =(state) =>{
    return{
        orders:state.order.orders, 
        loading:state.order.loading
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        onFetchOrders : ()=> dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
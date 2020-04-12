import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

// synchronous action creators
export const purchaseBurgerSuccess =(id, orderData) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail =(error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START,
    }
}
// asynchronous action creators
export const purchaseBurger =(orderData, token) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart())
         axios
           .post("/orders.json?auth=" + token, orderData)
           .then((response) => {
               console.log(response.data)
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
           })
           .catch((error) => {
                dispatch(purchaseBurgerFail(error));
           });
    }
}

export const purchaseInit =()=>{
    return{
         type:actionTypes.PURCHASE_INIT
    }
}

// action creators for the fetch orders
export const fetchOrdersStart =()=>{
    return{
        type:actionTypes.FECTH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}

// for the actionTypes that the runs the async code synchronously
export const fetchOrders =(token)=>{
    return dispatch =>{
        dispatch(fetchOrdersStart())
        axios.get('/orders.json?auth=' + token).then(order => {
            const fetchedOrders = []
            for (let key in order.data) {
                fetchedOrders.push({
                    ...order.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch(err => {
            console.log(err)
            dispatch(fetchOrdersFail(err))

        }) 
    }
}
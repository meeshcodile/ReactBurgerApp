import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart =()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess =(token, localId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        localId:localId
    }
}

export const authFail =(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout =() =>{
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut =(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth =(email, password, isSignUp)=>{
    return dispatch =>{
        // authenticate the user
        dispatch(authStart())
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwA_N026nTTaVl7-VGrVTomMYpG7EGoOE'
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwA_N026nTTaVl7-VGrVTomMYpG7EGoOE'
        }
        axios.post(url, authData)
        .then(response =>{
            console.log(response.data)
            console.log(response.data.userId)

            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeOut(response.data.expiresIn))
        }).catch(err =>{
            console.log(err.response)
            dispatch(authFail(err.response.data.error))
        })
    }
}
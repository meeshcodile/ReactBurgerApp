import React from 'react'
import Logo from '../../assets/Images/logo.png'
import classes from './Logo.css'

const appLogo = (props) =>(
    <div className={classes.Logo}>
        <img src={Logo} alt="AppLogo"/>
    </div>
)


export default appLogo
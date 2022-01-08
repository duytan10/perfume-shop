import React, { FC } from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'
import Product from '../pages/Product'
import Registration from '../pages/Registration'
import Login from '../pages/Login'
import OAuth2RedirectHandler from '../utils/oauth2/OAuth2RedirectHandler'
import Order from '../pages/Order'
import OrderFinalize from '../components/OrderFinalize'

const Routes: FC = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path="/login" component={Login}/>
            <Route exact path="/registration" component={Registration}/>
            <Route exact path="/activate/:code" component={Login}/>
            <Route exact path='/catalog' component={Catalog} />
            <Route exact path='/product/:id' component={Product} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path="/order" component={Order}/>
            <Route exact path="/order/finalize" component={OrderFinalize}/>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
            <Route path="*" component={Home}/>
        </Switch>
    )
}

export default Routes
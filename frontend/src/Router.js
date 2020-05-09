import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './shared/Home';
import UserList from './userComponent/UserList';
import Signup from './userComponent/Signup';
import Signin from './authComponent/Signin';
import Profile from './userComponent/Profile';
import Navigation from './shared/Navigation';

const Router = () => {
    return(
        <div>
            <Navigation />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/users" component={UserList}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/signin" component={Signin} />
                <Route path="/user/:userId" component={Profile}/>
            </Switch>
        </div>
    );
}

export default Router;
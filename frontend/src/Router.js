import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './shared/Home';
import UserList from './userComponent/UserList';

const Router = () => {
    return(
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/users" component={UserList}/>
            </Switch>
        </div>
    );
}

export default Router;
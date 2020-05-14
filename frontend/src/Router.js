import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Home from './shared/Home';
import UserList from './userComponent/UserList';
import Signup from './userComponent/Signup';
import Signin from './authComponent/Signin';
import Profile from './userComponent/Profile';
import Navigation from './shared/Navigation';
import SideBar from './shared/SideBar';
import PrivateRoute from './authComponent/PrivateRoute';
import EditProfile from './userComponent/EditProfile';
import About from './shared/About';

const Router = () => {
    return(
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Navigation />
                </Grid>
                <Grid item xs={2}>
                    <SideBar />
                </Grid>
                <Grid item xs={7}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/users" component={UserList}/>
                        <Route path="/signup" component={Signup}/>
                        <Route path="/signin" component={Signin} />
                        <Route path="/user/:userId" component={Profile}/>
                        <PrivateRoute path="/edit/:userId" component={EditProfile}/>
                    </Switch>
                </Grid>
                <Grid item xs={3}>
                    <About />
                </Grid>
            </Grid>
        </div>
    );
}

export default Router;
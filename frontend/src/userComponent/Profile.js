import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction' 
import ListItemText from '@material-ui/core/ListItemText' 
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import Person from '@material-ui/icons/Person'
import DeleteUser from './DeleteProfile';
import auth from '../authComponent/helper'
import {read} from './user'
import {Redirect, Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing(3),
      marginTop: theme.spacing(5)
    }),
    title: {
      margin: `${theme.spacing(2)}px ${theme.spacing(1)}px 0`,
      color: theme.palette.protectedTitle,
      fontSize: '1em'
    },
    bigAvatar: {
      width: 60,
      height: 60,
      margin: 10
    }
  }))

const Profile = ({ match }) => {
    const classes = useStyles();
    const [user, setUser] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        const jwt = auth.isAuthenticated()
        read({
        userId: match.params.userId
        }, {t: jwt.token}, signal).then((data) => {
        if (data && data.error) {
        setRedirectToSignin(true)
        } else {
        setUser(data)
        }
        })
        return function cleanup(){
        abortController.abort()
        }
        }, [match.params.userId]);

    if (redirectToSignin) {
        return <Redirect to='/signin'/>
    }

    return (
        <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
        Profile
        </Typography>
        <List dense>
        <ListItem>
        <ListItemAvatar>
        <Avatar>
        <Person/>
        </Avatar>
        </ListItemAvatar>
        <ListItemText primary={user.name} secondary={user.email}/>
        </ListItem>


        <Divider/>
        <ListItem>
        <ListItemText primary={"Joined: " + (
        new Date(user.created)).toDateString()}/>
        </ListItem>
        </List>
        </Paper>
    )
           
}
   

export default Profile;
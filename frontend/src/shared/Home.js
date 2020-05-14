import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import galaxy from './../assets/images/galaxy.jpg';
import auth from '../authComponent/helper'
import Newsfeed from '../postComponent/NewsFeed'

//custom styles
const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 800,
        margin: 'auto',
        marginTop: theme.spacing(3)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400
    }
}));

const Home = () => {
    const classes = useStyles();
    const [defaultPage, setDefaultPage] = useState(false)

    useEffect(() => {
        setDefaultPage(auth.isAuthenticated())
        // const unlisten = history.listen(() => {
        //     setDefaultPage(auth.isAuthenticated())
        // })
        // return () => {
        //     unlisten()
        // }
    }, []);

    return (
        <div className={classes.root}>
            {!defaultPage &&

                <Card className={classes.card}>
                    <Typography variant="h6" className={classes.title}>
                        Home Page
                </Typography>
                    <CardMedia className={classes.media} image={galaxy} title="Galaxy" />
                    <CardContent>
                        <Typography type="body1" component="p">
                            Welcome to the SpaceTime.
                                </Typography>
                    </CardContent>
                </Card>

            }
            {defaultPage &&
                <Newsfeed />
            }
        </div>
    );
}

export default Home;
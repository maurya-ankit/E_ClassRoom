import React, {Component} from 'react'
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Alert from "@material-ui/lab/Alert";
import withStyles from "@material-ui/core/styles/withStyles";
import {Button} from "@material-ui/core";

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
})
class SignOut extends Component{
    render(){
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Alert severity="success">Logged out Successfully </Alert>
                        <Button href={"/signin"}>Signin</Button>
                        <Button href={"/signup"}>Signup</Button>
                    </div></Container>
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(SignOut);
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import {apiUrl} from "../Constant";
import Alert from "@material-ui/lab/Alert";
import {trackPromise} from "react-promise-tracker";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
export function ErrorMessage(props) {
    if(props.message){
    return (
        <Alert severity="error">{props.message} </Alert>
    );
    }
    else {
        return (
            <React.Fragment/>
        )
    }
}
const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
})

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username: "",
            email:  "",
            password1: "",
            password2: "",
            status:null,
            usernameError:"",
            emailError:"",
            password1Error:"",
            password2Error:"",
            isSuccess:false,
            user:"",
        }
    }

    renderBody(){
        const {classes} = this.props;
        const {usernameError, emailError, password1Error, password2Error}=this.state;
        if(!this.state.isSuccess)
        {
            return(
                <React.Fragment>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form className={classes.form} onSubmit={this.onSubmit} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ErrorMessage message={usernameError}/>
                                    <TextField
                                        autoComplete="username"
                                        name="username"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        onChange={e => this.setState({username: e.target.value})}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ErrorMessage message={emailError}/>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={e => this.setState({email: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ErrorMessage message={password1Error}/>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={e => this.setState({password1: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ErrorMessage message={password2Error}/>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="re-password"
                                        label="Re-Password"
                                        type="password"
                                        id="re-password"
                                        autoComplete="current-password"
                                        onChange={e => this.setState({password2: e.target.value})}
                                    />
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link href={"/signin"} variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid></Grid>
                        </form>
                    </div>
                    {/*<Box mt={5}>*/}
                    {/*    <Copyright/>*/}
                    {/*</Box>*/}
                </React.Fragment>
            )
        }
        else{
            return (
                <React.Fragment>
                        <div className={classes.paper}>
                            <Alert severity="success">Congrats {this.state.user} Sign Up Successful </Alert>
                            <Button href={"/signin"}>Login</Button>
                        </div>

                </React.Fragment>
            )
        }
    }


    onSubmit = e => {
        e.preventDefault();
        const signUpData = { username: this.state.username,email:this.state.email,password1: this.state.password1,password2: this.state.password2 };
        trackPromise(axios.post(`${apiUrl}/rest-auth/registration/`, signUpData)
            .then(response => {
                this.setState({
                    status:response.status,
                })
            })
            .catch(error => {
                this.setState({
                    status:error.response.status,
                    usernameError:error.response.data.username,
                    emailError:error.response.data.email,
                    password1Error:error.response.data.password1,
                    password2Error:error.response.data.password2,
                })
                if(error.response.status===500)
                {
                    this.setState({user:error.response.config.data.username,isSuccess:true,})
                }
                localStorage.setItem('token',"")
            }))
    }
    render() {

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                {this.renderBody()}
            </Container>
        );
    }
}
export default withStyles(useStyles)(SignUp);
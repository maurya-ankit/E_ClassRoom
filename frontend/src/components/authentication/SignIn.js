import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import {apiUrl} from "../Constant";
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import {trackPromise} from 'react-promise-tracker';

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
})

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            status: null,
            isLoggedIn: false,
            errorMessage: "",
        }
    }


    onSubmit = e => {
        e.preventDefault();
        const loginData = {username: this.state.username, password: this.state.password};
        trackPromise(axios.post(`${apiUrl}/rest-auth/login/`, loginData)
            .then(response => {
                localStorage.setItem('token', response.data.key);
                axios.get(`${apiUrl}/rest-auth/user/`, {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
                    .then(response => {
                        localStorage.setItem('username', response.data.username)
                    }).catch()
                this.setState({
                    status: response.status,
                    isLoggedIn: true,
                })
            }).catch(error => {
                this.setState({
                    errorMessage: error.response.data.non_field_errors,
                    status: error.response.status
                })
            }))
    }

    renderErrorMessage() {
        if (this.state.status === 400) {
            return (
                <React.Fragment>
                    <Alert severity="error">{this.state.errorMessage} </Alert>
                </React.Fragment>
            )
        }
    }

    renderBody() {
        const {classes} = this.props;
        if (localStorage.getItem('token')) {
            return (
                <React.Fragment>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <div className={classes.paper}>
                            <h4>Already Logged In</h4>
                            Click here to logout <Button onClick={this.handleLogout}>Logout</Button>
                            <Button href={"/"}>Home</Button>
                        </div>
                    </Container>
                </React.Fragment>
            )
        }
        if (this.state.isLoggedIn) {
            return (
                <React.Fragment>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <div className={classes.paper}>
                            <Alert severity="success">Logged In Successfully </Alert>
                        </div>
                    </Container>
                </React.Fragment>
            )
        } else {
            return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        {this.renderErrorMessage()}

                        <form className={classes.form} onSubmit={this.onSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={e => this.setState({username: e.target.value})}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={e => this.setState({password: e.target.value})}
                                autoComplete="current-password"
                            />
                            {/*<FormControlLabel*/}
                            {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                            {/*    label="Remember me"*/}
                            {/*/>*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href={"/signup"} variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    {/*<Box mt={8}>*/}
                    {/*    <Copyright/>*/}
                    {/*</Box>*/}
                </Container>
            )
        }
    }

    render() {


        return (
            <React.Fragment>
                {this.renderBody()}
            </React.Fragment>
        );
    }

    handleLogout = (e) => {
        e.preventDefault();
        localStorage.setItem('token', "")
        localStorage.setItem('username', "")
        this.setState({
            isLoggedIn: false,
        })
    }
}

export default withStyles(useStyles)(SignIn);
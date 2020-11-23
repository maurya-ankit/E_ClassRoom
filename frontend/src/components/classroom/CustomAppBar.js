import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import {Container} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import withStyles from "@material-ui/core/styles/withStyles";
import CreateJoin from "./misc/CreateJoin";
import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import {apiUrl, authToken} from "../Constant";

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    AppBottom: {
        marginBottom: theme.spacing(2),
    },
    ToolBarStyle: {
        display: 'flex',
        justifyContent: 'center'
    },
    toolbarTitle: {
        flex: 1,
    },
})






class CustomAppBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myClasses:[],
            open:false,
            left:false,
        }
    };
    toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({[anchor]: open});
    };
    handleClickOpen = () => {
        this.setState({open:true})
    };

    handleClose = () => {
        this.setState({open:false})

    };
    componentDidMount() {
        trackPromise(axios.get(`${apiUrl}/`,authToken)
            .then(response => {
                this.setState({
                    myClasses:response.data,
                })
            })
            .catch(error =>{
                this.setState({
                    errorMessage:error.data,
                })
            }))
    }

    render() {
        const {myClasses} = this.state
        const {classes} = this.props;
        const list = (anchor) => (
            <div
                className={clsx(classes.list,)}
                role="presentation"
                onKeyDown={this.toggleDrawer(anchor, false)}
            >
                <List>
                    {['Classes'].map((text,index) => (
                        <ListItem button key={index} component="a" href="/">
                            <ListItemIcon>
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {text.toUpperCase().charAt(0)}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider style={{marginBottom: '10px'}}/>
                <List subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Enrolled/Teaching
                    </ListSubheader>}
                >
                    {myClasses.map((Class,index) => (
                        <ListItem button key={index} component="a" href={`/detail/${Class.id}`}>
                            <ListItemIcon>
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {Class.class_name.toUpperCase().charAt(0)}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText primary={Class.class_name}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {[].map((text,index) => (
                        <ListItem button key={index}>
                            <ListItemIcon>
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {text.toUpperCase().charAt(0)}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
        return (
            <div className={classes.root}>
                <AppBar position="static" color='inherit' className={classes.AppBottom}>
                    <Toolbar className={classes.ToolBarStyle}>
                        <IconButton edge="start" onClick={this.toggleDrawer("left", true)} className={classes.menuButton}
                                    color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title} noWrap>
                            E-ClassRoom
                        </Typography>
<CreateJoin/>
                        <Button color="inherit" href={"/signin"}>{localStorage.getItem('username')}</Button>
                    </Toolbar>

                </AppBar>
                <React.Fragment key={"left"}>
                    <Drawer anchor={"left"} open={this.state["left"]} onClose={this.toggleDrawer("left", false)}>
                        {list("left")}
                    </Drawer>

                </React.Fragment>
                <Container maxWidth="lg">
                    {this.props.children}
                </Container>

            </div>
        );
    }
}

export default withStyles(useStyles)(CustomAppBar);
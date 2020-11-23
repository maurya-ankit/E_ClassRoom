import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Folder from "@material-ui/icons/Folder";
import WorkOutlineOutlined from "@material-ui/icons/WorkOutlineOutlined";
import IconButton from "@material-ui/core/IconButton";
import MoreVert from "@material-ui/icons/MoreVert";
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import withStyles from "@material-ui/core/styles/withStyles";
import axios from 'axios';
import {Divider} from "@material-ui/core";
import {apiUrl, authToken} from "../Constant";
import {trackPromise} from "react-promise-tracker";

const useStyles = theme => ({
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(4),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        padding: theme.spacing(1),
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: 350,
        marginRight: 20,
    },
    cardMedia: {
        paddingTop: "56.25%", // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    userIcon: {
        position: "relative",
        width: 100,
        height: 100,
        borderRadius: "50%",
        marginTop: -50,
        marginLeft: "60%",
    },
    moreVert: {
        marginRight: theme.spacing(2),
        padding: theme.spacing(1),
        position: "relative",
        marginBottom: -30,
        marginLeft: "80%",
        zIndex:1,
    },
    infoClass:{
        marginRight: theme.spacing(2),
        padding: theme.spacing(1),
        position: "relative",
        marginBottom: -130,
        maxWidth:"80%"
    },
    infoStyle:{
        paddingLeft:theme.spacing(1),
        marginTop:-10,
        color:"#ffffff"
    },
    button:{
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(2),

    }
})

class ClassGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myClasses:[],
            errorMessage:null,
        }
    }
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
        const {classes} = this.props;
        const {myClasses} = this.state

        return (
            <Container className={classes.cardGrid} maxWidth="xl">
                {/*<div>*/}
                {/*    <Button*/}
                {/*        variant="contained"*/}
                {/*        color="primary"*/}
                {/*        className={classes.button}*/}
                {/*        startIcon={<AssignmentIndIcon/>}*/}
                {/*    >*/}
                {/*        ToDo*/}
                {/*    </Button>*/}
                {/*    <Button*/}
                {/*        variant="contained"*/}
                {/*        color="default"*/}
                {/*        className={classes.button}*/}
                {/*        startIcon={<CalendarTodayOutlined/>}*/}
                {/*    >*/}
                {/*        Calendar*/}
                {/*    </Button>*/}
                {/*</div>*/}

                {/* End hero unit */}
                <Grid container spacing={3}>
                    {myClasses.map((Class) => (
                        <Grid item key={Class.id} href="/detail">
                            <IconButton
                                size="small"
                                className={classes.moreVert}
                                edge="end"
                                color="inherit"
                                aria-label="open more"
                            >
                                <MoreVert/>
                            </IconButton>
                            <div className={classes.infoClass}>
                                <Link href={"/detail/"+Class.id}>
                                    <h2 className={classes.infoStyle}>{Class.class_name}</h2>
                                    <p className={classes.infoStyle}>{Class.section}</p>
                                </Link>
                                <h4 className={classes.infoStyle}>{Class.subject}</h4>


                            </div>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image="https://source.unsplash.com/random"
                                    title="Image title"
                                />
                                <Avatar alt="Remy Sharp" className={classes.userIcon}
                                        src=""
                                />
                                <CardContent className={classes.cardContent}>
                                    <div style={{width:'350px',height:'50px'}}>

                                    </div>

                                </CardContent>
                                <Divider/>
                                <CardActions>
                                    <IconButton
                                        size="small"
                                        className={classes.menuButton}
                                        edge="end"
                                        color="inherit"
                                        // onClick={props.click}
                                        aria-label="open drawer"
                                    >
                                        <WorkOutlineOutlined/>
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        className={classes.menuButton}
                                        edge="end"
                                        color="inherit"
                                        // onClick={props.click}
                                        aria-label="open drawer"
                                    >
                                        <Folder/>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}
export default withStyles(useStyles)(ClassGrid);
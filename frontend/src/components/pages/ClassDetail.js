import CustomAppBar from "../classroom/CustomAppBar";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {Container, Typography} from "@material-ui/core";
import ClassWorkTab from "../classroom/classDetail/ClassWorkTab";
import StreamTab from "../classroom/classDetail/StreamTab";
import PeopleTab from "../classroom/classDetail/PeopleTab";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import {apiUrl, authToken} from "../Constant";
import {trackPromise} from "react-promise-tracker";

const useStyles = theme => ({
    toolbarTitle: {
        flex: 1,
        flexGrow: 1,
        maxWidth: 500,
        position: 'relative',
        marginTop: '-150px',
        marginInline:'auto',
        [theme.breakpoints.down('sm')]: {
            marginTop: '0px',
        },
    },
})


class ClassDetail extends React.Component {
    val = {
        0: <StreamTab id={this.props.match.params.id}/>,
        1: <ClassWorkTab id={this.props.match.params.id}/>,
        2: <PeopleTab id={this.props.match.params.id}/>,
    }
    constructor(props) {
        super(props);
        this.state={
            body:<React.Fragment/>,
            value:0,
            isValid:true,
            errorMessage:"",
        }

    }
    componentDidMount() {
        trackPromise(axios.get(`${apiUrl}/${this.props.match.params.id}`,authToken)
            .then(response => {
                this.setState({
                    isValid:true,
                    body:<StreamTab id={this.props.match.params.id}/>,
                })
            })
            .catch(error =>{
                this.setState({isValid:false,errorMessage:error.response.data.detail})
            }))
    }
    handleChange = (event, newValue) => {
        this.setState({value:newValue,body:this.val[newValue]})
    };
    render() {
        const {classes} = this.props;

        if(this.state.isValid) {
            return (
                <div className="App">
                    <CustomAppBar>
                        <Toolbar>
                            <div
                                className={classes.toolbarTitle}>

                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    variant="fullWidth"
                                    indicatorColor="primary"
                                    textColor="primary"
                                    aria-label="icon label tabs example"
                                >
                                    <Tab label="Stream"/>
                                    <Tab label="Classwork"/>
                                    <Tab label="People"/>
                                </Tabs>

                            </div>
                        </Toolbar>
                        <Container>
                            {this.state.body}
                        </Container>
                    </CustomAppBar>
                </div>
            );
        }
        else if (!this.state.isValid)
        {
            return (
                <div className="App">
                    <CustomAppBar>
                        <Container>
                            <Typography variant="h4" component="p">
                                {this.state.errorMessage}
                            </Typography>
                        </Container>
                    </CustomAppBar>
                </div>
            )
        }
    }
}

export default withStyles(useStyles)(ClassDetail);

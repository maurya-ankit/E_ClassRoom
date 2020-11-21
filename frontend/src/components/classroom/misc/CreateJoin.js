import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {Add} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import CreateClass from "./CreateJoin/CreateClass";
import JoinClass from "./CreateJoin/JoinClass";

export default class CreateJoin extends React.Component {
    constructor() {
        super();
        this.state={
            status:200,
            open:false,
            body:<CreateClass />,
            value:0,
        }
    }
    val={
        0:<CreateClass />,
        1:<JoinClass />,
    }

    handleChange = (event, newValue) => {
        this.setState({value:newValue,body:this.val[newValue]})
    };
    handleClickOpen = () => {
        this.setState({open:true})
    };

    handleClose = () => {
        this.setState({open:false})

    };
    render() {



        return (
            <div>

                <IconButton edge="start" onClick={this.handleClickOpen} style={{marginRight: '5px',}}
                            color="inherit" aria-label="menu"><Add/></IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">

                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="icon label tabs example"
                    >
                        <Tab label="Create Classroom"/>
                        <Tab label="Join Classroom"/>
                    </Tabs>
                    {this.state.body}
                </Dialog>
            </div>
        );
    }
}

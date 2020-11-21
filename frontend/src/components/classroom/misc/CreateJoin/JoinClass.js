import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import axios from "axios";
import {apiUrl, authToken} from "../../../Constant";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Alert from "@material-ui/lab/Alert";

export function ErrorMessage(props){
    if(props.status>300 ||props.status<200) {
        return (
            <React.Fragment>
                <Alert severity="error">
                    <AlertTitle>Error Occured : {props.status}</AlertTitle>
                    {props.message}
                </Alert>
            </React.Fragment>
        )
    }
    else{
        return (<React.Fragment/>)
    }
}



export default class JoinClass extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            class_code:"",
            status:200,
        }
    }

    onSubmit = e => {
        e.preventDefault()
        const JoinData = {
            class_code:this.state.class_code, };
        axios.post(`${apiUrl}/join/`, JoinData,authToken)
            .then(response => {
                console.log(response)
                this.setState({
                    open:false,
                    status:response.status,
                })
            }).catch(error => {
            console.log(error.response)
            this.setState({
                status:error.response.status,
            })
        })
    }
    render() {


        return (
            <React.Fragment>
                <ErrorMessage status={this.state.status} message={"Either ClassCode is not valid or You are already a member"}/>
                <form style={{width:'100%'}}
                      onSubmit={this.onSubmit}
                >
                    <DialogContent>
                        <DialogContentText>
                            Enter ClassCode to join
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            variant="outlined"
                            margin="dense"
                            id="classCode"
                            label="ClassCode"
                            type="text"
                            onChange={e => {this.setState({class_code: e.target.value});console.log(e.target.value)}}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        {/*<Button*/}
                        {/*    fullWidth*/}

                        {/*    variant="contained"*/}
                        {/*    color="secondary">*/}
                        {/*    Cancel*/}
                        {/*</Button>*/}
                        <Button  type="submit"
                                 fullWidth
                                 variant="contained"
                                 color="primary">
                            Join
                        </Button>
                    </DialogActions>
                </form>
            </React.Fragment>
        )
    }
}

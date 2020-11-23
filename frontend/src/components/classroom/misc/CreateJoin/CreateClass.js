import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import axios from "axios";
import {apiUrl, authToken} from "../../../Constant";
import {ErrorMessage} from "./JoinClass";

const CreateFields=['class_name',
    'section',
    'subject',
    'meetUrl',
    'room',]


export default class CreateClass extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            class_name:"",
            section:"",
            subject:"",
            meetUrl:"",
            room:"",
            status:200,
        }
    }
    onSubmit = e => {
        e.preventDefault();
        const CreateData = { class_name:this.state.class_name,
            section:this.state.section,
            subject:this.state.subject,
            meetUrl:this.state.meetUrl,
            room:this.state.room,};
        axios.post(`${apiUrl}/create/`, CreateData,authToken)
            .then(response => {
                window.location.reload(false);
                this.setState({
                status:response.status,
                    open:false,
                })
            }).catch(error => {
                this.setState({
                    status:error.response.status,
                })
            })
    }

    render() {

        return (
            <React.Fragment>
                <ErrorMessage status={this.state.status} message={"Fill all field correctly"}/>
                <form style={{width:'100%'}}
                      onSubmit={this.onSubmit}
                      noValidate
                >
                    <DialogContent>

                        <DialogContentText>
                            fill the details to create E-Classroom
                        </DialogContentText>



                        {CreateFields.map((CreateField) => (  <TextField
                            key={CreateField}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id={CreateField}
                            label={CreateField}
                            name={CreateField}
                            autoComplete={CreateField}
                            onChange={e => {this.setState({[`${CreateField}`]: e.target.value})}}

                        />))}
                    </DialogContent>
                    <DialogActions>
                        {/*<Button*/}
                        {/*    fullWidth*/}
                        {/*    variant="contained"*/}
                        {/*    onClick={this.props.closeMethod}*/}
                        {/*    color="secondary">*/}
                        {/*    Cancel*/}
                        {/*</Button>*/}
                        <Button  type="submit"
                                 fullWidth
                                 variant="contained"
                                 color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </form>

            </React.Fragment>
        )
    }
}

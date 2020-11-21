import React from 'react'
import HeadingItem from "./HeadingItem";
import ListAll from "./ListAll";
import axios from 'axios'
import {apiUrl, authToken} from "../../../Constant";
import {trackPromise} from "react-promise-tracker";


export default class People extends React.Component {
    constructor() {
        super();
        this.state=({
            students:[],
            teachers:[],
            totalStudents:0,
        })
    }
    componentDidMount() {
        trackPromise(axios.get(`${apiUrl}/students/?class_id=${this.props.id}`,authToken)
            .then(response=>{
                console.log(response.data)
                this.setState({
                    students:response.data,
                    totalStudents:response.data.length,
                })
            })
            .catch(error =>{
                console.log(error)
            }))
        trackPromise(axios.get(`${apiUrl}/teachers/?class_id=${this.props.id}`,authToken)
            .then(response=>{
                console.log(response.data)
                this.setState({
                    teachers:response.data,
                    totalTeachers:response.data.length,
                })
            })
            .catch(error =>{
                console.log(error)
            }))
    }

    render() {
        const {students,totalStudents,teachers} = this.state
        return (
            <React.Fragment>
                <HeadingItem title="Teacher"/>
                {teachers.map((teacher,index)=>(
                    <ListAll title={teacher.username} key={index}/>
                ))}
                <HeadingItem title="Students" total={totalStudents+" students"}/>
                {students.map((student,index)=>(
                    <ListAll title={student.username} key={index}/>
                ))}


            </React.Fragment>
        )
    }
}
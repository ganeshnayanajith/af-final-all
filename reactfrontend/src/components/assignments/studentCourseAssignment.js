import React, { Component } from 'react';
import axios from 'axios';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

/* in here, we declare new const variable and assign a function with parameter called props. 
but this is not a javascript function. this is like react component.
so, we can called this react functional component. 
this is a combination of function and component.
when we called this, it render this component. */

const Assignment = props => (
    <tr>
        {/* <td>{props.id}</td> */}
        <td>{props.name}</td>
        <td>{props.publishDate}</td>
        <td>{props.dueDate}</td>
        <td>{props.allocatedMarks}</td>
        <td><input type="button" value="Open" className="btn btn-primary" onClick={props.onClick} id={props.id} /></td>
        {/* <td>
            <Link to={"/books/" + props._id}>Book</Link>
        </td>
        <td>
            <Link to={"/books/" + props._id}>Book</Link>
        </td> */}
    </tr>
);



export default class StudentCourseAssignment extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            assignments: []
        };


    }





    //this methed invoked after rendering home component and it send a get request to api and api send response with all trains
    componentDidMount() {

        if(sessionStorage.getItem('loggedIn')==='true'){
            console.log('log pass');
        }else{
            console.log('log fail');
            this.props.history.push('/user/login');
            
        }


        
        document.title = "Assignments";
        console.log(sessionStorage.getItem('UserID'));

        let currentUrl = window.location.href;
        let courseId = (currentUrl.split('/')[6]);

        console.log(courseId);

        axios.get('http://localhost:4000/node/assignment/bycourse/' + courseId)
            .then(response => {
                console.log(response);
                this.setState({ assignments: response.data.assignments });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onClick(e) {

        console.log(e.target.id);

        this.props.history.push("/user/student/submission/"+e.target.id);


    }



    render() {
        return (


            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">


                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4 text-primary">Assignments</h1>
                                        </div>
                                        <table className="table table-striped" style={{ marginTop: 20 }}>
                                            <thead>
                                                <tr>
                                                    {/* <th>ID</th> */}
                                                    <th>Name</th>
                                                    <th>publish Date</th>
                                                    <th>Due Date</th>
                                                    <th>Allocated Marks</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                                {
                                                    this.state.assignments.map((currentAssignment, i) => (
                                                        <Assignment onClick={this.onClick} id={currentAssignment._id} key={i} name={currentAssignment.name} publishDate={currentAssignment.publishDate} dueDate={currentAssignment.DueDate} allocatedMarks={currentAssignment.allocatedMarks}/>
                                                    ))
                                                }


                                            </tbody>
                                        </table>
                                        <hr />

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </div>


        )
    }
}
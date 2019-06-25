import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

/* in here, we declare new const variable and assign a function with parameter called props. 
but this is not a javascript function. this is like react component.
so, we can called this react functional component. 
this is a combination of function and component.
when we called this, it render this component. */

const Course = props => (
    <tr>
        {/* <td>{props.id}</td> */}
        <td>{props.code}</td>
        <td>{props.name}</td>
        <td><input type="button" value="View Assignments" className="btn btn-primary" onClick={props.onClick} id={props.id} /></td>
        <td><input type="button" value="View Exams" className="btn btn-primary" onClick={props.onClick2} id={props.id} /></td>
        {/* <td>
            <Link to={"/books/" + props._id}>Book</Link>
        </td>
        <td>
            <Link to={"/books/" + props._id}>Book</Link>
        </td> */}
    </tr>
);



export default class CurrentCoursesStudent extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onClick2 = this.onClick2.bind(this);

        this.state = {
            courses: []
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

        
        document.title = "Current Courses";
        console.log(sessionStorage.getItem('UserID'));
        axios.get('http://localhost:4000/node/course/student/current/' + sessionStorage.getItem('UserID'))
            .then(response => {
                console.log(response);
                this.setState({ courses: response.data.courses });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onClick(e) {

        console.log(e.target.id);

        this.props.history.push("/user/student/assignment/"+e.target.id);


    }

    onClick2(e) {

        console.log(e.target.id);

        this.props.history.push("/user/student/exam/"+e.target.id);


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
                                            <h1 className="h4 text-gray-900 mb-4 text-primary">Current Course List</h1>
                                        </div>
                                        <table className="table table-striped" style={{ marginTop: 20 }}>
                                            <thead>
                                                <tr>
                                                    {/* <th>ID</th> */}
                                                    <th>Code</th>
                                                    <th>Name</th>
                                                    <th>Actions</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                                {
                                                    this.state.courses.map((currentCourse, i) => (
                                                        <Course onClick={this.onClick} onClick2={this.onClick2} id={currentCourse._id} key={i} code={currentCourse.code} name={currentCourse.name} />
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
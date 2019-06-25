import React, { Component } from 'react';
import axios from 'axios';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

/* in here, we declare new const variable and assign a function with parameter called props. 
but this is not a javascript function. this is like react component.
so, we can called this react functional component. 
this is a combination of function and component.
when we called this, it render this component. */

const Exam = props => (
    <tr>
        {/* <td>{props.id}</td> */}
        <td>{props.name}</td>
        <td>{props.date}</td>
        <td>{props.venue}</td>
        <td><input type="button" value="Marks" className="btn btn-primary" onClick={props.onClick} id={props.id} /></td>
        {/* <td>
            <Link to={"/books/" + props._id}>Book</Link>
        </td>
        <td>
            <Link to={"/books/" + props._id}>Book</Link>
        </td> */}
    </tr>
);



export default class StudentCourseExam extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            exams: []
        };


    }





    //this methed invoked after rendering home component and it send a get request to api and api send response with all trains
    componentDidMount() {
        document.title = "Exams";


        if(sessionStorage.getItem('loggedIn')==='true'){
            console.log('log pass');
        }else{
            console.log('log fail');
            this.props.history.push('/user/login');
            
        }

        
        console.log(sessionStorage.getItem('UserID'));

        let currentUrl = window.location.href;
        let courseId = (currentUrl.split('/')[6]);

        console.log(courseId);

        axios.get('http://localhost:4000/node/exam/bycourse/' + courseId)
            .then(response => {
                console.log(response);
                this.setState({ exams: response.data.exams });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onClick(e) {

        // console.log(e.target.id);

        // this.props.history.push("/user/student/submission/"+e.target.id);


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
                                            <h1 className="h4 text-gray-900 mb-4 text-primary">Exams</h1>
                                        </div>
                                        <table className="table table-striped" style={{ marginTop: 20 }}>
                                            <thead>
                                                <tr>
                                                    {/* <th>ID</th> */}
                                                    <th>Name</th>
                                                    <th>Date</th>
                                                    <th>Venue</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                                {
                                                    this.state.exams.map((currentExam, i) => (
                                                        <Exam onClick={this.onClick} id={currentExam._id} key={i} name={currentExam.name} date={currentExam.date} venue={currentExam.venue} />
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
import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import Background from '../../images/signinimage.jpg';
import Select from 'react-select';
import swal from 'sweetalert';


export default class AddExam extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeCourses = this.onChangeCourses.bind(this);
        this.onChangeVenue = this.onChangeVenue.bind(this);

        this.onSubmit = this.onSubmit.bind(this);



        this.state = {
            name: '',
            venue: '',
            date: '',
            course: '',
            courses: [],
            courseId: '',
            markSheet: '',
            msg: 'Please Enter All Fields'
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    onChangeVenue(e) {
        this.setState({
            venue: e.target.value
        });
    }




    onChangeCourses(optionSelected) {

        const value = optionSelected.value;
        const label = optionSelected.label;


        console.log(value);
        console.log(label);

        this.setState({
            course: label,
            courseId: value
        });


    }



    // this method invoked after rendering signup component
    componentDidMount() {
        document.title = "Add Exam";

        if (sessionStorage.getItem('loggedIn') === 'true') {
            console.log('log pass');
        } else {
            console.log('log fail');
            this.props.history.push('/user/login');

        }




        axios.get('http://localhost:4000/node/course/all')
            .then(response => {
                console.log(response);

                const courseList = [];

                for (var i = 0; i < response.data.courses.length; i++) {
                    const obj = {
                        label: response.data.courses[i].code,
                        value: response.data.courses[i]._id
                    }

                    courseList.push(obj);
                }


                this.setState({
                    courses: courseList
                });



            }).catch(err => {
                console.log(err);
            });

    }

    // this method invoked after clicking on signup button in the signup page
    onSubmit(e) {
        e.preventDefault();

        // console.log(`Form submitted:`);
        // console.log(`UserName: ${this.state.username}`);
        // console.log(`Email: ${this.state.email}`);
        // console.log(`Confirm Password: ${this.state.confirmPassword}`);
        // console.log(`Password: ${this.state.password}`);
        // console.log(`Type: ${this.state.type}`);

        if (this.state.name !== '' && this.state.name !== null) {
            if (this.state.date !== '' && this.state.date !== null) {
                if (this.state.venue !== '' && this.state.venue !== null) {
                    if (this.state.course.length > 0) {


                        //                 if (this.state.confirmPassword === this.state.password) {

                        const assignment = {
                            name: this.state.name,
                            date: this.state.date,
                            venue: this.state.venue,
                            course: this.state.courseId,
                            markSheet: ''
                        }

                        //send post request to the backend server
                        axios.post('http://localhost:4000/node/exam/add', assignment)
                            .then(result => {

                                console.log(result);

                                this.setState({
                                    name: '',
                                    date: '',
                                    venue: '',
                                    course: '',
                                    courses: [],
                                    courseId: '',
                                    markSheet: '',
                                    msg: 'Please Enter All Fields'
                                });
                                swal("Success !", "Exam Added Sucessfully !", "success");
                                //after success signup go to this login route and load the login component 
                                this.props.history.push("/");

                            }).catch(error => {
                                console.log(error);
                                this.setState({
                                    msg: 'Wrong Username or Username Exists'
                                });
                                swal("Failed !", "Something Went Wrong", "error");
                            });

                        //                 } else {
                        //                     this.setState({
                        //                         msg: 'Password Mismatch'
                        //                     });
                        //                 }


                    } else {
                        this.setState({ msg: '***** Please Enter Password Again For Confirmation *****' });
                        swal("Failed !", "Please Select A Course", "warning");
                    }
                } else {
                    this.setState({ msg: '***** Please Enter Password *****' });
                    swal("Failed !", "Please Enter A Venue", "warning");
                }
            } else {
                this.setState({ msg: '***** Please Enter Email *****' });
                swal("Failed !", "Please Enter Due Date", "warning");
            }
        } else {
            this.setState({ msg: '***** Please Enter UserName *****' });
            swal("Failed !", "Please Enter Name", "warning");
        }

    }

    render() {
        return (





            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Add A New Exam</h1>
                                            </div>
                                            <hr />
                                            <form className="user">
                                                <div className="form-group">
                                                    <label>Name : </label>
                                                    <input value={this.state.name} onChange={this.onChangeName} type="text" className="form-control form-control-user" placeholder="Name" />
                                                </div>
                                                <div className="form-group">
                                                    <label>Due Date : </label>
                                                    <input value={this.state.date} onChange={this.onChangeDate} type="date" className="form-control form-control-user" />
                                                </div>
                                                <div className="form-group">
                                                    <label>Venue : </label>
                                                    <input value={this.state.venue} onChange={this.onChangeVenue} type="text" className="form-control form-control-user" placeholder="Venue" />
                                                </div>
                                                <div className="form-group">

                                                    <label>Course :</label>

                                                    <Select options={this.state.courses} onChange={this.onChangeCourses} />
                                                </div>
                                                <a href="#" className="btn btn-primary btn-user btn-block" onClick={this.onSubmit}>Add</a>
                                            </form>
                                            <hr />

                                        </div>
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
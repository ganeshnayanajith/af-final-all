import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import Background from '../images/signupimage.jpg';
import swal from 'sweetalert';


const Instructor = props => (

    <div className='form-group'>
        <label>{props.username}
            <input type='checkbox' name={props.id} className='form-check' onChange={props.onChange} />
        </label>
    </div>
);

export default class AddCourse extends Component {

    constructor(props) {
        super(props);

        this.onChangeCode = this.onChangeCode.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCheck = this.onChangeCheck.bind(this);

        this.onSubmit = this.onSubmit.bind(this);





        this.state = {
            code: '',
            name: '',
            checkBoxes: [],
            instructors: [],
            students: [],
            msg: 'Please Enter All Fields'
        }
    }

    onChangeCode(e) {
        this.setState({
            code: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }


    onChangeCheck(e) {
        console.log(e.target.name)

        if (e.target.checked) {
            const array = this.state.checkBoxes;
            array.push(e.target.name)
            this.setState({
                checkBoxes: array
            })
        } else {
            const array = this.state.checkBoxes;
            const index = array.indexOf(e.target.name);
            console.log(index)
            array.splice(index, 1);
            console.log(array);
            this.setState({
                checkBoxes: array
            })
        }
    }





    // this method invoked after rendering signup component
    componentDidMount() {
        document.title = "Add Course";

        if (sessionStorage.getItem('loggedIn') === 'true') {
            console.log('log pass');
        } else {
            console.log('log fail');
            this.props.history.push('/user/login');

        }

        axios.get('http://localhost:4000/node/user/instructors').then(response => {
            console.log(response.data.instructors);
            this.setState({
                instructors: response.data.instructors
            });
        }).catch(err => {
            console.log(err)
        })
    }


    // this method invoked after clicking on signup button in the signup page
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Code: ${this.state.code}`);
        console.log(`Name: ${this.state.name}`);
        console.log(`Status: ${this.state.status}`);
        console.log(`instructors: ${this.state.checkBoxes}`);

        if (this.state.code !== '' && this.state.code !== null) {
            if (this.state.name !== '' && this.state.name !== null) {
                if (this.state.checkBoxes.length>0) {

                    const newIns = [];

                    this.state.checkBoxes.forEach(element => {
                        const newObj = {
                            instructor: element,
                            status: 'notaccepted'
                        }
                        newIns.push(newObj);
                    });


                    console.log(this.state.instructors);
                    console.log(this.state.checkBoxes);
                    const course = {
                        code: this.state.code,
                        name: this.state.name,
                        instructors: newIns,
                        students: []
                    };

                    //send post request to the backend server
                    axios.post('http://localhost:4000/node/course/add/', course)
                        .then(result => {

                            console.log(result);

                            this.setState({
                                code: '',
                                name: '',
                                checkBoxes: [],
                                instructors: [],
                                students: [],
                                msg: 'Please Enter All Fields'
                            });

                            swal("Success !", "Course Added Sucessfully !", "success");
                            //after success signup go to this login route and load the login component 
                            this.props.history.push("/");

                        }).catch(error => {
                            console.log(error);
                            this.setState({
                                msg: 'Something Went Wrong'
                            });
                            swal("Failed !", "Something Went Wrong", "error");
                        });





                } else {
                    this.setState({ msg: '***** Please Select One Or More Instructors *****' });
                    swal("Failed !", "Please Select One Or More Instructors", "warning");
                }
            } else {
                this.setState({ msg: '***** Please Enter Course Name *****' });
                swal("Failed !", "Please Enter Course Name", "warning");
            }
        } else {
            this.setState({ msg: '***** Please Enter Course Code *****' });
            swal("Failed !", "Please Enter Course Code", "warning");
        }

    }

    render() {
        return (

            // <div style={{ marginTop: 20 }}>

            //     <div className="form-group" >
            //         <label>{this.state.msg}</label>
            //     </div>

            //     <h3 className=" text-primary"><b>Add Course</b></h3>
            //     <form onSubmit={this.onSubmit}>
            //         <div className="form-group">
            //             <label>Course Code: </label>
            //             <input type="text"
            //                 className="form-control"
            //                 value={this.state.code}
            //                 onChange={this.onChangeCode}
            //             />
            //         </div>
            //         <div className="form-group">
            //             <label>Course Name: </label>
            //             <input type="text"
            //                 className="form-control"
            //                 value={this.state.name}
            //                 onChange={this.onChangeName}
            //             />
            //         </div>


            //         <div className='form-group'>
            //             {
            //                 this.state.instructors.map((currentInstructor, i) => (
            //                     <Instructor id={currentInstructor._id} key={i} username={currentInstructor.username} onChange={this.onChangeCheck} />
            //                 )
            //                 )
            //             }
            //         </div>


            //         <div className="form-group">
            //             <input type="submit" value="Add" className="btn btn-primary" />
            //         </div>
            //     </form>
            // </div>




            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <img src={Background} style={{ margin: '100px' }} alt="IMG" />
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Add A New Course</h1>
                                            </div>
                                            <hr />
                                            <form className="user">
                                                <div className="form-group">
                                                    <input value={this.state.code} onChange={this.onChangeCode} type="text" className="form-control form-control-user" aria-describedby="emailHelp" placeholder="Course Code" />
                                                </div>
                                                <div className="form-group">
                                                    <input value={this.state.name} onChange={this.onChangeName} type="text" className="form-control form-control-user" aria-describedby="emailHelp" placeholder="Course Name" />
                                                </div>
                                                <hr />
                                                <div className='form-group'>
                                                    {
                                                        this.state.instructors.map((currentInstructor, i) => (
                                                            <Instructor id={currentInstructor._id} key={i} username={currentInstructor.username} onChange={this.onChangeCheck} />
                                                        )
                                                        )
                                                    }
                                                </div>

                                                <a href="index.html" className="btn btn-primary btn-user btn-block" onClick={this.onSubmit}>Add</a>
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
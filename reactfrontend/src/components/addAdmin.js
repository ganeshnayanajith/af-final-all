import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import Background from '../images/signinimage.jpg';
import swal from 'sweetalert';


export default class AddAdmin extends Component {

    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            email: '',
            confirmPassword: '',
            password: '',
            type: 'admin',
            msg: 'Please Enter All Fields'
        }
    }

    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }



    // this method invoked after rendering signup component
    componentDidMount() {
        document.title = "Add Admin";

        if (sessionStorage.getItem('loggedIn') === 'true') {
            console.log('log pass');
        } else {
            console.log('log fail');
            this.props.history.push('/user/login');

        }

        if (sessionStorage.getItem('loggedIn') === 'true') {
            console.log('log pass');
        } else {
            console.log('log fail');
            this.props.history.push('/user/login');

        }


    }

    // this method invoked after clicking on signup button in the signup page
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`UserName: ${this.state.username}`);
        console.log(`Email: ${this.state.email}`);
        console.log(`Confirm Password: ${this.state.confirmPassword}`);
        console.log(`Password: ${this.state.password}`);
        console.log(`Type: ${this.state.type}`);

        if (this.state.username !== '' && this.state.username !== null) {
            if (this.state.email !== '' && this.state.email !== null) {
                if (this.state.password !== '' && this.state.password !== null) {
                    if (this.state.confirmPassword !== '' && this.state.confirmPassword !== null) {


                        if (this.state.confirmPassword === this.state.password) {

                            const user = {
                                username: this.state.username,
                                email: this.state.email,
                                confirmPassword: this.state.confirmPassword,
                                password: this.state.password,
                                type: this.state.type
                            }

                            //send post request to the backend server
                            axios.post('http://localhost:4000/node/user/signup/', user)
                                .then(result => {

                                    console.log(result);

                                    this.setState({
                                        username: '',
                                        email: '',
                                        confirmPassword: '',
                                        password: '',
                                        type: 'admin',
                                        msg: 'Please Enter All Fields'
                                    });

                                    swal("Success !", "Admin Added Sucessfully !", "success");

                                    //after success signup go to this login route and load the login component 
                                    this.props.history.push("/");

                                }).catch(error => {
                                    console.log(error);
                                    this.setState({
                                        msg: 'Wrong Username or Username Exists'
                                    });
                                    swal("Failed !", "Wrong Email Format or Username Exists", "error");

                                });

                        } else {
                            this.setState({
                                msg: 'Password Mismatch'
                            });
                            swal("Failed !", "Password Mismatch", "error");
                        }


                    } else {
                        this.setState({ msg: '***** Please Enter Password Again For Confirmation *****' });
                        swal("Failed !", "Please Enter Password Again", "warning");
                    }
                } else {
                    this.setState({ msg: '***** Please Enter Password *****' });
                    swal("Failed !", "Please Enter Password", "warning");
                }
            } else {
                this.setState({ msg: '***** Please Enter Email *****' });
                swal("Failed !", "Please Enter Email", "warning");
            }
        } else {
            this.setState({ msg: '***** Please Enter UserName *****' });
            swal("Failed !", "Please Enter UserName", "warning");
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
                                    <div className="col-lg-6">
                                        <img src={Background} style={{ margin: '100px' }} alt="IMG" />
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Add A New Admin</h1>
                                            </div>
                                            <hr />
                                            <form className="user">
                                                <div className="form-group">
                                                    <input value={this.state.username} onChange={this.onChangeUserName} type="text" className="form-control form-control-user" aria-describedby="emailHelp" placeholder="Username" />
                                                </div>
                                                <div className="form-group">
                                                    <input value={this.state.email} onChange={this.onChangeEmail} type="email" className="form-control form-control-user" aria-describedby="emailHelp" placeholder="Email Address" />
                                                </div>
                                                <div className="form-group">
                                                    <input value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword} type="password" className="form-control form-control-user" placeholder="Password" />
                                                </div>
                                                <div className="form-group">
                                                    <input value={this.state.password} onChange={this.onChangePassword} type="password" className="form-control form-control-user" placeholder="Confirm Password" />
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
import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import Background from '../images/download.png';
import swal from 'sweetalert';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            msg: 'Enter Your Credentials'
        }
    }

    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    componentDidMount() {
        document.title = "Login";
    }

    // this method invoked after clicking on login button in the login page
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Email: ${this.state.username}`);
        console.log(`Password: ${this.state.password}`);

        //create new user object 
        const user = {
            username: this.state.username,
            password: this.state.password
        }


        if (this.state.username !== '' && this.state.username !== null) {
            if (this.state.password !== '' && this.state.password !== null) {


                //send post request to the backend server 
                axios.post('http://localhost:4000/node/user/login/', user)
                    .then(result => {

                        console.log(result);

                        let UserData = result.data;

                        console.log(UserData);
                        console.log('id ' + UserData.user[0]._id);
                        console.log('username ' + UserData.user[0].username);
                        console.log('email ' + UserData.user[0].email);
                        console.log('password ' + UserData.user[0].password);
                        console.log('type ' + UserData.user[0].type);

                        //create session variables and assign currently logged user details as values
                        sessionStorage.setItem('loggedIn', 'true');
                        sessionStorage.setItem('UserID', UserData.user[0]._id);
                        sessionStorage.setItem('UserName', UserData.user[0].username);
                        sessionStorage.setItem('UserEmail', UserData.user[0].email);
                        sessionStorage.setItem('UserPassword', UserData.user[0].password);
                        sessionStorage.setItem('UserType', UserData.user[0].type);

                        this.setState({
                            username: '',
                            password: '',
                            msg: 'Enter Your Credentials'
                        });

                        swal("Success !", "Login Sucessfull !", "success");


                        this.props.history.push("/");
                        let{history} = this.props;
                        history.push({
                            pathname:'/',
                            state: {detail : UserData}
                        });
                        window.location.reload();

                    }).catch(error => {
                        console.log(error);
                        this.setState({
                            msg: 'Invalid Credentials'
                        });

                        swal("Failed !", "Check Your Credentials", "error");
                    });



            } else {
                this.setState({ msg: '***** Please Enter Password  *****' });
                swal("Failed !", "Please Enter Password", "warning");
            }
        } else {
            this.setState({ msg: '***** Please Enter Username *****' });
            swal("Failed !", "Please Enter Username", "warning");
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
                                                <h1 className="h4 text-gray-900 mb-4">Welcome To ABC Institute</h1>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input value={this.state.username} onChange={this.onChangeUserName} type="text" className="form-control form-control-user" aria-describedby="emailHelp" placeholder="Username" />
                                                </div>
                                                <div className="form-group">
                                                    <input value={this.state.password} onChange={this.onChangePassword} type="password" className="form-control form-control-user" placeholder="Password" />
                                                </div>
                                                <a href="index.html" className="btn btn-primary btn-user btn-block" onClick={this.onSubmit}>Login</a>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <a className="small" href="register.html">Create an Account!</a>
                                            </div>
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
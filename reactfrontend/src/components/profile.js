import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import Background from '../images/user.jpg';

export default class Profile extends Component {

    constructor(props) {
        super(props);


    }

    componentDidMount(){
        if(sessionStorage.getItem('loggedIn')==='true'){
            console.log('log pass');
        }else{
            console.log('log fail');
            this.props.history.push('/user/login');
            
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
                                    <div className="col-lg-4">
                                        <img src={Background} style={{ margin: '50px',width:'350px' }} alt="IMG" />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">User Profile</h1>
                                            </div>
                                            <hr />
                                            <table>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label><b>User ID  </b></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label><b>: </b></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label>{sessionStorage.getItem('UserID')}</label>
                                                        </div>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label><b>Username  </b></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label><b>: </b></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label>{sessionStorage.getItem('UserName')}</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label><b>Email  </b></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label><b>:</b></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label>{sessionStorage.getItem('UserEmail')}</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label><b>Role  </b></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label><b>: </b></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label>{sessionStorage.getItem('UserType')}</label>
                                                        </div>
                                                    </td>
                                                </tr>






                                            </table>
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
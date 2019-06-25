import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class NavBarLogin extends Component {

    /* this class render the navbar according to the login and user type. check the session variables and change navbar */

    render() {

        let logged = sessionStorage.getItem('loggedIn');
        let type = sessionStorage.getItem('UserType');
        if (logged === 'true') {


            if (type === 'admin') {
                return (
                    <ul className="navbar-nav ml-auto">
                         <li className="nav-item">
                            <Link to="/user/admin/instructors" className="nav-link"><b>Instructors</b></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user/admin/add/admin" className="nav-link"><b>Add Admin</b></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user/admin/add/instructor" className="nav-link"><b>Add Instructor</b></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user/admin/add/course" className="nav-link"><b>Add Course</b></Link>
                        </li>
                        
                        <li className="navbar-item">
                            <Link to="/user/logout" className="nav-link"><b>Logout</b></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user/profile" className="nav-link text-warning"><b>{sessionStorage.getItem('UserName')}</b></Link>
                        </li>
                    </ul>
                );
            }



            if (type === 'instructor') {
                return (
                    <ul className="navbar-nav ml-auto">
                        <li className="navbar-item">
                            <Link to="/user/instructor/newcourses" className="nav-link"><b>New Courses</b></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user/instructor/currentcourses" className="nav-link"><b>Current Courses</b></Link>
                        </li>
                       
                        <li className="navbar-item">
                            <Link to="/user/instructor/add/assignment" className="nav-link"><b>Add Assignment</b></Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/user/instructor/add/exam" className="nav-link"><b>Add Exam</b></Link>
                        </li>
                       
                        <li className="navbar-item">
                            <Link to="/user/logout" className="nav-link"><b>Logout</b></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user/profile" className="nav-link text-warning"><b>{sessionStorage.getItem('UserName')}</b></Link>
                        </li>
                    </ul>
                );
            }


            if (type === 'student') {
                return (
                    <ul className="navbar-nav ml-auto">
                        <li className="navbar-item">
                            <Link to="/user/student/newcourses" className="nav-link"><b>New Courses</b></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user/student/currentcourses" className="nav-link"><b>Registered Courses</b></Link>
                        </li>
                       
                        
                        <li className="navbar-item">
                            <Link to="/user/logout" className="nav-link"><b>Logout</b></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user/profile" className="nav-link text-warning"><b>{sessionStorage.getItem('UserName')}</b></Link>
                        </li>
                    </ul>
                );
            }






        } else {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="navbar-item">
                        <Link to="/user/courses" className="nav-link"><b>Courses</b></Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/user/login" className="nav-link"><b>Login</b></Link>
                    </li>
                    <li className="navbar-item">

                        <Link to="/user/signup" className="nav-link"><b>SignUp</b></Link>
                    </li>
                </ul>
            );
        }

    }
}
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBarLogin from './components/navBarLoginComponent';
import Login from './components/loginComponent';
import Logout from "./components/logoutComponent";
import AddAdmin from "./components/addAdmin";
import AddInstructor from "./components/addInstructor";
import AddStudent from "./components/addStudent";
import AddCourse from './components/addCourse';
import NewCoursesInstructor from './components/newCoursesInstrcutor';
import CurrentCoursesInstructor from './components/currentCoursesInstructor';
import NewCoursesStudent from './components/newCoursesStudent';
import CurrentCoursesStudent from './components/currentCoursesStudent';
import Home from './components/home';
import Profile from './components/profile';
import Courses from './components/courses';
import AddAssignment from './components/assignments/addAssignment';
import StudentCourseAssignment from './components/assignments/studentCourseAssignment';
import stdAssUpload from './components/submission/stdAssUpload';
import InstructorCourseAssignment from './components/assignments/instructorCourseAssignment';
import assignmentMarks from './components/submission/assignmentMarks';
import instructorAssignment from './components/submission/instructorAssignment';


import Footer from './footer';
import Background from './images/main.png';
import AddExam from './components/exams/addExam';
import StudentCourseExam from './components/exams/studentCourseExam';
import InstructorCourseExam from './components/exams/instructorCourseExam';
import examMarks from './components/submission/examMarks';
import Instructors from './components/instructors';


function App() {
  return (
    <Router>
     



        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <div className="container">
            <a className="navbar-brand" href="/"><img src={Background}  style={{margin:'1px',width:'70px'}} alt="IMG"/></a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <NavBarLogin />

            </div>
          </div>
        </nav>









        <Route path="/" exact component={Home} />
        <Route path="/user/login" component={Login} />
        <Route path="/user/logout" component={Logout} />
        <Route path="/user/admin/add/admin" component={AddAdmin} />
        <Route path="/user/admin/add/instructor" component={AddInstructor} />
        <Route path="/user/signup" component={AddStudent} />
        <Route path="/user/admin/add/course" component={AddCourse} />
        <Route path="/user/instructor/newcourses" component={NewCoursesInstructor} />
        <Route path="/user/instructor/currentcourses" component={CurrentCoursesInstructor} />
        <Route path="/user/student/newcourses" component={NewCoursesStudent} />
        <Route path="/user/student/currentcourses" component={CurrentCoursesStudent} />
        <Route path="/user/profile" component={Profile} />
        <Route path="/user/courses" component={Courses} />


        <Route path="/user/instructor/add/assignment" component={AddAssignment} />
        <Route path="/user/student/assignment/:course" component={StudentCourseAssignment} />
        <Route path="/user/student/submission/:assignment" component={stdAssUpload} />
        <Route path="/user/instructor/assignment/:course" component={InstructorCourseAssignment} />
        <Route path="/user/instructor/submission/:assignment" component={assignmentMarks} />
        <Route path="/user/instructor/allsubmission/:assignment" component={instructorAssignment} />

        <Route path="/user/instructor/add/exam" component={AddExam} />
        <Route path="/user/student/exam/:course" component={StudentCourseExam} />
        <Route path="/user/instructor/exam/:course" component={InstructorCourseExam} />
        <Route path="/user/instructor/exammarkupload/:exam" component={examMarks} />

        <Route path="/user/admin/instructors" component={Instructors} />
        


        


        <Footer/>
      


    </Router>
  );
}

export default App;

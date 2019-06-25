import React, { Component } from 'react';
import axios from 'axios';
import './submittedList.css';
import Background from '../../images/fileIcon.jpg';

const TableData = props => (
    <tr>
        <td >
            <div className='stdIdRow'>
                {props.sub.studentId}
            </div>
        </td>
        <td>
            <div className='fileRow'>
                <a href={props.sub.filePath}><img src={Background} style={{ width: '50px', height: '50px' }} alt="IMG" />Download</a>
            </div>
        </td>
    </tr>
)

class instructorAssignment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submissions: []
        }

    }
    componentDidMount() {


        if(sessionStorage.getItem('loggedIn')==='true'){
            console.log('log pass');
        }else{
            console.log('log fail');
            this.props.history.push('/user/login');
            
        }

        let currentUrl = window.location.href;
        let assignmentId = (currentUrl.split('/')[6]);

        console.log(assignmentId);


        axios.get('http://localhost:4000/node/submission/' + assignmentId).then(resolve => {
            this.setState({
                submissions: resolve.data.data
            })
        })
    }

    render() {
        return (
            <div className='card cardView'>
                <div className='card-header'>
                    <div className='card-title'><h2>Submitted Assignments</h2></div>
                </div>
                <div className='card-body'>
                    <table className='tableView table-bordered'>
                        <thead>
                            <tr className='table-info'>

                                <th>
                                    <div className='stdIdRow '><h3>Student Id</h3></div></th>

                                <th><div className='fileRow'><h3>File</h3></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.submissions.map(function (object, i) {
                                    return <TableData sub={object} key={i} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default instructorAssignment;
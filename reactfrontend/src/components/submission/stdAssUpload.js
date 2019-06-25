import React , {Component} from 'react';
import axios from 'axios';
import './submission.css';
import Background from '../../images/fileIcon.jpg';

class stdAssUpload extends Component{


    constructor(props){
        super(props);


        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.state={
            assignmentID:'',
            dueDate:'',
            name:'',
            timeRemaining:'',
            lastModified:'',
            previousFile:'',
            assignment:null,
            file:null,
            status:'',
            fileName:'Choose File',
            submissionFile:null,
            subId:'',
            markSheet:'',
            overDueStatus:false
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



        axios.get('http://localhost:4000/node/assignment/'+assignmentId).then(resolve=>{
            console.log(resolve);
            console.log(resolve.data.data._id)

            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            const date1 = new Date(today);
            const date2 = new Date(resolve.data.data.DueDate.substring(0, 10));
            let delta = date2.getTime() - date1.getTime();
            let days = Math.floor(delta / 86400000);
            delta -= days * 86400;

            let hours = Math.floor(delta / 3600000) % 24;
            delta -= hours * 3600;

            let minutes = Math.floor(delta / 60000) % 60;
            console.log(days)
            if(days>0){
                this.setState({
                    timeRemaining:days+' days '+hours+' hours and '+minutes+' minutes'
                })
            }else if(days==0){
                this.setState({
                    timeRemaining:hours+' hours and '+minutes+' minutes'
                })
            }else{
                this.setState({
                    timeRemaining:'Over Due',
                    overDueStatus:true
                })
            }
            console.log(days);
            console.log('http://localhost:4000/node/submission/'+sessionStorage.getItem('UserID')+'/'+resolve.data.data._id);
            
            axios.get('http://localhost:4000/node/submission/'+sessionStorage.getItem('UserID')+'/'+resolve.data.data._id).then(submission=>{
                console.log(submission);
                if(submission.data.data.length == 0 ){
                    console.log("empty");
                    this.setState({
                        assignmentID:resolve.data.data._id,
                        dueDate:resolve.data.data.DueDate.substring(0, 10),
                        status:'Not Uploaded',
                        name:resolve.data.data.name,
                        assignment:resolve.data.data.file,
                        markSheet:resolve.data.data.markSheet
                    })
                }else{
                    console.log(submission.data.data);
                    this.setState({
                        assignmentID:resolve.data.data._id,
                        dueDate:resolve.data.data.DueDate.substring(0, 10),
                        lastModified:submission.data.data.lastUpdated.substring(0, 10),
                        status:'Uploaded',
                        name:resolve.data.data.name,
                        submissionFile:submission.data.data.filePath,
                        subId:submission.data.data._id,
                        assignment:resolve.data.data.file,
                        markSheet:resolve.data.data.markSheet

                    })
                }
             }).catch(err=>{

                this.setState({
                    assignmentID:resolve.data.data._id,
                    dueDate:resolve.data.data.DueDate.substring(0, 10),
                    status:'Not Uploaded',
                    name:resolve.data.data.name,
                    assignment:resolve.data.data.file,
                    markSheet:resolve.data.data.markSheet
                })
             })

            console.log(this.state.markSheet)
        }).catch(err=>{


            
        })
    }

    onChangeFile(e){

        if(e.target.files[0]==null){
            this.setState({
                fileName:'Choose File'
            })
        }else{
            const fileX = e.target.files[0];
            console.log(fileX);
            this.setState({
                file:e.target.files[0],
                fileName:e.target.files[0].name
            })
        }

    }

    displayFile(){
        console.log(this.state.assignment)
        if(this.state.assignment==null || this.state.assignment==""){
            return (
                <tr></tr>
            )
        }else{
            return(
                <tr ><td> <a className='desc' href={this.state.assignment}><img src={Background} style={{width:'50px',height:'50px'}} alt="IMG" />Download</a></td></tr>
            )
        }
    }
    displaySubmission(){
        console.log(this.state.submissionFile)
        if(this.state.submissionFile==null || this.state.submissionFile==""){
            return (
                <tr></tr>
            )
        }else{
            return(
                <tr><td></td><td> <a href={this.state.submissionFile}><img src={Background} style={{width:'50px',height:'50px'}} alt="IMG" />Download</a></td></tr>
            )
        }
    }
    grading(){
        console.log(this.state.markSheet)
        if(this.state.markSheet===undefined || this.state.markSheet==""){
            return(
                <tr className='table-bordered'>
                    <td><div className='desc'>Grading</div></td>
                    <td><div className='value'>Not yet</div></td>
                </tr>
            )
        }else{
            return(
                <tr>
                    <td><div className='desc'>Grading</div></td>
                    <td><div className='value'><a className='desc' href={this.state.markSheet}>Download</a></div></td>
                </tr>
            )
        }
    }
    submit(){
        if(this.state.overDueStatus){
            return(
                <button className='btn btn-success uploadButton' disabled>Upload</button>
            )
        }else{
            return(
                <button className='btn btn-success uploadButton' >Upload</button>
            )
        }
    }
    onSubmit(e){
        e.preventDefault();

        const fd = new FormData();
        fd.append("file",this.state.file,this.state.file.name);

        axios.post('http://localhost:8080/assignment/upload',fd).then(resolve=>{

            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            if(this.state.submissionFile!=null){
                const obj = {
                    file:resolve.data,
                    date:today
                }
                axios.put('http://localhost:4000/node/submission/'+this.state.subId,obj).then(resolve=>{
                    console.log(resolve);
                    this.props.history.push('/');
                }).catch(err=>{
                    console.log(err);
                })
            }else{
                console.log(resolve)

                console.log(today);
                const obj = {
                    assId:this.state.assignmentID,
                    stdId:sessionStorage.getItem('UserID'),
                    file:resolve.data,
                    date:today
                }
                axios.post('http://localhost:4000/node/submission',obj).then(resolve=>{
                    console.log(resolve);
                    this.props.history.push('/');
                }).catch(err=>{
                    console.log(err);
                })
            }




        }).catch(err=>{
            console.log(err)
        })
    }
    render(){
        return(

            <div className='cardView'>
                <div className='card' >

                    <div className='card-header'>
                        <div className='card-title'>
                            <h2>
                            Assignment
                            </h2>
                        </div>
                    </div>
                    <div className='card-body'>
                        <div className='card-title'><h3>{this.state.name}</h3></div>

                        <table className='tableView table-responsive-lg'>
                            <tbody>
                            {this.displayFile()}
                            <tr>

                            </tr>

                            <tr className='table-bordered'>
                                <td><div className='desc '> Submission Status</div></td>
                                <td><div className='value'>{this.state.status}</div></td>
                            </tr>
                            {this.grading()}
                            <tr className='table-bordered'>
                                <td><div className='desc'> Due date</div></td>
                                <td><div className='value '>{this.state.dueDate}</div></td>
                            </tr>
                            <tr className='table-bordered'>
                                <td><div className='desc'> Time Remaining</div></td>
                                <td><div className='value red'>{this.state.timeRemaining}</div> </td>
                            </tr >
                            <tr className='table-bordered'>
                                <td><div className='desc'> Last Modified</div></td>
                                <td><div className='value'> {this.state.lastModified}</div></td>
                            </tr>


                            {this.displaySubmission()}

                            <tr ><td></td></tr>

                            </tbody>
                        </table>




                            <form className='file' onSubmit={this.onSubmit}>
                                <div className="input-group mb-3  col-md-5">

                                    <div className="custom-file">


                                        <input type="file" required className="custom-file-input" id="inputGroupFile01" onChange={this.onChangeFile} />
                                        <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.fileName}</label>

                                    </div>
                                    {this.submit()}
                                </div>



                            </form>




                    </div>

                </div>
            </div>

        )
    }
}

export default stdAssUpload;
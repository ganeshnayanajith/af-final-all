import React , {Component} from 'react';
import './aMarks.css'
import axios from 'axios';

class assignmentMarks extends Component{

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);

        this.state={
            fileName:'Choose File',
            file:null,
            msg:''
        }
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
    onSubmit(e){
        e.preventDefault();

        const fd = new FormData();
        fd.append("file",this.state.file,this.state.file.name);

        axios.post('http://localhost:8080/assignment/upload',fd).then(resolve=>{


            const obj ={
                filename:resolve.data
            }

            let currentUrl = window.location.href;
            let courseId = (currentUrl.split('/')[6]);
    
            console.log(courseId);


            axios.put('http://localhost:4000/node/assignment/'+ courseId ,obj).then(data=>{
                console.log(data)
                this.setState({
                    msg:'Successfully Uploaded!!',
                    fileName:'Choose File'
                })
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })

    }


    componentDidMount(){
        if(sessionStorage.getItem('loggedIn')==='true'){
            console.log('log pass');
        }else{
            console.log('log fail');
            this.props.history.push('/user/login');
            
        }
    }


    render(){
        return(
            <div>
                <div className='card cardView'>
                    <div className='card-header'>
                        <div className='card-title'><h3>Upload Assignment Marks</h3></div>
                    </div>
                    <div className='card-body'>
                        <div><h4>Assignment name</h4></div>
                        <br/><br/>
                        <form className='file' onSubmit={this.onSubmit}>
                            <div className='msg'>{this.state.msg}</div>

                            <div className="input-group mb-3  col-md-5">

                                <div className="custom-file">


                                    <input type="file" required className="custom-file-input" id="inputGroupFile01" onChange={this.onChangeFile} />
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.fileName}</label>

                                </div>
                                <button className='btn btn-success submit' >Upload</button>
                            </div>



                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default assignmentMarks;
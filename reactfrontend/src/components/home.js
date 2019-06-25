import React, { Component } from 'react';
import Background1 from '../images/slide1.jpg';
import Background2 from '../images/slide2.jpg';
import Background3 from '../images/slide3.jpg';



export default class Home extends Component {


    constructor(props) {
        super(props);

    }


    componentDidMount() {
        document.title = "ABC Home";

          



    }



    render() {
        return (
            <div>
                <header>
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner" role="listbox">
                            {/*Slide One - Set the background image for this slide in the line below */}
                            <div className="carousel-item active" style={{ backgroundImage: `url(${Background2})` }}>
                                <div className="carousel-caption d-none d-md-block">
                                    <h3>Your Path To Greatness</h3>
                                    <p>Start With ABC Institute</p>
                                </div>
                            </div>
                            {/*Slide Two - Set the background image for this slide in the line below */}
                            <div className="carousel-item" style={{ backgroundImage: `url(${Background3})` }}>
                                <div className="carousel-caption d-none d-md-block">
                                    <h3>Bringing Together</h3>
                                    <p>The Best And Brightest Minds</p>
                                </div>
                            </div>
                            {/*Slide Three - Set the background image for this slide in the line below */}
                            <div className="carousel-item" style={{ backgroundImage: `url(${Background1})` }}>
                                <div className="carousel-caption d-none d-md-block">
                                    <h3>Make Your Dream Alive</h3>
                                    <p>Make The First Step To Future Life</p>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </header>


                <div className="container">

                    <h1 className="my-4">Welcome to ABC Institute</h1>



                    <div className="row">
                        <div className="col-lg-4 mb-4">
                            <div className="card h-100">
                                <h4 className="card-header">Computing</h4>
                                <div className="card-body">
                                    <p className="card-text">The ABC Institute Faculty of Computing is equipped with a range of courses specialising in various arms of the IT sector.</p>
                                </div>
                                <div className="card-footer">
                                    <a href="#" className="btn btn-primary">Learn More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card h-100">
                                <h4 className="card-header">Bussiness</h4>
                                <div className="card-body">
                                    <p className="card-text">The Faculty of Business within ABC Institute continues to rise up to the challenge of nurturing leaders, managers and IS professionals that can make decisions and implement actions that are right for themselves, right for their </p>
                                </div>
                                <div className="card-footer">
                                    <a href="#" className="btn btn-primary">Learn More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card h-100">
                                <h4 className="card-header">Engineering</h4>
                                <div className="card-body">
                                    <p className="card-text">The Faculty of Engineering of Sri Lanka Institute of Information technology is the epicenter of engineering education, research, knowledge creation and distribution in Sri Lanka.</p>
                                </div>
                                <div className="card-footer">
                                    <a href="#" className="btn btn-primary">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>




        )
    }
}
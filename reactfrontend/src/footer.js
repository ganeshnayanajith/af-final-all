
import React, { Component } from 'react';
import './footer.css';
import Background from './images/main.png';

class footer extends Component {
    render() {
        return (
            <div>
                <br/><br/><br/>
                <footer id="dk-footer" class="dk-footer">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-lg-4">
                                <div class="dk-footer-box-info">
                                    <a href="index.html" class="footer-logo">
                                        <img class="img-fluid" src={Background} alt="IMG" />

                                    </a>

                                    <div class="footer-social-link">
                                        <h3>Follow us</h3>
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-facebook"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-google-plus"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-linkedin"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-instagram"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                            </div>

                            <div class="col-md-12 col-lg-8">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="contact-us">
                                            <div class="contact-icon">
                                                <i class="fa fa-map-o" aria-hidden="true"></i>
                                            </div>

                                            <div class="contact-info">
                                                <h3>Malabe</h3>
                                                <p>98/4 Wimukthi Road</p>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="col-md-6">
                                        <div class="contact-us contact-us-last">
                                            <div class="contact-icon">
                                                <i class="fa fa-volume-control-phone" aria-hidden="true"></i>
                                            </div>

                                            <div class="contact-info">
                                                <h3>+94 77 636 1069</h3>
                                                <p>Give us a call</p>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-md-12 col-lg-6">
                                        <div class="footer-widget footer-left-widget">
                                            <div class="section-heading">
                                                <h3>Useful Links</h3>
                                                <span class="animate-border border-black"></span>
                                            </div>
                                            <ul>
                                                <li>
                                                    <a href="#">About us</a>
                                                </li>
                                                <li>
                                                    <a href="#">Services</a>
                                                </li>
                                                <li>
                                                    <a href="#">Projects</a>
                                                </li>
                                                <li>
                                                    <a href="#">Our Team</a>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <a href="#">Contact us</a>
                                                </li>
                                                <li>
                                                    <a href="#">Blog</a>
                                                </li>

                                                <li>
                                                    <a href="#">Faq</a>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>

                                    <div class="col-md-12 col-lg-6">
                                        <div class="footer-widget">
                                            <div class="section-heading">
                                                <h3>Subscribe</h3>
                                                <span class="animate-border border-black"></span>
                                            </div>
                                            <p>
                                                Reference site about Train System, giving information on its origins, as well.</p>
                                            <form action="#">
                                                <div class="form-row">
                                                    <div class="col dk-footer-form">
                                                        <input type="email" class="form-control" placeholder="Email Address" />
                                                        <button type="submit">
                                                            <i class="fa fa-send"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div class="copyright">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6">
                                    <span>Copyright © 2019, All Right Reserved ABC Institute</span>
                                </div>

                                <div class="col-md-6">
                                    <div class="copyright-menu">
                                        <ul>
                                            <li>
                                                <a href="#">Home</a>
                                            </li>
                                            <li>
                                                <a href="#">Terms</a>
                                            </li>
                                            <li>
                                                <a href="#">Privacy Policy</a>
                                            </li>
                                            <li>
                                                <a href="#">Contact</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </footer>
            </div>
        );
    }
}

export default footer;

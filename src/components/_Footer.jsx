import React from 'react';

import logo from '../assets/images/logo-wis.png';
import bg4 from '../assets/images/background/4.jpg';
import thumb from '../assets/images/gallery/footer-gallery-thumb-1.jpg';
 
const _Footer = (props) => {

    const footerName1 = props.footerMenu1_name;
    const footerName2 = props.footerMenu2_name;

    const footerMenuNodes1 = props.footerMenuNodes1;
    const footerMenuNodes2 = props.footerMenuNodes2;

    return (
        <footer className="main-footer margin-top" style={{ "backgroundColor" : "var(--blueDarkColor)", "marginTop":"100px"}} >
            <div className="auto-container">
                {/* <!--Widgets Section--> */}
                <div className="widgets-section">
                    <div className="row clearfix">
                        {/* <!--Column--> */}
                        <div className="big-column col-lg-6 col-md-12 col-sm-12">
                            <div className="row clearfix">
                                {/* <!--Footer Column--> */}
                                <div className="footer-column col-lg-7 col-md-6 col-sm-12">
                                    <div className="footer-widget logo-widget">
                                        <div className="logo">
                                            <a href="index.html"><img src={logo} alt="" /></a>
                                        </div>
                                        <div className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore  aliqua.</div>
                                        <ul className="list-style-one">
                                            <li><span>Location: </span> Rock St 12, Newyork City, USA</li>
                                            <li><span>Email:</span> info@example.com</li>
                                            <li><span>Phone:</span> +000-0000-000</li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <!--Footer Column--> */}
                                <div className="footer-column col-lg-5 col-md-6 col-sm-12">
                                    <div className="footer-widget links-widget">
                                        <h4>{footerName1}</h4>
                                        <ul className="list-link">
                                            {
                                                footerMenuNodes1.map( (menuItem, index) => {
                                                    return (
                                                        <li key={"footerMenuNode2" + index}><a href={menuItem.uri}>{menuItem.label}</a></li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!--Column--> */}
                        <div className="big-column col-lg-6 col-md-12 col-sm-12">
                            <div className="row clearfix">
                                {/* <!--Footer Column--> */}
                                <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                                    <div className="footer-widget links-widget">
                                        <h4>{footerName2}</h4>
                                        <ul className="list-link">
                                            {
                                                footerMenuNodes2.map( (menuItem, index) => {
                                                    return (
                                                        <li key={"footerMenuNode2" + index}><a href={menuItem.uri}>{menuItem.label}</a></li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                {/* <!--Footer Column--> */}
                                <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                                    <div className="footer-widget gallery-widget">
                                        <h4>Gallery</h4>
                                        <div className="widget-content">
                                            <div className="images-outer clearfix">
                                                {/* <!--Image Box--> */}
                                                <figure className="image-box"><a href="images/gallery/1.jpg" className="lightbox-image" data-fancybox="footer-gallery" title="Image Title Here" data-fancybox-group="footer-gallery"><img src={thumb} alt="" /></a></figure>
                                                {/* <!--Image Box--> */}
                                                <figure className="image-box"><a href="images/gallery/2.jpg" className="lightbox-image" data-fancybox="footer-gallery" title="Image Title Here" data-fancybox-group="footer-gallery"><img src={thumb} alt="" /></a></figure>
                                                {/* <!--Image Box--> */}
                                                <figure className="image-box"><a href="images/gallery/3.jpg" className="lightbox-image" data-fancybox="footer-gallery" title="Image Title Here" data-fancybox-group="footer-gallery"><img src={thumb} alt="" /></a></figure>
                                                {/* <!--Image Box--> */}
                                                <figure className="image-box"><a href="images/gallery/4.jpg" className="lightbox-image" data-fancybox="footer-gallery" title="Image Title Here" data-fancybox-group="footer-gallery"><img src={thumb} alt="" /></a></figure>
                                                {/* <!--Image Box--> */}
                                                <figure className="image-box"><a href="images/gallery/1.jpg" className="lightbox-image" data-fancybox="footer-gallery" title="Image Title Here" data-fancybox-group="footer-gallery"><img src={thumb} alt="" /></a></figure>
                                                {/* <!--Image Box--> */}
                                                <figure className="image-box"><a href="images/gallery/2.jpg" className="lightbox-image" data-fancybox="footer-gallery" title="Image Title Here" data-fancybox-group="footer-gallery"><img src={thumb} alt="" /></a></figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Footer Bottom --> */}
            <div className="footer-bottom">
                <div className="auto-container">
                    <div className="inner-container">
                        <div className="row clearfix">
                            {/* <!-- Copyright Column --> */}
                            <div className="copyright-column col-lg-6 col-md-6 col-sm-12">
                                <div className="copyright">2023 © All rights reserved by <a href="#">Expert Themes</a></div>
                            </div>
                            {/* <!-- Social Column --> */}
                            <div className="social-column col-lg-6 col-md-6 col-sm-12">
                                <ul>
                                    <li className="follow">Follow us: </li>
                                    <li><a href="#"><span className="fa fa-facebook-square"></span></a></li>
                                    <li><a href="#"><span className="fa fa-twitter-square"></span></a></li>
                                    <li><a href="#"><span className="fa fa-linkedin-square"></span></a></li>
                                    <li><a href="#"><span className="fa fa-google-plus-square"></span></a></li>
                                    <li><a href="#"><span className="fa fa-rss-square"></span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-to-top scroll-to-target" data-target="html" style={{"display":"block"}} ><span className="fa fa-arrow-circle-up"></span></div>

        </footer>
    );
};

export default _Footer;
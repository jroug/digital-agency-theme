import React from 'react';

// import all images resources
import img17 from '../assets/images/gallery/17.jpg';
import img18 from '../assets/images/gallery/18.jpg';
import img11 from '../assets/images/gallery/11.jpg';
import img12 from '../assets/images/gallery/12.jpg';
import img13 from '../assets/images/gallery/13.jpg';


import { _BannerTop, SectionSubscribeToNL } from "./";

const TemplatePortfolioInner = (props) => {
    return (
        <>
            <_BannerTop title={props.title} />   

            { /* <!-- Projects Detail Section --> */ }
            <section className="projects-detail-section">
                <div className="auto-container">
                    { /* <!-- Gallery Boxed --> */ }
                    <div className="gallery-boxed">
                        <div className="row clearfix">

                            <div className="column col-lg-8 col-md-8 col-sm-12">
                                <div className="single-item-carousel owl-carousel owl-theme">
                                    <div className="slide">
                                        <div className="image">
                                            <img src={img17} alt="" />
                                        </div>
                                    </div>
                                    {/* <div className="slide">
                                        <div className="image">
                                            <img src={img17} alt="" />
                                        </div>
                                    </div>
                                    <div className="slide">
                                        <div className="image">
                                            <img src={img17} alt="" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className="column col-lg-4 col-md-4 col-sm-12">
                                <div className="image">
                                    <img src={img18} alt="" />
                                </div>
                            </div>

                        </div>
                    </div>

                    { /* <!-- Lower Content --> */ }
                    <div className="lower-content">
                        <div className="row clearfix">

                            <div className="column col-lg-8 col-md-12 col-sm-12">
                                <h3>Digital Analysis</h3>
                                <p>Cast obscure badger jeep quail congenialy when changed as cat jeepers affectionate thus goodness this far like ipsum dolor sit amet, consectetur adipisicing elits sed do eiusmod tempor incididunt laboret dolore magna aliqua enim ad minim. Eveniet in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at seds eros sed et accumsan et iusto odio dignissim. Temporibus autem quibusdam et aut officiis.</p>
                                <p>Dut perspiciatis unde omnis iste natus error sit voluptatems accusantium doloremqu laudantiums ut, totams se aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae duis autems vell eums iriure dolors in hendrerit saep.</p>
                            </div>
                            <div className="column col-lg-4 col-md-12 col-sm-12">
                                <h3>Project Info</h3>
                                <ul className="project-info">
                                    <li><span className="icon fa fa-user"></span><strong>Clients :</strong>Julia Robertson</li>
                                    <li><span className="icon fa fa-calendar"></span><strong>Date :</strong>November 20, 2017</li>
                                    <li><span className="icon fa fa-tag"></span><strong>Category :</strong>Strategy, Business</li>
                                    <li><span className="icon fa fa-location-arrow"></span><strong>Location :</strong>1201 park street, Avenue, Dhaka</li>
                                </ul>
                            </div>

                        </div>
                    </div>

                    <h3>Challenge & Solutions</h3>
                    <p>Peacefully between its four familiar walls. A collection of textile samples lay spread out on the table – Samsa was a travelling salesman – and above it there hung a piture that he had recently cut out of an illustrated magazine A collection of textile samples lay spread out on the table</p>
                    <div className="row clearfix">
                        <div className="column col-lg-6 col-md-12 col-sm-12">
                            <ul className="list-style-four">
                                <li>Between its four familiar walls. A collection of textile samples</li>
                                <li>A collection of textile samples lay spread out on the table</li>
                            </ul>
                        </div>
                        <div className="column col-lg-6 col-md-12 col-sm-12">
                            <ul className="list-style-four">
                                <li>Familiar walls a collection of textile samples</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            { /* <!-- End Projects Page Section --> */ }

            { /* <!-- Related Section --> */ }
            <section className="related-projects-section">
                <div className="auto-container">
                    <div className="inner-container">

                        { /* <!-- Sec Title --> */ }
                        <div className="sec-title centered">
                            <div className="title">Related Work</div>
                            <div className="separator"><span></span></div>
                            <h2>Our More Projects</h2>
                        </div>

                        <div className="row clearfix">

                            { /* <!--Gallery Item--> */ }
                            <div className="gallery-item-two col-lg-4 col-md-6 col-sm-12">
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src={img11} alt="" />
                                        { /* <!--Overlay Box--> */ }
                                        <div className="overlay-box">
                                            <div className="overlay-inner">
                                                <div className="content">
                                                    <a href="portfolio-single.html" className="link"><span className="icon fa fa-link"></span></a>
                                                    <a href="images/gallery/11.jpg" data-fancybox="gallery-3" data-caption="" className="link"><span className="icon flaticon-add"></span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </figure>
                                    { /* <!-- Lower Box --> */ }
                                    <div className="lower-box">
                                        <a className="arrow-link" href="portfolio-single.html"><span className="icon fa fa-arrow-right"></span></a>
                                        <h3><a href="portfolio-single.html">Plan Management</a></h3>
                                        <div className="category">PLANNING</div>
                                    </div>
                                </div>
                            </div>

                            { /* <!--Gallery Item--> */ }
                            <div className="gallery-item-two col-lg-4 col-md-6 col-sm-12">
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src={img12} alt="" />
                                        { /* <!--Overlay Box--> */ }
                                        <div className="overlay-box">
                                            <div className="overlay-inner">
                                                <div className="content">
                                                    <a href="portfolio-single.html" className="link"><span className="icon fa fa-link"></span></a>
                                                    <a href="images/gallery/12.jpg" data-fancybox="gallery-3" data-caption="" className="link"><span className="icon flaticon-add"></span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </figure>
                                    { /* <!-- Lower Box --> */ }
                                    <div className="lower-box">
                                        <a className="arrow-link" href="portfolio-single.html"><span className="icon fa fa-arrow-right"></span></a>
                                        <h3><a href="portfolio-single.html">Technical SEO</a></h3>
                                        <div className="category">SEO</div>
                                    </div>
                                </div>
                            </div>

                            { /* <!--Gallery Item--> */ }
                            <div className="gallery-item-two col-lg-4 col-md-6 col-sm-12">
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src={img13} alt="" />
                                        { /* <!--Overlay Box--> */ }
                                        <div className="overlay-box">
                                            <div className="overlay-inner">
                                                <div className="content">
                                                    <a href="portfolio-single.html" className="link"><span className="icon fa fa-link"></span></a>
                                                    <a href="images/gallery/13.jpg" data-fancybox="gallery-3" data-caption="" className="link"><span className="icon flaticon-add"></span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </figure>
                                    { /* <!-- Lower Box --> */ }
                                    <div className="lower-box">
                                        <a className="arrow-link" href="portfolio-single.html"><span className="icon fa fa-arrow-right"></span></a>
                                        <h3><a href="portfolio-single.html">Digital Analysis</a></h3>
                                        <div className="category">STRATEGY</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
            { /* <!-- End Related Section --> */ }

            <SectionSubscribeToNL />
        </>
    );
};

export default TemplatePortfolioInner;
import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../assets/images/logo-wis.png';
// import bg4 from '../assets/images/background/4.jpg';
import { logVar } from "./utils/Utils";
import thumb from '../assets/images/gallery/footer-gallery-thumb-1.jpg';

// github copilot is awsome !!
// what do you say about that??
// I think it's awsome too
// I think it's awsome too
// I think it's awsome too
// I think it's awsome too
// I think it's awsome too
// I think it's awsome too
// ok we agree on that


const _Footer = (props) => {

    logVar('--_Footer--');

    const footerName1 = props.footerMenu1_name;
    const footerName2 = props.footerMenu2_name;

    const footerMenuNodes1 = props.footerMenuNodes1;
    const footerMenuNodes2 = props.footerMenuNodes2;

    const footerLogoUrl = props.footerLogoUrl;

    const footerText = props.footerText;
    const footerAddress = props.footerAddress;
    const footerAddressLink = props.footerAddressLink;
    const footerPhone1 = props.footerPhone1;
    const footerPhone2 = props.footerPhone2;
    const footerEmail = props.footerEmail;
    const footerCopyrights = props.footerCopyrights;
    const socialLinkFacebook = props.socialLinkFacebook;
    const socialLinkInstagram = props.socialLinkInstagram;
    const socialLinkTwitter = props.socialLinkTwitter;
    const socialLinkLinkedin = props.socialLinkLinkedin;

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
                                            <Link to="/"><img src={footerLogoUrl} alt="" /></Link>
                                        </div>
                                        <div className="text">{footerText}</div>
                                        <ul className="list-style-one footer-links-wb">
                                            <li><span>Address: </span> <Link target="_blank" to={footerAddressLink} >{footerAddress}</Link></li>
                                            <li><span>Email:</span> <Link to={"mailto:" + footerEmail} >{footerEmail}</Link></li>
                                            <li><span>Phone:</span> <Link to={"tel:" + footerPhone1} >{footerPhone1}</Link></li>
                                            <li><span>Phone:</span> <Link to={"tel:" + footerPhone2} >{footerPhone2}</Link></li>
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
                                <div className="copyright" dangerouslySetInnerHTML={{__html:footerCopyrights}}></div>
                            </div>
                            {/* <!-- Social Column --> */}
                            <div className="social-column col-lg-6 col-md-6 col-sm-12">
                                <ul>
                                    <li className="follow">Follow us: </li>
                                    <li><Link to={socialLinkFacebook}><span className="fa fa-facebook-square"></span></Link></li>
                                    <li><Link to={socialLinkInstagram}><span className="fa fa-instagram"></span></Link></li>
                                    <li><Link to={socialLinkTwitter}><span className="fa fa-twitter-square"></span></Link></li>
                                    <li><Link to={socialLinkLinkedin}><span className="fa fa-linkedin-square"></span></Link></li>
     
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="scroll-to-top scroll-to-target" data-target="html" style={{"display":"block"}} ><span className="fa fa-arrow-circle-up"></span></div> */}

        </footer>
    );
};

export default _Footer;
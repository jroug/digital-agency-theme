import React from 'react';
import { Link } from 'react-router-dom';
// import Home_Hero from '../assets/images/01_Home_Hero.jpg';
import p21 from '../assets/images/background/pattern-21.png';
import i1 from '../assets/images/icons/banner-icon-1.png';
import i2 from '../assets/images/icons/banner-icon-2.png';
import { BannerTopElements } from './';
import { logVar } from "./utils/Utils";

import { Helmet } from "react-helmet-async";

const BannerTop = (props) => {
    logVar('--BannerTop--');
    
    // console.log(props);

    let seoTitle = props.seoFields.title;
    let seoDescription = props.seoFields.description;
    let seoCanonical = props.seoFields.canonical;

    return (
        <>
            <Helmet>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription}/>
                <link rel="canonical" href={seoCanonical} />
                
                {/* <meta property="og:locale" content="el_GR" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Κατασκευή Ιστοσελίδων και Eshop - WebInSite" />
                <meta property="og:description" content="Κατασκευή Ιστοσελίδων και Eshop. Αναλαμβάνουμε την δημιουργία Website και Eshop, σύμφωνα με τις ανάγκες σας, σε ανταγωνιστικές τιμές." />
                <meta property="og:url" content="https://webinsite.gr/" />
                <meta property="og:site_name" content="WebInSite" />
                <meta property="article:modified_time" content="2022-09-26T11:50:18+00:00" />
                <meta property="og:image" content="//webinsite.gr/wp-content/plugins/rev-slider/public/assets/assets/dummy.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:label1" content="Εκτιμώμενος χρόνος ανάγνωσης" />
                <meta name="twitter:data1" content="1 λεπτό" /> */}
            </Helmet>
            <section className="page-title page-inner-top-section" style={{"backgroundImage":"url(" + p21 + ")"}} >
                <div className="patern-layer-one" style={{"backgroundImage":"url(" + i1 + ")"}} ></div>
                <div className="patern-layer-two" style={{"backgroundImage":"url(" + i2 + ")"}} ></div>
                <div className="auto-container" >
                    {/* <!-- Section Icons --> */}
                    <BannerTopElements />
                    <div className="inner-container clearfix">
                        <div className="pull-left">
                            <h1>{props.title}</h1>
                        </div>
                        <div className="pull-right">
                            <ul className="bread-crumb clearfix">
                                <li><Link to="/">Home</Link></li>
                                {
                                    props.parentTitle === undefined || props.parentLink === undefined
                                    ? 
                                    <></> 
                                    :
                                    <li><Link to={props.parentLink}>{props.parentTitle}</Link></li>
                                }
                                <li>{props.title}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BannerTop;
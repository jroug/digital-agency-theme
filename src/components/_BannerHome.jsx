import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const _BannerHome = (props) => {
    // console.log('-----------_BannerHome--------');
    const bannerData = props.homeHeaderData;

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
            <section className="banner-section-two" id="home-banner" style={ bannerData.heroImage !== null ? {"backgroundImage":"url("+bannerData.heroImage.sourceUrl+")"} : null } >
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="content-column col-lg-6 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <h1>{bannerData.heroTitle}</h1>
                                <div className="text">{bannerData.heroSubTitle}</div>
                                <Link to={bannerData.heroButtonUrl} className="lightbox-image theme-btn btn-style-one">{bannerData.heroButtonText} <span className="icon fa fa-arrow-right"></span></Link>
                            </div>
                        </div>
                        {
                            bannerData.heroImageOverlay == null || bannerData.heroImageOverlay == undefined || bannerData.heroImageOverlay == ""
                            ?
                            ''
                            :
                            <div className="image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column">
                                    <figure >
                                        <img src={bannerData.heroImageOverlay.sourceUrl} alt="" />
                                    </figure>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default _BannerHome;
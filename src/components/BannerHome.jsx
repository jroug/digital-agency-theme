import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const BannerHome = (props) => {
    // console.log('-----------BannerHome--------');
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
                            bannerData.heroImageOverlay === null || bannerData.heroImageOverlay === undefined || bannerData.heroImageOverlay === ""
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

export default BannerHome;
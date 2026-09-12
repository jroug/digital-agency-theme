import QueryState from './QueryState';
import React from 'react';

import i1 from '../assets/images/icons/icon-1.png';
import i2 from '../assets/images/icons/icon-2.png';
import i4 from '../assets/images/icons/icon-4.png';
// import signature from '../assets/images/icons/signature.png';
// import author1 from '../assets/images/resource/author-1.png';
// import about1 from '../assets/images/resource/about-1.png';

import { useQuery, gql } from '@apollo/client';

import {GraphQLQueries} from "./queries/GraphQLQueries";


const SectioAboutUs = () => {

    const ABOUTUS_SECTION_CONTENT = gql`query ABOUTUS_SECTION_CONTENT
    {
      ${GraphQLQueries.queries.sectionAboutUs}
    }`;

    const { data, loading, error, refetch } = useQuery(ABOUTUS_SECTION_CONTENT);

    if (loading) return <QueryState loading />;
    if (error || !data) return <QueryState onRetry={refetch} />;

    const sectionAboutUsData = data.sectionAboutUs.sectionAboutUsFields;

    return (
        <section className="about-section style-two">
            <div className="section-icons">
                {/* <!-- Icon One --> */}
                <div className="icon-one" style={{"backgroundImage":"url(" + i1 + ")"}}></div>
                {/* <!-- Icon Two --> */}
                <div className="icon-two" style={{"backgroundImage":"url(" + i2 + ")"}}></div>
                {/* <!-- Icon Three --> */}
                <div className="icon-three" style={{"backgroundImage":"url(" + i4 + ")"}}></div>
            </div>
            <div className="auto-container">
                <div className="row clearfix">
                    {/* <!-- Title Column --> */}
                    <div className="title-column col-lg-6 col-md-12 col-sm-12">
                        <div className="inner-column">
                            {/* <!-- Sec Title --> */}
                            <div className="sec-title">
                                <div className="title">{sectionAboutUsData.smallTitleTop}</div>
                                <div className="separator"><span></span></div>
                                <h2>{sectionAboutUsData.mainTitle}</h2>
                            </div>
                            <div className="text">{sectionAboutUsData.mainText}</div>
                            {/* <!-- Author Box --> */}
                            <div className="author-box">
                                <div className="box-inner">
                                    <div className="image"><img src={sectionAboutUsData.personImage.sourceUrl} alt="" /></div>
                                    <h3>{sectionAboutUsData.personName}</h3>
                                    <div className="designation">{sectionAboutUsData.personTitle}</div>
                                </div>
                            </div>
                            {/* <div className="signature"><img src={signature} alt="" /></div> */}
                        </div>
                    </div>

                    {/* <!-- Image Column --> */}
                    <div className="image-column col-lg-6 col-md-12 col-sm-12">
                        <div className="inner-column wow fadeInRight animated" data-wow-delay="0ms" data-wow-duration="1500ms" style={{"visibility":"visible","animationDuration":"1500ms","animationDelay":"0ms","animationName":"fadeInRight"}}>
                            <div className="image">
                                <img src={sectionAboutUsData.mainImage.sourceUrl} alt="" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SectioAboutUs;
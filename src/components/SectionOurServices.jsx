import QueryState from './QueryState';
import React from 'react';
import { Link } from 'react-router-dom';

import p4 from '../assets/images/background/pattern-4.png';
import i1 from '../assets/images/icons/icon-1.png';
import i2 from '../assets/images/icons/icon-2.png';
import i4 from '../assets/images/icons/icon-4.png';

import { useQuery, gql } from '@apollo/client';

import {GraphQLQueries} from "./queries/GraphQLQueries";

const SectionOurServices = () => {
 
    const SERVICES_SECTION_CONTENT = gql`query SERVICES_SECTION_CONTENT
    {
      ${GraphQLQueries.queries.sectionOurServices}
    }`;

    const { data, loading, error, refetch } = useQuery(SERVICES_SECTION_CONTENT);

    if (loading) return <QueryState loading />;
    if (error || !data) return <QueryState onRetry={refetch} />;

    const sectionOurServicesData = data.sectionOurServices.sectionOurServicesFields;

    return (
        <section className="services-section-two">
            <div className="image-layer" style={{"backgroundImage":"url(" + p4 + ")"}}></div>
            <div className="section-icons">
                {/* <!-- Icon One --> */}
                <div className="icon-one" style={{"backgroundImage":"url(" + i1 + ")"}}></div>
                {/* <!-- Icon Two --> */}
                <div className="icon-two" style={{"backgroundImage":"url(" + i2 + ")"}}></div>
                {/* <!-- Icon Three --> */}
                <div className="icon-three" style={{"backgroundImage":"url(" + i4 + ")"}}></div>
            </div>

            <div className="auto-container">
                {/* <!-- Sec Title --> */}
                <div className="sec-title">
                    <div className="title">{sectionOurServicesData.smallTitleTop}</div>
                    <div className="separator"><span></span></div>
                    <h2 dangerouslySetInnerHTML={{__html: sectionOurServicesData.mainTitle.replace(/(?:\r\n|\r|\n)/g, '<br />')}}></h2>
                </div>
                <div className="inner-container">
                    <div className="row clearfix">

                        {/* <!-- Service Block Two --> */}
                        <div className="service-block-two col-lg-4 col-md-6 col-sm-12">
                            <div className="inner-box wow fadeInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms" >
                                <div className="shape-one"></div>
                                <div className="shape-two"></div>
                                <div className="shape-three"></div>
                                <div className="icon-box">
                                    <span className={"icon " + sectionOurServicesData.box1.boxIconClass}></span>
                                </div>
                                <h3><Link to={sectionOurServicesData.box1.boxLink==null ? '#' : sectionOurServicesData.box1.boxLink} >{sectionOurServicesData.box1.boxTitle}</Link></h3>
                                <div className="text">{sectionOurServicesData.box1.boxText}</div>
                            </div>
                        </div>

                        {/* <!-- Service Block Two --> */}
                        <div className="service-block-two col-lg-6 col-md-6 col-sm-12">
                            <div className="inner-box wow fadeInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms" >
                                <div className="shape-one"></div>
                                <div className="shape-two"></div>
                                <div className="shape-three"></div>
                                <div className="icon-box">
                                    <span className={"icon " + sectionOurServicesData.box2.boxIconClass}></span>
                                </div>
                                <h3><Link to={sectionOurServicesData.box2.boxLink==null ? '#' : sectionOurServicesData.box2.boxLink}>{sectionOurServicesData.box2.boxTitle}</Link></h3>
                                <div className="text">{sectionOurServicesData.box2.boxText}</div>
                            </div>
                        </div>

                        {/* <!-- Service Block Two --> */}
                        <div className="service-block-two col-lg-6 col-md-6 col-sm-12">
                            <div className="inner-box wow fadeInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms" >
                                <div className="shape-one"></div>
                                <div className="shape-two"></div>
                                <div className="shape-three"></div>
                                <div className="icon-box">
                                    <span className={"icon " + sectionOurServicesData.box3.boxIconClass}></span>
                                </div>
                                <h3><Link to={sectionOurServicesData.box3.boxLink==null ? '#' : sectionOurServicesData.box3.boxLink}>{sectionOurServicesData.box3.boxTitle}</Link></h3>
                                <div className="text">{sectionOurServicesData.box3.boxText}</div>
                            </div>
                        </div>

                        {/* <!-- Service Block Two --> */}
                        <div className="service-block-two col-lg-6 col-md-6 col-sm-12">
                            <div className="inner-box wow fadeInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms" >
                                <div className="shape-one"></div>
                                <div className="shape-two"></div>
                                <div className="shape-three"></div>
                                <div className="icon-box">
                                    <span className={"icon " + sectionOurServicesData.box4.boxIconClass}></span>
                                </div>
                                <h3><Link to={sectionOurServicesData.box4.boxLink==null ? '#' : sectionOurServicesData.box4.boxLink}>{sectionOurServicesData.box4.boxTitle}</Link></h3>
                                <div className="text">{sectionOurServicesData.box4.boxText}</div>
                            </div>
                        </div>

                        {/* <!-- Service Block Two --> */}
                        <div className="service-block-two col-lg-6 col-md-6 col-sm-12">
                            <div className="inner-box wow fadeInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms" >
                                <div className="shape-one"></div>
                                <div className="shape-two"></div>
                                <div className="shape-three"></div>
                                <div className="icon-box">
                                    <span className={"icon " + sectionOurServicesData.box5.boxIconClass}></span>
                                </div>
                                <h3><Link to={sectionOurServicesData.box5.boxLink==null ? '#' : sectionOurServicesData.box5.boxLink}>{sectionOurServicesData.box5.boxTitle}</Link></h3>
                                <div className="text">{sectionOurServicesData.box5.boxText}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionOurServices;
import QueryState from './QueryState';
import React from 'react';
import { Link } from 'react-router-dom';

import i1 from '../assets/images/icons/icon-1.png';
import i2 from '../assets/images/icons/icon-2.png';
import p5 from '../assets/images/background/pattern-5.png';

import { useQuery, gql } from '@apollo/client';

import {GraphQLQueries} from "./queries/GraphQLQueries";
import { logVar } from "./utils/Utils";

const SectionWhyUs = () => {

    const WHYUS_SECTION_CONTENT = gql`query WHYUS_SECTION_CONTENT
    {
      ${GraphQLQueries.queries.sectionWhyUs}
    }`;

    const { data, loading, error, refetch } = useQuery(WHYUS_SECTION_CONTENT);

    if (loading) return <QueryState loading />;
    if (error || !data) return <QueryState onRetry={refetch} />;

    const sectionWhyUsData = data.sectionWhyUs.sectionWhyUsFields;

    const featuresArr = data.sectionWhyUs.sectionWhyUsFields.features.split(/\r?\n/);
// console.log(featuresArr);

    return (
        <section className="choose-section">
                {/* Section Icons */}
            <div className="section-icons">
                {/* Icon One */}
                <div className="icon-one" style={{"backgroundImage":"url(" + i2 + ")"}} ></div>
                {/* Icon Two */}
                <div className="icon-two" style={{"backgroundImage":"url(" + i1 + ")"}} ></div>
            </div>
            <div className="auto-container">
                <div className="row clearfix">

                    {/* Title Column */}
                    <div className="title-column col-lg-6 col-md-12 col-sm-12">
                        <div className="inner-column">
                            {/* Sec Title */}
                            <div className="sec-title">
                                <div className="title">{sectionWhyUsData.smallTitleTop}</div>
                                <div className="separator"><span></span></div>
                                <h2 dangerouslySetInnerHTML={{__html:sectionWhyUsData.mainTitle}}></h2>
                            </div>
                            <div className="bold-text">{sectionWhyUsData.mainSubTitle}</div>
                            <div className="text">{sectionWhyUsData.featuredTitle}</div>
                            <ul className="list-style-two">
                                {
                                    featuresArr.map((feature, index) => {
                                        return (
                                            <li key={index}>{feature}</li>
                                        )
                                    })
                                }
                            </ul>
                            <Link to={sectionWhyUsData.featuresButtonLink==null ? '#' : sectionWhyUsData.featuresButtonLink} className="theme-btn btn-style-two"><span className="txt">{sectionWhyUsData.featuresButtonText}</span></Link>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="content-column col-lg-6 col-md-12 col-sm-12">
                        <div className="inner-column">
                            {/* Blocks Outer */}
                            <div className="blocks-outer">

                                {/* App Block */}
                                <div className="app-block">
                                    <div className="inner-box wow fadeInRight animated" data-wow-delay="0ms" data-wow-duration="1500ms" >
                                        <div className="content">
                                            <div className="icon-box">
                                                <span className={"icon " + sectionWhyUsData.box1.boxIconClass}></span>
                                            </div>
                                            <h3>{sectionWhyUsData.box1.boxTitle}</h3>
                                            <div className="text">{sectionWhyUsData.box1.boxText}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* App Block */}
                                <div className="app-block">
                                    <div className="inner-box wow fadeInRight animated" data-wow-delay="300ms" data-wow-duration="1500ms"  >
                                        <div className="content">
                                            <div className="icon-box">
                                                <span className={"icon " + sectionWhyUsData.box2.boxIconClass}></span>
                                            </div>
                                            <h3>{sectionWhyUsData.box2.boxTitle}</h3>
                                            <div className="text">{sectionWhyUsData.box2.boxText}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* App Block */}
                                <div className="app-block">
                                    <div className="inner-box wow fadeInRight animated" data-wow-delay="600ms" data-wow-duration="1500ms" >
                                        <div className="content">
                                            <div className="icon-box">
                                                <span className={"icon " + sectionWhyUsData.box3.boxIconClass}></span>
                                            </div>
                                            <h3>{sectionWhyUsData.box3.boxTitle}</h3>
                                            <div className="text">{sectionWhyUsData.box3.boxText}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {/* Pattern Layer */}
            <div className="pattern-layer" style={{"backgroundImage":"url(" + p5 + ")"}} ></div>
        </section>
    );
};

export default SectionWhyUs;
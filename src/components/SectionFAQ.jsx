import QueryState from './QueryState';
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import {GraphQLQueries} from "./queries/GraphQLQueries";
import { logVar } from "./utils/Utils";


const SectionFAQ = () => {

    const handleAccBtn = (el) => {
        let that = el.currentTarget;
        if(!that.classList.contains('active')){
            document.querySelector("#accordion-box").querySelectorAll('.acc-btn').forEach((el2) => {
                el2.classList.remove('active');
                el2.nextElementSibling.classList.remove('current');
            });
            that.classList.add('active');
            that.nextElementSibling.classList.add('current');
        }else{
            that.classList.remove('active');
            that.nextElementSibling.classList.remove('current');
        }
    }

    const FAQ_SECTION_CONTENT = gql`query FAQ_SECTION_CONTENT
    {
      ${GraphQLQueries.queries.sectionFAQ}
    }`;

    const { data, loading, error, refetch } = useQuery(FAQ_SECTION_CONTENT);

    if (loading) return <QueryState loading />;
    if (error || !data) return <QueryState onRetry={refetch} />;

    const sectionFaqData = data.sectionFAQ.sectionFaqFields;
    const faqCases = sectionFaqData.faqCases;
    // logVar(faqCases);


    return (
        <section className="faq-page-section">
            <div className="auto-container">
                <div className="row clearfix">
                    {/* <!-- Title Column --> */}
                    <div className="title-column col-lg-5 col-sm-12 col-xs-12">
                        <div className="inner-column">
                            {/* <!-- Sec Title --> */}
                            <div className="sec-title">
                                <div className="title">{sectionFaqData.smallTitleTop}</div>
                                <div className="separator"><span></span></div>
                                <h2>{sectionFaqData.mainTitle}</h2>
                            </div>
                            <div className="text">{sectionFaqData.mainText}</div>
                            {
                                sectionFaqData.buttonLink && sectionFaqData.buttonText 
                                ?
                                <Link to={sectionFaqData.buttonLink} className="theme-btn btn-style-two"><span className="txt">{sectionFaqData.buttonText}</span></Link>
                                :
                                null
                            }
                            
                        </div>
                    </div>
                    {/* <!-- Accordian Column --> */}
                    <div className="accordian-column col-lg-7 col-sm-12 col-xs-12">
                        <div className="inner-column">

                            {/* <!--Accordian Box--> */}
                            <ul id="accordion-box" className="accordion-box">
                                {
                                    faqCases.map( (faqCase, index) => {

                                        let parser = new DOMParser();
                                        let parsedDocument = parser.parseFromString(faqCase.content, "text/html");
                                        let faq_text = parsedDocument.getElementsByTagName("p");

                                        return (
                                            <li className="accordion block" key={index}>
                                                <div className="acc-btn" onClick={handleAccBtn} ><div className="icon-outer"><span className="icon icon-plus fa fa-plus"></span> <span className="icon icon-minus fa fa-minus"></span></div>{faqCase.title}</div>
                                                <div className="acc-content">
                                                    <div className="content">
                                                        <div className="text">
                                                            <p>{faq_text[0].innerText}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionFAQ;
import QueryState from './QueryState';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {GraphQLQueries} from "./queries/GraphQLQueries";
import { logVar } from "./utils/Utils";

const SectionTestimonials = () => {

    const TESTIMONIALS_SECTION_CONTENT = gql`query TESTIMONIALS_SECTION_CONTENT
    {
      ${GraphQLQueries.queries.sectionTestimonials}
    }`;

    const { data, loading, error, refetch } = useQuery(TESTIMONIALS_SECTION_CONTENT);

    if (loading) return <QueryState loading />;
    if (error || !data) return <QueryState onRetry={refetch} />;

    const sectionSectionTestimonialsData = data.sectionTestimonials.sectionTestimonialsFields;

    // logVar(sectionSectionTestimonialsData);

    return (
        <section className="testimonial-page-section">
            <div className="auto-container">
                { /* <!-- Sec Title --> */ }
                <div className="sec-title centered">
                    <div className="title">{sectionSectionTestimonialsData.smallTitleTop}</div>
                    <div className="separator"><span></span></div>
                    <h2>{sectionSectionTestimonialsData.mainTitle}</h2>
                </div>
                <div className="row clearfix">
                    {
                        sectionSectionTestimonialsData.testimonialCases.map((testimonial, index) => {

                            let parser = new DOMParser();

                            let parsedDocument = parser.parseFromString(testimonial.excerpt, "text/html");
                            let excerpt_text = parsedDocument.getElementsByTagName("p")[0].innerText;

                            let parsedDocument2 = parser.parseFromString(testimonial.content, "text/html");
                            let content_text = parsedDocument2.getElementsByTagName("p")[0].innerText;

                            return (
                                <div className="testimonial-block-two col-lg-6 col-md-12 col-sm-12" key={index}>
                                    <div className="inner-box">
                                        <div className="upper-box">
                                            <div className="quote-icon flaticon-two-quotes"></div>
                                            <div className="author-info">
                                                <h3>{testimonial.title}</h3>
                                                <div className="designation">{excerpt_text}</div>
                                            </div>
                                            <div className="author-image">
                                                {/* <img src={testimonial.featuredImage.node.sourceUrl} alt="" /> */}
                                            </div>
                                        </div>
                                        <div className="lower-box">
                                            <div className="text">{content_text}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default SectionTestimonials;
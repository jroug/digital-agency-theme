import React from 'react';

import { _BannerTop } from "./";

import news1 from '../assets/images/resource/news-1.jpg';
import author3 from '../assets/images/resource/author-3.jpg';
import { logVar } from './utils/Utils';
import { useQuery, gql } from '@apollo/client';
import { GraphQLQueries } from './queries/GraphQLQueries';
import { Link } from 'react-router-dom';


const PageBlog = (props) => {

    const pageSlug = props.pageSlug;

	const GET_POSTS_QUERY = gql`query GET_POSTS_QUERY
    {
      ${ GraphQLQueries.queries.getGenericPageQuery(pageSlug) }
      ${GraphQLQueries.queries.getBlogPosts()}
    }`;

    const { data, loading, error } = useQuery(GET_POSTS_QUERY);

    if (loading) { logVar('loading from Post'); return }
    if (error) { logVar('error from Post'); return }
    if (!data) { logVar('!data from Post'); return }

    const allPosts = data.allPosts;

    logVar(allPosts);



    return (
        <>
            <_BannerTop title={"Blog"} /> 
            <section className="blog-page-section">
                <div className="auto-container">
                    <div className="row clearfix">
                        {
                            allPosts.nodes.map( (post, index) => {

                                let parser = new DOMParser();
                                let parsedDocument = parser.parseFromString(post.excerpt, "text/html");
                                let excerptText = parsedDocument.getElementsByTagName("p")[0].innerText;

                                return (
                                        <div className="news-block col-lg-4 col-md-6 col-sm-12" key={"post-" + index} >
                                            <div className="inner-box wow fadeInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms" style={{"visibility":"visible","animationDuration":"1500ms","animationDelay":"0ms","animationName":"fadeInLeft"}}>
                                                <div className="image">
                                                    <Link to={"/blog" + post.uri} ><img src={post.featuredImage.node.sourceUrl} alt="" /></Link>
                                                </div>
                                                <div className="lower-content">
                                                    <h6><Link to={"/blog" + post.uri } >{post.title}</Link></h6>
                                                    <div className="post-date">{excerptText}</div>
                                                    <div className="clearfix">
                                                        {/* <div className="pull-left">
                                                            <div className="author">
                                                                <div className="image"><img src={author3} alt="" /></div>
                                                                by Jhon Kenedy
                                                            </div>
                                                        </div> */}
                                                        <div className="pull-right">
                                                            <ul className="post-info">
                                                                {/* <li><a href="blog-single.html"><span className="icon flaticon-chat-comment-oval-speech-bubble-with-text-lines"></span></a></li> */}
                                                                <li><a href="#"><span className="icon flaticon-share"></span></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                )
                            })
                        }
                    </div>

                    { /* <!--Post Share Options--> */ }
                    <div className="styled-pagination text-center">
                        <ul className="clearfix">
                            <li className="prev"><a href="#"><span className="flaticon-back"></span> </a></li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li className="active"><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li className="next"><a href="#"><span className="flaticon-right-arrow"></span> </a></li>
                        </ul>
                    </div>

                </div>
            </section>
        </>
    );
};

export default PageBlog;
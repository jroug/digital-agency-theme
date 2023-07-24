import React from 'react';


import { logVar } from './utils/Utils';
import { useQuery, gql } from '@apollo/client';
import { GraphQLQueries } from './queries/GraphQLQueries';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const SectionBlog = (props) => {

    const { slug } = useParams();

    const BLOG_POST_PER_PAGE = process.env.REACT_APP_BLOG_POST_PER_PAGE;

    //  logVar('slug');

    const handleMorePosts = (event) => {
        event.preventDefault();
        // logVar(allPosts.pageInfo.endCursor);
        // fetchMore({ variables: { after: allPosts.pageInfo.endCursor } });
        // logVar('handleNextPosts');
    }

    let GET_POSTS_QUERY = '';
    let fetchPolicy = '';


    // special functionality for search page - url structure
    // blog/post
    // category/term
    // tag/term
    // search/slug


    if (props.taxSlug=='search') {
        fetchPolicy = 'network-only';
        GET_POSTS_QUERY = gql`query GET_POSTS_QUERY0
        {
            ${GraphQLQueries.queries.getBlogPosts(slug ,'' ,'' ,BLOG_POST_PER_PAGE ,'')}
        }`;

    }else if (props.taxSlug=='tag') {
        fetchPolicy = 'network-only';
        GET_POSTS_QUERY = gql`query GET_POSTS_QUERY1 
        {
            ${GraphQLQueries.queries.getBlogPosts('' ,'' ,props.taxonomyName ,BLOG_POST_PER_PAGE ,'')}
        }`;

    }else if(props.taxSlug=='category'){
        fetchPolicy = 'network-only';
        GET_POSTS_QUERY = gql`query GET_POSTS_QUERY2 
        {
            ${GraphQLQueries.queries.getBlogPosts('' ,props.taxonomyName ,'' ,BLOG_POST_PER_PAGE ,'')}
        }`;
        
    }else{
        fetchPolicy = "cache";
        GET_POSTS_QUERY = gql`query GET_POSTS_QUERY3
        {
            ${GraphQLQueries.queries.getBlogPosts('' ,'' ,'' ,BLOG_POST_PER_PAGE ,'')}
        }`;
    }

    // cache policy network-only causes rerenders to app.js
    // needed to remove relayStylePagination from index.js
    // if I dont have fetchMore i do not need relayStylePagination

    const { data, loading, error } = useQuery(GET_POSTS_QUERY,{
        fetchPolicy: fetchPolicy,
    });

    if (loading) { logVar('loading from SectionBlog'); return }
    if (error) { logVar('error from SectionBlog'); return }
    if (!data) { logVar('!data from SectionBlog'); return }

    // logVar(data);

    let allPosts = null;

    if (props.taxSlug=='search') {
        allPosts = data['allPosts_search'];
    }else if (props.taxSlug=='tag') {
        allPosts = data['allPosts_tag'];
    }else if(props.taxSlug=='category'){
        allPosts = data['allPosts_cat'];
    }else{
        allPosts = data.allPosts;
    }
     
    const hasNextPage = allPosts.pageInfo.hasNextPage;

    // logVar(allPosts);

    return (
        <section className="blog-page-section" key={"blog-" + props.taxSlug + "-" + props.taxonomyName}>
            <div className="auto-container">
                <div className="row clearfix">
                    {
                         allPosts.edges.length === 0 ? (
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="sec-title centered">
                                    <h2>No results found</h2>
                                </div>
                            </div>
                        ) 
                        : 
                        allPosts.edges.map( (post, index) => {

                            let parser = new DOMParser();
                            let parsedDocument = parser.parseFromString(post.node.excerpt, "text/html");
                            let excerptText = parsedDocument.getElementsByTagName("p")[0].innerText;

                            let postCategories = post.node.categories.edges;
                            let postTags = post.node.tags.edges;

                            return (
                                    <div className="news-block col-lg-4 col-md-6 col-sm-12" key={"post-" + props.taxSlug + "-" + props.taxonomyName + "-" + index} >
                                        <div className="inner-box wow fadeInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms" style={{"visibility":"visible","animationDuration":"1500ms","animationDelay":"0ms","animationName":"fadeInLeft"}}>
                                            <div className="image">
                                                <Link to={"/blog" + post.node.uri} ><img src={post.node.featuredImage.node.sourceUrl} alt="" /></Link>
                                            </div>
                                            <div className="lower-content">
                                                <h6><Link to={"/blog" + post.node.uri } >{post.node.title}</Link></h6>
                                                <div className="post-date">{excerptText}</div>
                                                <div className="clearfix">
                                                    <div className="pull-left blog-tile">
                                                        <div className="author">
                                                            <div className="r1" >
                                                            {/* <div className="image"><img src={author3} alt="" /></div> */}
                                                            {
                                                                
                                                                postCategories.map( (category, index) => {
                                                                    return (
                                                                        <Link to={category.node.uri} key={"category-" + index} >{category.node.name}</Link>
                                                                    )
                                                                })
                                                            }
                                                            </div>
                                                            <div className="r2" >
                                                            {
                                                                postTags.map( (tag, index) => {
                                                                    return (
                                                                        <Link to={tag.node.uri} key={"tag-" + index} >{tag.node.name}</Link>
                                                                    )
                                                                })
                                                            }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pull-right">
                                                        <ul className="post-info">
                                                            {/* <li><a href="blog-single.html"><span className="icon flaticon-chat-comment-oval-speech-bubble-with-text-lines"></span></a></li> */}
                                                            <li><Link to="#"><span className="icon flaticon-share"></span></Link></li>
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
                {
                    hasNextPage ? (
                        <div className="styled-pagination text-center">
                            <ul className="clearfix">
                                <li className="load-more">
                                    <Link to="" onClick={handleMorePosts} >Load More</Link>
                                </li>
                            </ul>
                        </div>
                    ) : ''
                }


            </div>
        </section>
    );
};

export default SectionBlog;
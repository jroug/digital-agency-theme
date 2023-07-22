import React from 'react';


import { logVar } from './utils/Utils';
import { useQuery, gql } from '@apollo/client';
import { GraphQLQueries } from './queries/GraphQLQueries';
import { Link } from 'react-router-dom';


const SectionBlog = (props) => {


    logVar(props.taxSlug);
    logVar(props.taxonomyName);

    const BATCH_SIZE = 3;

    const handleMorePosts = (event) => {
        event.preventDefault();
        logVar(allPosts.pageInfo.endCursor);
        fetchMore({ variables: { after: allPosts.pageInfo.endCursor } });
        logVar('handleNextPosts');
    }

    let GET_POSTS_QUERY = '';

    if (props.taxSlug=='tag') {

        GET_POSTS_QUERY = gql`query GET_POSTS_QUERY1 ($first: Int!, $after: String)
        {
            ${GraphQLQueries.queries.getBlogPostsByTag(props.taxonomyName)}
        }`;

    }else if(props.taxSlug=='category'){

        GET_POSTS_QUERY = gql`query GET_POSTS_QUERY2 ($first: Int!, $after: String)
        {
            ${GraphQLQueries.queries.getBlogPostsByCategory(props.taxonomyName)}
        }`;
        
    }else{
        GET_POSTS_QUERY = gql`query GET_POSTS_QUERY3 ($first: Int!, $after: String)
        {
            ${GraphQLQueries.queries.getBlogPosts()}
        }`;
    }


    const { data, loading, error, fetchMore } = useQuery(GET_POSTS_QUERY, {
        fetchPolicy: 'cache-and-network',
        variables: { first: BATCH_SIZE, after: null },
        notifyOnNetworkStatusChange: true,
    });

    if (loading) { logVar(loading); return }
    if (error) { logVar(error); return }
    if (!data) { logVar(data); return }


    let allPosts = null;

    if (props.taxSlug=='tag') {
        allPosts = data.allPostsTags;
    }else if(props.taxSlug=='category'){
        allPosts = data.allPostsCategories;
    }else{
        allPosts = data.allPosts;
    }
     
    const hasNextPage = allPosts.pageInfo.hasNextPage;

    logVar(allPosts);

    return (
        <section className="blog-page-section" key={"blog-" + props.taxSlug + "-" + props.taxonomyName}>
            <div className="auto-container">
                <div className="row clearfix">
                    {
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
                                                    <div className="pull-left">
                                                        <div className="author">
                                                            {/* <div className="image"><img src={author3} alt="" /></div> */}
                                                            {
                                                                
                                                                postCategories.map( (category, index) => {
                                                                    return (
                                                                        <span key={"category-" + index} > {category.node.name} </span>
                                                                    )
                                                                })
                                                            }
                                                            <br/>
                                                            {
                                                                postTags.map( (tag, index) => {
                                                                    return (
                                                                        <span key={"tag-" + index} > {tag.node.name} </span>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
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
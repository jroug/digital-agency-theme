import React, { useEffect, useState }   from 'react';
import { logVar } from './utils/Utils';
import { useApolloClient, useQuery, gql } from '@apollo/client';
import { GraphQLQueries } from './queries/GraphQLQueries';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { BlogBoxes } from './';

const SectionBlog = (props) => {

    const [allPosts, setAllPosts] = useState({});
    const [endCursor, setEndCursor] = useState('');
    const [hasNextPage, setHasNextPage] = useState('');
    const [trigger, setTrigger] = useState(0);





    // use later in button action
    const client = useApolloClient();

    const { slug } = useParams();

    const BLOG_POST_PER_PAGE = parseInt(process.env.REACT_APP_BLOG_POST_PER_PAGE);

    //  logVar('slug');

    const handleMorePosts = (event) => {
        event.preventDefault();
        
        
        let BRING_MORE_POSTS_QUERY = '';
        let variables_more = {};


        switch (props.taxSlug) {
            case 'search':
                BRING_MORE_POSTS_QUERY = gql`query BRING_MORE_SEARCH ( $search: String, $first_gbs: Int, $after_gbs: String)
                {
                    ${GraphQLQueries.queries.getBlogPosts_search}
                }`;
                variables_more = {
                    search : slug,
                    first_gbs: BLOG_POST_PER_PAGE,
                    after_gbs: endCursor,
                }
                break;
            case 'tag':
                BRING_MORE_POSTS_QUERY = gql`query BRING_MORE_TAG ( $tag: String, $first_gbt: Int, $after_gbt: String)
                {
                    ${GraphQLQueries.queries.getBlogPosts_tag}
                }`;
                variables_more = {
                    tag : props.taxonomyName,
                    first_gbt: BLOG_POST_PER_PAGE,
                    after_gbt: endCursor,
                }
                break;
            case 'category':
                BRING_MORE_POSTS_QUERY = gql`query BRING_MORE_CAT ( $categoryName: String, $first_gbc: Int, $after_gbc: String)
                {
                    ${GraphQLQueries.queries.getBlogPosts_cat}
                }`;
                variables_more = {
                    categoryName : props.taxonomyName,
                    first_gbc: BLOG_POST_PER_PAGE,
                    after_gbc: endCursor,
                }
                break;
            default:
                BRING_MORE_POSTS_QUERY = gql`query BRING_MORE_POSTS_QUERY ($first_gbp: Int, $after_gbp: String)
                {
                    ${GraphQLQueries.queries.getBlogPosts}
                }`;
                variables_more = {
                    first_gbp: BLOG_POST_PER_PAGE,
                    after_gbp: endCursor,
                }
                break;
        }
 

        client.query({
            fetchPolicy: 'network-only',
            query: BRING_MORE_POSTS_QUERY,
            variables: variables_more
        }).then(result_data => {
           
            if (props.taxSlug === 'search') {
                setHasNextPage(result_data.data['allPosts_search'].pageInfo.hasNextPage);
                setEndCursor(result_data.data['allPosts_search'].pageInfo.endCursor);
                if (Object.keys(allPosts).length !== 0)
                    setAllPosts([...allPosts, ...result_data.data['allPosts_search'].edges]);
                else
                    setAllPosts([...result_data.data['allPosts_search'].edges]);
            }else if (props.taxSlug === 'tag') {logVar(result_data);
                setHasNextPage(result_data.data['allPosts_tag'].pageInfo.hasNextPage);
                setEndCursor(result_data.data['allPosts_tag'].pageInfo.endCursor);
                if (Object.keys(allPosts).length !== 0)
                    setAllPosts([...allPosts, ...result_data.data['allPosts_tag'].edges]);
                else
                    setAllPosts([...result_data.data['allPosts_tag'].edges]);
            }else if(props.taxSlug === 'category'){
                setHasNextPage(result_data.data['allPosts_cat'].pageInfo.hasNextPage);
                setEndCursor(result_data.data['allPosts_cat'].pageInfo.endCursor);
                if (Object.keys(allPosts).length !== 0)
                    setAllPosts([...allPosts, ...result_data.data['allPosts_cat'].edges]);
                else
                    setAllPosts([...result_data.data['allPosts_cat'].edges]);
            }else{
                setHasNextPage(result_data.data.allPosts.pageInfo.hasNextPage);
                setEndCursor(result_data.data.allPosts.pageInfo.endCursor);
                if (Object.keys(allPosts).length !== 0)
                    setAllPosts([...allPosts, ...result_data.data.allPosts.edges]);
                else
                    setAllPosts([...result_data.data.allPosts.edges]);
            }
            // logVar('0000');


        })
        .catch(error => {
            logVar(error);
        });
    }

    let GET_POSTS_QUERY = '';
    let fetchPolicy = '';


    // special functionality for search page - url structure
    // blog/post
    // category/term
    // tag/term
    // search/slug

    let variables = {};

    switch (props.taxSlug) {
        case 'search':
            fetchPolicy = 'network-only';
            GET_POSTS_QUERY = gql`query GET_POSTS_QUERY_SEARCH ( $search: String, $first_gbs: Int, $after_gbs: String)
            {
                ${GraphQLQueries.queries.getBlogPosts_search}
            }`;
            variables = {
                search : slug,
                first_gbs: BLOG_POST_PER_PAGE,
                after_gbs: '',
            }
            break;
        case 'tag':
            fetchPolicy = 'network-only';
            GET_POSTS_QUERY = gql`query GET_POSTS_QUERY_TAG ( $tag: String, $first_gbt: Int, $after_gbt: String)
            {
                ${GraphQLQueries.queries.getBlogPosts_tag}
            }`;
            variables = {
                tag : props.taxonomyName,
                first_gbt: BLOG_POST_PER_PAGE,
                after_gbt: '',
            }
            break;
        case 'category':
            fetchPolicy = 'network-only';
            GET_POSTS_QUERY = gql`query GET_POSTS_QUERY_CAT ( $categoryName: String, $first_gbc: Int, $after_gbc: String)
            {
                ${GraphQLQueries.queries.getBlogPosts_cat}
            }`;
            variables = {
                categoryName : props.taxonomyName,
                first_gbc: BLOG_POST_PER_PAGE,
                after_gbc: '',
            }
            break;
        default:
            fetchPolicy = "cache";
            GET_POSTS_QUERY = gql`query GET_POSTS_QUERY ($first_gbp: Int, $after_gbp: String)
            {
                ${GraphQLQueries.queries.getBlogPosts}
            }`;
            variables = {
                first_gbp: BLOG_POST_PER_PAGE,
                after_gbp: '',
            }
            break;
    }

    // cache policy network-only causes rerenders to app.js
    // needed to remove relayStylePagination from index.js
    // if I dont have fetchMore i do not need relayStylePagination

    const { data, loading, error } = useQuery(GET_POSTS_QUERY,{
        fetchPolicy: fetchPolicy,
        variables: variables
    });

    // state can update inside useEffect
    useEffect(() => {

        if ( !data ){
            logVar('data in useEffect is undefined');
            return;
        }  

        logVar('data in useEffect--> ', data, allPosts);
        
        if (props.taxSlug === 'search') {
            setAllPosts(data['allPosts_search'].edges);
            setHasNextPage(data['allPosts_search'].pageInfo.hasNextPage);
            setEndCursor(data['allPosts_search'].pageInfo.endCursor);
        }else if (props.taxSlug === 'tag') {
            setAllPosts(data['allPosts_tag'].edges);
            setHasNextPage(data['allPosts_tag'].pageInfo.hasNextPage);
            setEndCursor(data['allPosts_tag'].pageInfo.endCursor);
        }else if(props.taxSlug === 'category'){
            logVar(data);
            setAllPosts(data['allPosts_cat'].edges);
            setHasNextPage(data['allPosts_cat'].pageInfo.hasNextPage);
            setEndCursor(data['allPosts_cat'].pageInfo.endCursor);
        }else{
            setAllPosts(data.allPosts.edges);
            setHasNextPage(data.allPosts.pageInfo.hasNextPage);
            setEndCursor(data.allPosts.pageInfo.endCursor);
        }
        
    }, [data, props.taxSlug, allPosts]);

    if (loading) { logVar('--------------------------- loading from SectionBlog ---------------------------'); return }
    if (error) { logVar('error from SectionBlog'); return }
    if (!data) { logVar('!data from SectionBlog'); return }


    console.log('[useQuery] --->', data, fetchPolicy);

    // trigger useEffect after having the data, do not need to in caching cases
    if (trigger === 0 &&  fetchPolicy === 'network-only') setTrigger(1);

    if (Object.keys(allPosts).length === 0 && props.taxSlug !== 'search' ) return <div>Loading...</div>;

    return (
 
        <section className="blog-page-section" key={"blog-" + props.taxSlug + "-" + props.taxonomyName}>
            <div className="auto-container">
                <div className="row clearfix" id="main-content" >
                    {
                        Object.keys(allPosts).length === 0 && props.taxSlug === 'search' 
                        ?
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="sec-title centered">
                                    <h2>No results found</h2>
                                </div>
                            </div>
                        : 
                        allPosts?.map( (post, index) => {
                                return (
                                    <BlogBoxes 
                                        key={"BlogBox-" + post.node.databaseId} 
                                        post={post}
                                        index={index}
                                        taxSlug={props.taxSlug}
                                        taxonomyName={props.taxonomyName}
                                    />
                                )
                        })
                    }
                </div>
                {/* More Button */}
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
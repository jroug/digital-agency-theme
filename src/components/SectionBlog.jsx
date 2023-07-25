import React, { useEffect, useState }   from 'react';
import { logVar } from './utils/Utils';
import { useApolloClient, useQuery, gql } from '@apollo/client';
import { GraphQLQueries } from './queries/GraphQLQueries';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { _BlogBoxes } from './';

const SectionBlog = (props) => {

    const [allPosts, setAllPosts] = useState({});
    const [endCursor, setEndCursor] = useState('');
    const [hasNextPage, setHasNextPage] = useState('');
    const [trigger, setTrigger] = useState(0);

    // state can update inside useEffect
    useEffect(() => {
   
        if ( data == undefined ){
            console.log('data in useEffect is undefined');
            return;
        }  

        console.log('data in useEffect--> ', data, allPosts);
        
        if (props.taxSlug=='search') {
            setAllPosts(data['allPosts_search'].edges);
            setHasNextPage(data['allPosts_search'].pageInfo.hasNextPage);
            setEndCursor(data['allPosts_search'].pageInfo.endCursor);
        }else if (props.taxSlug=='tag') {
            setAllPosts(data['allPosts_tag'].edges);
            setHasNextPage(data['allPosts_tag'].pageInfo.hasNextPage);
            setEndCursor(data['allPosts_tag'].pageInfo.endCursor);
        }else if(props.taxSlug=='category'){
            console.log(data);
            setAllPosts(data['allPosts_cat'].edges);
            setHasNextPage(data['allPosts_cat'].pageInfo.hasNextPage);
            setEndCursor(data['allPosts_cat'].pageInfo.endCursor);
        }else{
            setAllPosts(data.allPosts.edges);
            setHasNextPage(data.allPosts.pageInfo.hasNextPage);
            setEndCursor(data.allPosts.pageInfo.endCursor);
        }
        
    }, [trigger]);



    // use later in button action
    const client = useApolloClient();

    const { slug } = useParams();

    const BLOG_POST_PER_PAGE = process.env.REACT_APP_BLOG_POST_PER_PAGE;

    //  logVar('slug');

    const handleMorePosts = (event) => {
        event.preventDefault();
        
        
        let BRING_MORE_POSTS_QUERY = '';
        

        if (props.taxSlug=='search') {
            // fetchPolicy = 'network-only';
            BRING_MORE_POSTS_QUERY = gql`query BRING_MORE0
            {
                ${GraphQLQueries.queries.getBlogPosts(slug ,'' ,'' ,BLOG_POST_PER_PAGE ,endCursor )}
            }`;
        }else if (props.taxSlug=='tag') {
            // fetchPolicy = 'network-only';
            BRING_MORE_POSTS_QUERY = gql`query BRING_MORE1 
            {
                ${GraphQLQueries.queries.getBlogPosts('' ,'' ,props.taxonomyName ,BLOG_POST_PER_PAGE ,endCursor )}
            }`;
        }else if(props.taxSlug=='category'){
            // fetchPolicy = 'network-only';
            BRING_MORE_POSTS_QUERY = gql`query BRING_MORE2 
            {
                ${GraphQLQueries.queries.getBlogPosts('' ,props.taxonomyName ,'' ,BLOG_POST_PER_PAGE ,endCursor )}
            }`;
        }else{
            // fetchPolicy = "cache";
            BRING_MORE_POSTS_QUERY = gql`query BRING_MORE3
            {
                ${GraphQLQueries.queries.getBlogPosts('' ,'' ,'' ,BLOG_POST_PER_PAGE ,endCursor)}
            }`;
        }

        client.query({
            fetchPolicy: 'network-only',
            query: BRING_MORE_POSTS_QUERY
        }).then(result_data => {
           
            if (props.taxSlug=='search') {
                setHasNextPage(result_data.data['allPosts_search'].pageInfo.hasNextPage);
                setEndCursor(result_data.data['allPosts_search'].pageInfo.endCursor);
                if (Object.keys(allPosts).length != 0)
                    setAllPosts([...allPosts, ...result_data.data['allPosts_search'].edges]);
                else
                    setAllPosts([...result_data.data['allPosts_search'].edges]);
            }else if (props.taxSlug=='tag') {logVar(result_data);
                setHasNextPage(result_data.data['allPosts_tag'].pageInfo.hasNextPage);
                setEndCursor(result_data.data['allPosts_tag'].pageInfo.endCursor);
                if (Object.keys(allPosts).length != 0)
                    setAllPosts([...allPosts, ...result_data.data['allPosts_tag'].edges]);
                else
                    setAllPosts([...result_data.data['allPosts_tag'].edges]);
            }else if(props.taxSlug=='category'){
                setHasNextPage(result_data.data['allPosts_cat'].pageInfo.hasNextPage);
                setEndCursor(result_data.data['allPosts_cat'].pageInfo.endCursor);
                if (Object.keys(allPosts).length != 0)
                    setAllPosts([...allPosts, ...result_data.data['allPosts_cat'].edges]);
                else
                    setAllPosts([...result_data.data['allPosts_cat'].edges]);
            }else{
                setHasNextPage(result_data.data.allPosts.pageInfo.hasNextPage);
                setEndCursor(result_data.data.allPosts.pageInfo.endCursor);
                if (Object.keys(allPosts).length != 0)
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

    if (loading) { logVar('--------------------------- loading from SectionBlog ---------------------------'); return }
    if (error) { logVar('error from SectionBlog'); return }
    if (!data) { logVar('!data from SectionBlog'); return }


    console.log('[useQuery] --->', data, fetchPolicy);

    // trigger useEffect after having the data, do not need to in caching cases
    if (trigger==0 &&  fetchPolicy == 'network-only') setTrigger(1);

    if (Object.keys(allPosts).length == 0 && props.taxSlug !='search' ) return <div>Loading...</div>;

    return (
 
        <section className="blog-page-section" key={"blog-" + props.taxSlug + "-" + props.taxonomyName}>
            <div className="auto-container">
                <div className="row clearfix" id="main-content" >
                    {
                        Object.keys(allPosts).length == 0 && props.taxSlug =='search' 
                        ?
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="sec-title centered">
                                    <h2>No results found</h2>
                                </div>
                            </div>
                        : 
                        allPosts?.map( (post, index) => {
                                return (
                                    <_BlogBoxes 
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